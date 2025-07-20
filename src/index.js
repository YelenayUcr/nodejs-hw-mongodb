import app from './server.js';

const PORT = 3000;

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
