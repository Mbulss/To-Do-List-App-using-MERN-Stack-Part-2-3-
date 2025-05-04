import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/users.js';
import { userSendMail } from './userSendMail.js';

const { DEFAULT_CLIENT_URL } = process.env;

// ─────────────────────────────────────────────────────────────────────────────
// Utility helpers
// ─────────────────────────────────────────────────────────────────────────────
function isMatch(password, confirm_password) {
  return password === confirm_password;
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validatePassword(password) {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  return re.test(password);
}

function createRefreshToken(payload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d',
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 1.  USER SIGN‑UP  →  SEND ACTIVATION EMAIL
// ─────────────────────────────────────────────────────────────────────────────
export const signUp = async (req, res) => {
  try {
    const {
      personal_id,
      name,
      email,
      password,
      confirmPassword,
      address,
      phone_number,
    } = req.body;

    // Basic validation
    if (!personal_id || !name || !email || !password || !confirmPassword)
      return res.status(400).json({ message: 'Please fill in all fields' });

    if (name.length < 3)
      return res
        .status(400)
        .json({ message: 'Your name must be at least 3 letters long' });

    if (!isMatch(password, confirmPassword))
      return res.status(400).json({ message: 'Password did not match' });

    if (!validateEmail(email))
      return res.status(400).json({ message: 'Invalid email' });

    if (!validatePassword(password))
      return res.status(400).json({
        message:
          'Password should be 6‑20 chars, incl. 1 number, 1 lowercase & 1 uppercase',
      });

    if (await Users.findOne({ email }))
      return res.status(400).json({ message: 'This email is already registered' });

    // Hash pwd & pack data (but DON’T save yet)
    const hash = await bcrypt.hash(password, 10);
    const userForToken = {
      personal_id,
      name,
      email,
      password: hash,
      address,
      phone_number,
    };

    // Create activation link
    const activation_token = createRefreshToken(userForToken);
    const url = `${DEFAULT_CLIENT_URL}/user/activate/${activation_token}`;

    await userSendMail(
      email,
      url,
      'Verify your email address',
      'Confirm Email'
    );

    res.json({
      message:
        'Register Success! Please check your inbox and activate your account.',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// 2.  ACTIVATE EMAIL  →  FINALISE ACCOUNT
// ─────────────────────────────────────────────────────────────────────────────
export const activateEmail = async (req, res) => {
  try {
    const { activation_token } = req.body;
    const userData = jwt.verify(
      activation_token,
      process.env.REFRESH_TOKEN_SECRET
    );

    const { personal_id, name, email, password, address, phone_number } =
      userData;

    if (await Users.findOne({ email }))
      return res.status(400).json({ message: 'This email already exists.' });

    const newUser = new Users({
      personal_id,
      name,
      email,
      password,
      address,
      phone_number,
    });

    await newUser.save();

    res.json({ message: 'Account has been activated. Please login now!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// 3.  USER SIGN‑IN
// ─────────────────────────────────────────────────────────────────────────────
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Please fill in all fields' });

    const user = await Users.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid Credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(400).json({ message: 'Invalid Credentials' });

    const refresh_token = createRefreshToken({ id: user._id });
    const expiry = 24 * 60 * 60 * 1000; // 1 day

    res.cookie('refreshtoken', refresh_token, {
      httpOnly: true,
      path: '/api/user/refresh_token',
      maxAge: expiry,
      expires: new Date(Date.now() + expiry),
    });

    res.json({
      message: 'Sign‑in successful!',
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// 4.  AUTH MIDDLEWARE  &  USER INFO
// ─────────────────────────────────────────────────────────────────────────────
export const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.refreshtoken;
    if (!token)
      return res
        .status(401)
        .json({ message: 'Please log in to access this resource.' });

    req.user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

export const userInfor = async (req, res) => {
  try {
    const userInfo = await Users.findById(req.user.id).select('-password');
    if (!userInfo) return res.status(404).json({ message: 'User not found.' });
    res.json(userInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
