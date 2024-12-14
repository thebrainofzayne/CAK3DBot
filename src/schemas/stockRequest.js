const mongoose = require('mongoose');

const stockRequestSchema = new mongoose.Schema(
  {
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem', required: true },
    requestedBy: { type: String, required: true },
    requestedQuantity: { type: Number, required: true, min: 1 }, // Ensures the quantity is at least 1
    status: { type: String, enum: ['Pending', 'Approved', 'Denied'], default: 'Pending' }, // Enum for status
    requestedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

const StockRequest = mongoose.model('StockRequest', stockRequestSchema);

module.exports = StockRequest;
