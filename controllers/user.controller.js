// --------- Post User ---------

exports.createUser = async (req, res) => {
  const { error } = ValidateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { userName, email, password, customer_id } = req.body;

  try {
    const existingUser = await User.findOne({ where: { userName } });
    if (existingUser) {
      return res.status(409).json({ message: "Bu user mavjud" });
    }

    const user = await User.create({ userName, email, password, customer_id });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
