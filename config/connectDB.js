const { connect } = require("http2");
const mongoose = require("mongoose");

const connectDB = async (mongo_url) => {
  try {
    const DB_OPTIONS = {
      dbName: "learnAPI"
    }

    await mongoose.connect(mongo_url, DB_OPTIONS);

    console.log("Database connection established !")

  } catch (error) {
    console.log(error);
    console.log('error.name - ',);
    console.log('error.message - ',);
  }
}

module.exports = connectDB;