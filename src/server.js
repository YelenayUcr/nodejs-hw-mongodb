import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = 'secret123'; 

const users = [];
const sessions = [];


function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ status: 401, message: 'Token required. Please login.' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ status: 401, message: 'Token malformed.' });
  }
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload; 
    next();
} catch (err) {
  console.error(err);
  return res.status(401).json({ status: 401, message: 'Invalid or expired token.' });
}
}


app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Contacts API!' });
});


app.post('/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ status: 400, message: 'Name, email and password are required.' });
  }

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(409).json({ status: 409, message: 'Email in use' });
  }

  users.push({ id: users.length + 1, name, email, password });
  return res.status(201).json({ status: 201, message: 'Successfully registered a user!', data: { name, email } });
});


app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: 400, message: 'Email and password required.' });
  }
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ status: 401, message: 'Invalid email or password.' });
  }

  const accessToken = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '30d' });


  sessions.push({ userId: user.id, accessToken, refreshToken });


  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken, refreshToken }
  });
});

app.post('/auth/refresh', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ status: 401, message: 'Refresh token required.' });
  }
  // Session kontrolü
  const session = sessions.find(s => s.refreshToken === refreshToken);
  if (!session) {
    return res.status(401).json({ status: 401, message: 'Invalid refresh token.' });
  }
  try {
    const payload = jwt.verify(refreshToken, SECRET_KEY);
    const newAccessToken = jwt.sign({ id: payload.id, email: payload.email }, SECRET_KEY, { expiresIn: '15m' });
   
    session.accessToken = newAccessToken;
    return res.status(200).json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: { accessToken: newAccessToken }
    });
  } catch {
    return res.status(401).json({ status: 401, message: 'Refresh token expired.' });
  }
});

app.post('/auth/logout', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ status: 401, message: 'Token required.' });
  }
  const token = authHeader.split(' ')[1];
  const index = sessions.findIndex(s => s.accessToken === token);
  if (index !== -1) {
    sessions.splice(index, 1);
  }
  res.status(204).end();
});


app.get('/contacts', authenticate, (req, res) => {
  res.json({
    status: 200,
    message: `Contacts endpoint working! Hello ${req.user.email}`
  });
});

export default app;
