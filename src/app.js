const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post('/signup', async(req, res) => {

  const user = new User(req.body);

  try {
    await user.save();
    res.send("user saved successfully")
  } catch (error) {
    res.status(400).send("There is an issue while saving user", error.message)
  }
});

app.get('/user', async (req, res) => {
  try {
    const users = await User.find({emailId: req.body.emailId});
    if(users.length === 0) {
      res.status(404).send("user not found")
    }
    res.send(users)
  } catch (error) {
    console.log(error)
    res.status(404).send("Some thing went wrong")
  }
});

app.get('/feed', async (req, res) => {
  try {
    const users = await User.find({})
    await res.send(users);
  } catch (error) {
    console.log(error)
    res.status(404).send("Some thing went wrong")
  }
});

app.delete('/user', async (req, res) => {
  try {
    const user = await User.findOneAndDelete(req.body.userId);
    res.send("User deleted successflly")
  } catch (error) {
    console.log(error)
    res.status(404).send("Some thing went wrong")
  }
})

app.patch('/user', async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOneAndUpdate({ _id: req.body.userId, data: req.body });
    res.send("User updated successflly")
  } catch (error) {
    console.log(error)
    res.status(404).send("Some thing went wrong")
  }
})

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("server is listning on port 3000")
  })
})
.catch(() => {
  console.log("DB connection is failed")
})
