const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageURL: { type: String, required: true },
    maxStock: { type: Number, required: true, min: 0 },
    minStock: { type: Number, required: true, min: 0 },
    currentStock: { type: Number, required: true, min: 0 },
    pageNumber: { type: Number, required: true, min: 1 },
  },
  {
    // Automatically handle timestamps (createdAt, updatedAt)
    timestamps: true,
  }
);

// Optionally, you can add a pre-save hook to validate stock consistency
inventoryItemSchema.pre('save', function (next) {
  if (this.currentStock < this.minStock) {
    this.status = 'Low Stock'; // or trigger a custom behavior
  }
  next();
});

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);
