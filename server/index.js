
/* external imports */
const mongoose = require("mongoose");
require("dotenv").config();

/* internal imports */
const app = require("./app");
const consoleMessage = require("./utils/console.util");
const port = process.env.PORT || 3000;

/* database connection */
const uri = `${process.env.ATLAS_URI}/${process.env.DB_NAME}`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => consoleMessage.successMessage("Connected to MongoDB."))
  .catch((error) => consoleMessage.errorMessage(error.message));

/* establish server port */
app.listen(port, () => {
  consoleMessage.warningMessage(`Server is running on port ${port}.`);
});
