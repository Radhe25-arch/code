import prisma from '../lib/prisma.js';

export const getInventory = async (req, res) => {
  try {
    const inventory = await prisma.inventory.findMany({
      where: { userId: req.user.id },
      include: { item: true }
    });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const equipItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.id;

    // Unequip others of same type if necessary (simple unequip all first for now)
    await prisma.inventory.updateMany({
      where: { userId },
      data: { isEquipped: false }
    });

    await prisma.inventory.update({
      where: { userId_itemId: { userId, itemId } },
      data: { isEquipped: true }
    });

    res.json({ message: 'Item equipped' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getShopItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
