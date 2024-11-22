const mongoose = require("mongoose") ;
const initData = require("./data.js") ;
const Listing = require("../models/listing.js") ;

const MONGODB_URI = "mongodb://127.0.0.1:27017/wanderlust";

const connectDB = async () => {
  await mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log(`Connection with DB is successfull!`);
    })
    .catch((err) => console.log(err.message));
};

connectDB();

const initDB = async () => {
    await Listing.deleteMany({}) ;
    await Listing.insertMany(initData.data) ;
    console.log(`Data was initialized.`) ;
}

initDB() ;