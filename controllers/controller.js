import Model from "./../models/model.js";
import UserModel from "./../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
/* import { auth } from "./../middleware/auth.js"; */
export const createRecord = async (req, res) => {
  try {
    const newModel = new Model(req.body);
    await newModel.save();

    res.status(201).json(newModel);
  } catch (err) {
    console.log(err.message);
  }
};

export const showRecord = async (req, res) => {
  try {
    const allRecord = await Model.find();
    res.status(201).json(allRecord);
  } catch (err) {
    console.log(err.message);
  }
};

export const updateRecord = async (req, res) => {
  try {
    console.log(req.params.id);
    await Model.findById(req.params.id, (err, singleRecord) => {
      console.log(singleRecord);
      res.json(singleRecord);
    });
    console.log(singleRecord);
    res.status(200).json(singleRecord);
  } catch (err) {
    console.log("Some error ocuredd..");
  }
};

export const updateRecordInDatabase = async (req, res) => {
  //console.log(req.params.id);
  await Model.findById(req.params.id, (error, response) => {
    if (!response) {
      res.status(400).send("Data not found");
    } else {
      response.firstName = req.body.firstName;
      response.task = req.body.task;
      response.description = req.body.description;
      response.photo = req.body.photo;
      response.priority = req.body.priority;
      response.is_completed = req.body.is_completed;
    }
    response.save().then((response) => res.json("Updated"));
  });
};

export const deleteRecord = async (req, res) => {
  await Model.findByIdAndDelete(req.params.id, (error, response) => {
    if (!response) {
      res.status(400).send("data not found");
    } else {
      console.log("Deleted..", response);
      res.status(200).json({ response });
    }
  });
};

export const userRegistration = async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;
    if (!email || !password || !passwordCheck) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "Password needs to be at least 5 character long" });
    }
    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ msg: "Enter same password twice for verification" });
    }
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An Account with this email already exist." });
    }
    if (!displayName) {
      displayName = email;
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      email,
      password: passwordHash,
      displayName,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.json(savedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "No user with this email has been registered" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const tokenIsValid = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }
    const user = await UserModel.findById(verified.id);
    if (!user) {
      return res.json(false);
    }
    return res.json(true);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
