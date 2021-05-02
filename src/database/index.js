import mongoose from "mongoose"

const url = "mongodb://127.0.0.1:27017/QUALICORP";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };


mongoose.connect(url, options)
    .then(() => console.log("Connected to database"))
    .catch(err => console.log(err));

