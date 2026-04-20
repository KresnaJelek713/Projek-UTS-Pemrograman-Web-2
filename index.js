const express = require("express");
const app = express();

const logger = require("./middleware/logger");
const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());
app.use(logger);
app.use("/", taskRoutes);

app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});