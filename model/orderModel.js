const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "exam1user",
  password: "exam1pass",
  database: "exam1Practice",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const Order = {
  // Create
  async create(orderData) {
    const { customerName, customerEmail, itemCategory, itemDescription, quantity, unitPrice, orderStatus, orderDate } = orderData;
    const sql = `INSERT INTO Orders (customerName, customerEmail, itemCategory, itemDescription, quantity, unitPrice, orderStatus, orderDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [customerName, customerEmail, itemCategory, itemDescription, quantity, unitPrice, orderStatus, orderDate]);
    return result.insertId;
  },

  // Read All
  async findAll() {
    const sql = `SELECT orderID, customerName, customerEmail, itemCategory, itemDescription, quantity, unitPrice, orderStatus, orderDate FROM Orders`;
    const [rows] = await pool.execute(sql);
    return rows;
  },

  // Read One by ID
  async findById(id) {
    const sql = `SELECT orderID, customerName, customerEmail, itemCategory, itemDescription, quantity, unitPrice, orderStatus, orderDate FROM Orders WHERE orderID = ?`;
    const [rows] = await pool.execute(sql, [id]);
    return rows[0] || null;
  }
};

module.exports = Order;
