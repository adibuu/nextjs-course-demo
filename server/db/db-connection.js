const mongoose = require("mongoose");

const uri =
  "mongodb+srv://admin:e7aCzTwsJUCRmR4n@cluster0.gdw9n.mongodb.net/meetups?retryWrites=true&w=majority";

try {
  mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    () => console.log("Connected to database")
  );
} catch (error) {
  console.log("Could not connect to database: " + error.message);
}
