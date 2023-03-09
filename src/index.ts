import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";

const port = 8000;

app.listen(port, () => {
  console.log("====================================");
  console.log("server is listening on: ");
  console.log("====================================");
});
