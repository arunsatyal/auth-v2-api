import router from "express";
import bcrypt from "bcrypt";

import { User, validate } from "../models/userSchema.js";
import router from "./userRouter";

// Create User Router // Signup user router
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // Check for user email is already registered or not
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(409)
        .send({ message: "User with this email already exist." });
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await new User({ ...req.body, password: hashPassword }).save();
      res.status(201).send({ message: "User created successfully." });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
