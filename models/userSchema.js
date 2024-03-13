import { jwt, sign } from "jsonwebtoken";
import mongoose from "mongoose";
import Joi from "joi";
import JoiPasswordComplexity from "joi-password-complexity";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

// Generating Authentication Tokens Using JWT
userSchema.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_TOKEN, {
    expiresIn: "12h",
  });

  return token;
};

// Joi validation
const User = mongoose.model("user", userSchema);
const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().required().label("Email address"),
    password: JoiPasswordComplexity().required().label("Password"),
  });

  return schema.validate(data);
};

export default { User, validate };
