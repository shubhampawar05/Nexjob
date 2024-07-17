const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');
const refundController =require('./../controllers/refundController')


/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment routes
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create a payment
 *     tags: [Payment]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - currency
 *             properties:
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *               transactionType:
 *                 type: string
 *                 enum: ["credit", "debit", "wallet"]
 *     responses:
 *       201:
 *         description: Payment created
 *       400:
 *         description: All fields are required or amount must be greater than 0
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/payments/process/{payment_id}:
 *   post:
 *     summary: Process a payment
 *     tags: [Payment]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: payment_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Transaction completed successfully
 *       404:
 *         description: Payment not found or Payment is already done
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/payments/{payment_id}:
 *   get:
 *     summary: Get payment status
 *     tags: [Payment]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: payment_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment details
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payment]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all payments
 *       404:
 *         description: Payments not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/payments/refund/{payment_id}:
 *   get:
 *     summary: Refund a payment
 *     tags: [Payment]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: payment_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Refund completed successfully
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */


router.post('/', authMiddleware, paymentController.createPayment);

router.post('/process/:payment_id', authMiddleware, paymentController.processPayment);

router.get('/:payment_id', authMiddleware, paymentController.getPaymentStatus);

router.get('/', authMiddleware, paymentController.getallPayment);

router.get('/refund/:payment_id', authMiddleware, refundController.paymentRefund);

module.exports = router;
