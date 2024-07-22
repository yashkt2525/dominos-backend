import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

app.listen(1234, () => console.log("App starting at PORT 1234"));

mongoose
  .connect(
    "mongodb+srv://yashdb:BQ813OVBsitrfo4f@cluster0.3ypsu0u.mongodb.net/dominos"
  )
  .then(() => console.log("SuccessFully Cnnected With Mongodb"))
  .catch((err) => console.log(err));

const productSchema = new mongoose.Schema({
  product_id: String,
  product_name: String,
  toppings: [String],
  price: Number,
  size: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  ph_no: String,
  gender: String,
  user_id: Number,
  id_deleted: Boolean,
});

const Product = mongoose.model("products", productSchema);
const User = mongoose.model("users", userSchema);

app.get("/", (req, res) => {
  res.json({ name: "Hello", age: 10, weight: 10 });
});
app.get("/get-products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/user", async (req, res) => {
  const user = req.body;
  console.log(user);
  const exist = await User.findOne({ user_id: user.user_id });
  console.log(exist);
  if (!exist) {
    User.create(user);
    res.send("user created Succesfully");
  }
  res.json("Already Exists");
});

app.get("/get-users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
