import mongoose from "mongoose"

// const url = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/QUALICORP";
const url = process.env.MONGO_URI || "mongodb+srv://higor:higor@cluster0.kwl6x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  };


mongoose.connect(url, options)
    .then(() => console.log("Connected to database"))
    .catch(err => console.log(err));

