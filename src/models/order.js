const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    table: {
      type : mongoose.Schema.Types.ObjectId,
      ref: "Table", // This references the 'Table' collection
      required: true,
    },

    items: [
      {
        item: {
          type : mongoose.Schema.Types.ObjectId,
          ref: "Item", // This references the 'Item' collection
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);


