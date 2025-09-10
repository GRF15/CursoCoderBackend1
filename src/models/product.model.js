const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  code: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: [String], default: [] },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null } // 🔹 para premium
}, { timestamps: true });

productSchema.plugin(mongoosePaginate);


module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);