const { Router } = require("express");
const router = Router();

const {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  searchPayment,
} = require("../controllers/payment.controller");

/**
 * @swagger
 * tags:
 *   - name: Payments
 *     description: Payment boshqaruvi
 */

/**
 * @swagger
 * /payments/createPayment:
 *   post:
 *     summary: Yangi payment yaratish
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - payment_method
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 150000
 *               payment_method:
 *                 type: string
 *                 example: Click
 *               status:
 *                 type: string
 *                 example: paid
 *     responses:
 *       201:
 *         description: Payment yaratildi
 *       400:
 *         description: Noto‘g‘ri ma’lumot
 *       500:
 *         description: Server xatosi
 */
router.post("/createPayment", createPayment);

/**
 * @swagger
 * /payments/getPayments:
 *   get:
 *     summary: Barcha paymentlarni olish
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Paymentlar ro‘yxati
 *       500:
 *         description: Server xatosi
 */
router.get("/getPayments", getPayments);

/**
 * @swagger
 * /payments/getPayment/{id}:
 *   get:
 *     summary: ID bo‘yicha payment olish
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Payment topildi
 *       404:
 *         description: Payment topilmadi
 *       500:
 *         description: Server xatosi
 */
router.get("/getPayment/:id", getPaymentById);

/**
 * @swagger
 * /payments/updatePayment/{id}:
 *   put:
 *     summary: Paymentni yangilash
 *     tags: [Payments]
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
 *               amount:
 *                 type: number
 *                 example: 200000
 *               payment_method:
 *                 type: string
 *                 example: Payme
 *               status:
 *                 type: string
 *                 example: pending
 *     responses:
 *       200:
 *         description: Payment yangilandi
 *       400:
 *         description: Noto‘g‘ri ma’lumot
 *       404:
 *         description: Payment topilmadi
 *       500:
 *         description: Server xatosi
 */
router.put("/updatePayment/:id", updatePayment);

/**
 * @swagger
 * /payments/deletePayment/{id}:
 *   delete:
 *     summary: Paymentni o‘chirish
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       204:
 *         description: Payment o‘chirildi
 *       404:
 *         description: Payment topilmadi
 *       500:
 *         description: Server xatosi
 */
router.delete("/deletePayment/:id", deletePayment);

/**
 * @swagger
 * /payments/searchPayment:
 *   get:
 *     summary: Payment qidirish
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         example: Click
 *     responses:
 *       200:
 *         description: Topilgan paymentlar
 *       400:
 *         description: Query talab qilinadi
 *       500:
 *         description: Server xatosi
 */
router.get("/searchPayment", searchPayment);

module.exports = router;
