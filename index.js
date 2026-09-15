import express from "express";
import { crearusuario, escucho, login } from "./functions.js";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_, res) => {
  res.send("API working!");
});


app.post("/crearusuario", crearusuario);
app.post("/login",login );
app.post("/escucho", escucho);

const server = app.listen(port, () => {
  console.log(`SpoTICfy API listening at http://localhost:${port}`);
});

export { app, server };
