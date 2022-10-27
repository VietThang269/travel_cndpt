const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./db/conn");
const router = require("./routes/router");
const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("./uploads"));
app.use(router);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server runing in ${PORT}`);
});
