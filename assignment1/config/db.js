// const mongoose = require('mongoose')

// const connectDB = async () => {
//   try {
//     // await mongoose.connect(process.env.MONGO_URI, {
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true,
//     // });
//     await mongoose
//       .connect(process.env.MONGO_URI)
//       .then(() => console.log('MongoDB Connected...'))
//       .catch(err => console.error('MongoDB Connection Error:', err.message))

//     console.log('MongoDB Connected...')
//   } catch (err) {
//     console.error(err.message)
//     process.exit(1)
//   }
// }

// module.exports = connectDB
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Assignment1', {  // <-- Đổi thành MongoDB Local
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected to Local!');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
