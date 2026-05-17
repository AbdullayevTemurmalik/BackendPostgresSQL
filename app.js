const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/database");
const setupSwagger = require("./swagger/swagger");
const User = require("./routes/user.route");

const app = express();
app.use(express.json());
app.use(cors());

// Routers
app.use("/users", User);

setupSwagger(app);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log("Database connected successfully.");
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/api-docs`);
  });
});
