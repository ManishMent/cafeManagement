const TableSchema = require("../models/table");

exports.createTable = async (req, res) => {
  try {
    const table = await TableSchema.create(req.body);
    res.status(201).json(table);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTable = async (req, res) => {
  try {
    const table = await TableSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteTable = async (req, res) => {
  try {
    const table = await TableSchema.findByIdAndDelete(req.params.id);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllTables = async (req, res) => {
  try {
    const tables = await TableSchema.find();
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const table = await TableSchema.findById(req.params.id);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.status(201).json(table);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
