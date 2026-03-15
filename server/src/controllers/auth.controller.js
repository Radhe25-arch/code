import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
import { sendWelcomeEmail } from '../utils/email.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const signup = async (req, res) => {
  try {
    const { fullName, email, password, username, role, ageGroup, interests } = req.body;

    const userExists = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        username,
        role,
        ageGroup,
        interests,
      },
    });

    try {
      await sendWelcomeEmail(user.email, user.fullName);
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
    }

    const token = generateToken(user.id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      xp: user.xp,
      level: user.level,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user.id);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        xp: user.xp,
        level: user.level,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        username: true,
        xp: true,
        level: true,
        streak: true,
        role: true,
        ageGroup: true,
        interests: true,
        avatar: true,
      }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const googleCallback = async (req, res) => {
  try {
    const user = req.user;
    const token = generateToken(user.id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
