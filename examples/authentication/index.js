import { api, data, params } from "@serverless/cloud";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//! Override that param in dashboard
const { JWT_SECRET = 'shhhhh' } = params;

const getUserByUsername = (username, options) => data.get(`users:${username}`, options);

api.post("/signup", async (req, res) => {
  const { username, password, profile } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: `Missing "username" or "password" properties.` });
  }

  const usernameExists = await data.get(`users:${username}`);

  if (usernameExists) {
    return res.status(400).json({ message: `Username ${username} already exists.` });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: `Password must be at least 8 character.` });
  }

  const hash = bcrypt.hashSync(password);

  await data.set(`users:${username}`, { username, hash, profile });

  const token = jwt.sign(
    {
      username,
      profile,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.json({
    username,
    token,
  });
});

api.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: `Missing "username" or "password" properties.` });
  }

  const user = await getUserByUsername(username);

  if (!user) {
    return res.status(400).json({ message: `Username ${username} does not exist.` });
  }

  const isCorrectPassword = bcrypt.compareSync(password, user.hash);

  if (!isCorrectPassword) {
    return res
      .status(400)
      .json({ message: `The password you provided is not correct.` });
  }

  const token = jwt.sign(
    {
      username,
      profile: user.profile,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.json({
    username,
    token,
  });
});

const isAuthenticated = (req, res, next) => {
  let { authorization: token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: `Unauthorized.` });
  }

  // Postman authorization -> Bearer token
  token = token.replace(/^Bearer /, '')

  try {
    const { username } = jwt.verify(token, JWT_SECRET);

    if (req.user) console.warn(new Error('req.user gets overriden'))

    req.user = {
      username,
      token,
    };

    next()
  } catch {
    res.status(401).json({ message: `Unauthorized.` });
  }
}

const adminUsernames = ['admin'];
const isAdmin = (req, res, next) => {
  if (adminUsernames.includes(req.user.username.toLowerCase())) {
    next()
  } else {
    res.status(404).json({ message: `Page not exists.` });
  }
}

// Profile
api.get("/me", isAuthenticated, async (req, res) => {
  const { username } = req.user;
  const user = await getUserByUsername(username, { meta: true });

  if (!user) {
    return res.status(404).send(`Username ${username} does not exist.`)
  }

  delete user.hash

  res.json(user);
});

// GDPR
api.post("/removeMe", isAuthenticated, async (req, res) => {
  await data.remove(`users:${req.user.username}`)

  res.send('Good bye!')
});

// Policies middleware
api.use('/admin/*', isAuthenticated, isAdmin);

// Search or list users for admin
api.get("/admin/users", async (req, res) => {
  const { username = '*' } = req.query;
  const result = await data.get(`users:${username}`)

  res.json({
    result
  });
});

// Get specific user
api.get("/admin/users/:username", async (req, res) => {
  const { username } = req.params;
  const result = await getUserByUsername(username)

  res.json({
    result
  });
});
