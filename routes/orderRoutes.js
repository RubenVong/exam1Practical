const express = require("express");
const router = express.Router();
const Order = require("../model/orderModel");

// Endpoint: GET all orders
router.get("/", async function (req, res) {
  try {
    const orders = await Order.findAll();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint: GET specific order
router.get("/:id", async function (req, res) {
  try {
    const orders = await Order.findById(req.params.id);
    if (!orders) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint: POST new order
router.post("/", async function (req, res) {
  try {
    const { customerName } = req.body;
    if (!customerName) {
      return res.status(400).json({ success: false, error: 'Field "customerName" is required.' });
    }

    const insertId = await Order.create(req.body);
    const newOrder = await Order.findById(insertId);

    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
