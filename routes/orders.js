// import express from "express";
// import Order from "../models/Order.js"; // Import the Order model

// const router = express.Router();

// // POST request to create a new order
// router.post("/", async (req, res) => {
//   try {
//     const orderData = req.body;
//     const newOrder = new Order(orderData);
//     await newOrder.save(); // Save the order to the database
//     res.status(201).send({ message: "Order created", data: newOrder });
//   } catch (error) {
//     console.error("Error saving order:", error);
//     res.status(500).send({ message: "Error saving order" });
//   }
// });

// // GET request to retrieve all orders
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find(); // Fetch all orders from the database
//     res.json(orders); // Send the orders as a response
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).send({ message: "Error fetching orders" });
//   }
// });

// export default router;
import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// POST request to create a new order
router.post("/", async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = new Order(orderData);
    await newOrder.save(); // Save the order to the database
    res.status(201).send({ message: "Order created", data: newOrder });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).send({ message: "Error saving order" });
  }
});

// GET request to retrieve all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send({ message: "Error fetching orders" });
  }
});

// GET request to retrieve a specific order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).send({ message: "Error fetching order" });
  }
});

// Optional: DELETE request to delete an order by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.status(200).send({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).send({ message: "Error deleting order" });
  }
});

export default router;
