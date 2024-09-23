const mongoose = require("mongoose");
// const logger = require("./logger"); // Assuming you're using a logger like Winston

const connectToDatabase = async (databaseUrl) => {
  try {
    await mongoose.connect(databaseUrl, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useCreateIndex: true,
      //   useFindAndModify: false,
      connectTimeoutMS: 10000, // Setting a timeout for the connection
    });
    console.log("MongoDB Connected Successfully ");
    // logger.info("MongoDB connected successfully");
  } catch (error) {
    console.log("Database connection error", error.message);
    // logger.error("Database connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectToDatabase;
