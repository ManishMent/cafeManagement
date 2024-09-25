const mongoose = require("mongoose");
const TableSchema = new mongoose.Schema(
  {
    tableNumber: { type: String, required: true, unique: true, trim: true },
    tableCapacity: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Table", TableSchema);
