import mongoose from "mongoose"

const url = process.env.MONGO_URI || "mongodb://localhost:27017/";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  };


mongoose.connect(url, options)
    .then(() => console.log("Connected to database"))
    .catch(err => console.log(err));

