const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, 
    required: true,
    min:[0, 'Gia tien phai lon hon 0'],
    max:[1000000,'Gia tien phai be hon 1000000'] 
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
})

module.exports = mongoose.model('Product', ProductSchema)
//MONGO_URI=mongodb+srv://khanglpse161421:1@cluster0.ulvt5.mongodb.net/Assignment1?retryWrites=true&w=majority
