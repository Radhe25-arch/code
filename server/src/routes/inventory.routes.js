import express from 'express';
import { getInventory, equipItem, getShopItems } from '../controllers/item.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.get('/inventory', getInventory);
router.post('/equip/:itemId', equipItem);
router.get('/shop', getShopItems);

export default router;
