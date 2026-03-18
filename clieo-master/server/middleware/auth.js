/**
 * AUTHENTICATION MIDDLEWARE
 */

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Simple token check (in production use JWT)
  if (token !== 'admin-token-2024') {
    return res.status(403).json({ error: 'Invalid token' });
  }

  next();
};

export const loginRoute = (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'admin123') {
    res.json({ token: 'admin-token-2024', username });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};
