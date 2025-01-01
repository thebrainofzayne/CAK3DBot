const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageURL: { type: String, required: true },
  maxStock: { type: Number, required: true },
  minStock: { type: Number, required: true },
  currentStock: { type: Number, required: true },
  pageNumber: { type: Number, required: true },
});

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);
