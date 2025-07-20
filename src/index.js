import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Contacts API!',
  });
});

app.get('/contacts', (req, res) => {
  res.json({ 
    status: 200,
    message: 'Contacts endpoint working!' 
  });
});

app.get('/auth', (req, res) => {
  res.json({ 
    status: 200,
    message: 'Auth endpoint working!' 
  });
});

app.post('/auth/register', (req, res) => {
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
 
    }
  });
});

app.post('/auth/login', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: 'your-access-token-here'
    }
  });
});

app.post('/auth/refresh', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: 'your-new-access-token-here'
    }
  });
});

app.post('/auth/logout', (req, res) => {

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Test: http://localhost:${PORT}`);
  console.log(`Contacts: http://localhost:${PORT}/contacts`);
  console.log(`Auth endpoints:`);
  console.log(`  POST http://localhost:${PORT}/auth/register - User registration`);
  console.log(`  POST http://localhost:${PORT}/auth/login - User login`);
  console.log(`  POST http://localhost:${PORT}/auth/refresh - Session refresh`);
  console.log(`  POST http://localhost:${PORT}/auth/logout - User logout`);
});

export default app;