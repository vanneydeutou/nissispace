const bcrypt = require("bcrypt");
const User = require("../entities/User");
const { userRegistrationSchema } = require("../validations/authValidations");

exports.registerUser = async (req, res) => {
  const { username, password, phoneNumber, email } = req.body;

  try {
    // Validate request data using the schema
    const { error } = userRegistrationSchema.validate({
      username,
      password,
      phoneNumber,
      email,
    });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const existingUser = await User.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = User.create({
      username,
      password: hashedPassword,
      phoneNumber,
      email,
    });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
