// // routes/items.js
// import express from "express";
// import Item from "../models/Item.js"; // Adjust the path if necessary
// import multer from "multer"; // Import multer
// import path from "path";

// const router = express.Router();
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads"); // Set the destination folder for uploaded files
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Append the current timestamp to the filename
//   },
// });
// const upload = multer({ storage }); // Create multer instance

// // POST route to add a new item
// router.post("/", upload.single("image"), async (req, res) => {
//   const { item_name, item_price } = req.body; // Get item name and price from request body
//   const image = req.file.path; // Get the file path from the uploaded file

//   const newItem = new Item({
//     item_name,
//     item_price,
//     image,
//   });

//   try {
//     const savedItem = await newItem.save();
//     res.status(201).json(savedItem); // Respond with the newly created item
//   } catch (error) {
//     console.error("Error saving item:", error); // Log error
//     res.status(500).json({ message: error.message }); // Send error response
//   }
// });

// // GET route to fetch all items
// router.get("/", async (req, res) => {
//   try {
//     const items = await Item.find(); // Fetch items from the database
//     res.status(200).json(items); // Respond with the list of items
//   } catch (error) {
//     console.error("Error fetching items:", error); // Log error
//     res.status(500).json({ message: error.message }); // Send error response
//   }
// });

// export default router;
// routes/items.js
import express from "express";
import Item from "../models/Item.js"; // Adjust the path if necessary
import multer from "multer"; // Import multer
import path from "path";

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the current timestamp to the filename
  },
});
const upload = multer({ storage }); // Create multer instance

// POST route to add a new item
router.post("/", upload.single("image"), async (req, res) => {
  const { item_name, item_price } = req.body; // Get item name and price from request body
  const image = req.file.path; // Get the file path from the uploaded file

  const newItem = new Item({
    item_name,
    item_price,
    image,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem); // Respond with the newly created item
  } catch (error) {
    console.error("Error saving item:", error); // Log error
    res.status(500).json({ message: error.message }); // Send error response
  }
});

// GET route to fetch all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find(); // Fetch items from the database
    res.status(200).json(items); // Respond with the list of items
  } catch (error) {
    console.error("Error fetching items:", error); // Log error
    res.status(500).json({ message: error.message }); // Send error response
  }
});

// GET route to fetch a specific item by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ message: error.message });
  }
});

// PUT route to update a specific item by ID
router.put("/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { item_name, item_price } = req.body;
  const updatedData = {
    item_name,
    item_price,
  };

  if (req.file) {
    updatedData.image = req.file.path; // If a new image is uploaded, update the image path
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Run validators on the updated data
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: error.message });
  }
});

// DELETE route to delete a specific item by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
