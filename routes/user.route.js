const { Router } = require("express");
const router = Router();

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
} = require("../controllers/user.controller");

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Foydalanuvchi boshqaruvi
 */

/**
 * @swagger
 * /users/createUser:
 *   post:
 *     summary: Yangi foydalanuvchi yaratish
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - email
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *                 example: temurmalik
 *               email:
 *                 type: string
 *                 example: dev@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Foydalanuvchi yaratildi
 *       400:
 *         description: Noto‘g‘ri ma’lumot
 *       409:
 *         description: Foydalanuvchi mavjud
 *       500:
 *         description: Server xatosi
 */
router.post("/createUser", createUser);

/**
 * @swagger
 * /users/getUsers:
 *   get:
 *     summary: Barcha foydalanuvchilarni olish
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro‘yxati
 *       500:
 *         description: Server xatosi
 */
router.get("/getUsers", getUsers);

/**
 * @swagger
 * /users/getUser/{id}:
 *   get:
 *     summary: ID bo‘yicha foydalanuvchini olish
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Foydalanuvchi topildi
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
router.get("/getUser/:id", getUserById);

/**
 * @swagger
 * /users/updateUser/{id}:
 *   put:
 *     summary: Foydalanuvchini yangilash
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: temurmalik_new
 *               email:
 *                 type: string
 *                 example: new_email@example.com
 *               password:
 *                 type: string
 *                 example: newpassword123
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Foydalanuvchi yangilandi
 *       400:
 *         description: Noto‘g‘ri ma’lumot
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
router.put("/updateUser/:id", updateUser);

module.exports = router;
