import express from 'express';
import { getAllCourses, getCourseById, completeLesson } from '../controllers/course.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/complete-lesson', protect, completeLesson);

export default router;
