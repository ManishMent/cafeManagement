const ItemSchema = require("../models/item");
const CategorySchema = require("../models/category");

exports.getItems = async (req, res) => {
  try {
    const items = await ItemSchema.find({
      isActive: true,
    }); // Retrieve all items from the database
    if (!items.length) {
      return res.status(404).json({ message: "No Item Available" });
    }
    res.status(200).json(items); // Respond with the list of items
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};

exports.getItemsByCategory = async (req, res) => {
  try {
    const item = await ItemSchema.find({
      categoryId: req.params.id,
      isActive: true,
    }); // Retrieve all items from the database
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item); // Respond with the list of items
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};

exports.createItem = async (req, res) => {
  try {
    const item = await ItemSchema.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await ItemSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await ItemSchema.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.getItemById = async (req, res) => {
//     try {
//         const item = await ItemSchema.findById(req.params.id);
//         if(!item) {
//             return res.status(404).json({ message: 'Item not found' });
//           }
//         res.status(200).json(item);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
