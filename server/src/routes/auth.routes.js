import express from 'express';
import { signup, login, logout, getMe, googleCallback } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import passport from 'passport';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

// Google OAuth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), googleCallback);


export default router;
