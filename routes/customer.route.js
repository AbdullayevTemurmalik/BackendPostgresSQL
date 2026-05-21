const { Router } = require("express");
const router = Router();

const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  searchCustomerByName,
} = require("../controllers/customer.controller");

/**
 * @swagger
 * tags:
 *   - name: Customers
 *     description: Customer boshqaruvi
 */

/**
 * @swagger
 * /customers/createCustomer:
 *   post:
 *     summary: Yangi customer yaratish
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 example: Temurmalik
 *               email:
 *                 type: string
 *                 example: temur@gmail.com
 *               address:
 *                 type: string
 *                 example: Tashkent
 *     responses:
 *       201:
 *         description: Customer yaratildi
 *       400:
 *         description: Noto‘g‘ri ma’lumot
 *       409:
 *         description: Customer mavjud
 *       500:
 *         description: Server xatosi
 */
router.post("/createCustomer", createCustomer);

/**
 * @swagger
 * /customers/getCustomers:
 *   get:
 *     summary: Barcha customerlarni olish
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Customerlar ro‘yxati
 *       500:
 *         description: Server xatosi
 */
router.get("/getCustomers", getCustomers);

/**
 * @swagger
 * /customers/getCustomer/{id}:
 *   get:
 *     summary: ID bo‘yicha customer olish
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Customer topildi
 *       404:
 *         description: Customer topilmadi
 *       500:
 *         description: Server xatosi
 */
router.get("/getCustomer/:id", getCustomerById);

/**
 * @swagger
 * /customers/updateCustomer/{id}:
 *   put:
 *     summary: Customer yangilash
 *     tags: [Customers]
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
 *               name:
 *                 type: string
 *                 example: Temurbek
 *               email:
 *                 type: string
 *                 example: newgmail@gmail.com
 *               address:
 *                 type: string
 *                 example: Samarqand
 *     responses:
 *       200:
 *         description: Customer yangilandi
 *       404:
 *         description: Customer topilmadi
 *       500:
 *         description: Server xatosi
 */
router.put("/updateCustomer/:id", updateCustomer);

/**
 * @swagger
 * /customers/deleteCustomer/{id}:
 *   delete:
 *     summary: Customer o‘chirish
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       204:
 *         description: Customer o‘chirildi
 *       404:
 *         description: Customer topilmadi
 *       500:
 *         description: Server xatosi
 */
router.delete("/deleteCustomer/:id", deleteCustomer);

/**
 * @swagger
 * /customers/searchCustomerByName:
 *   get:
 *     summary: Customerni ism bo‘yicha qidirish
 *     tags: [Customers]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         example: Temur
 *     responses:
 *       200:
 *         description: Qidirilgan customerlar
 *       400:
 *         description: Query required
 *       500:
 *         description: Server xatosi
 */
router.get("/searchCustomerByName", searchCustomerByName);

module.exports = router;
