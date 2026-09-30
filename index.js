import express from "express";
import { crearusuario, escucho, login } from "./functions.js";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send("API working!");
});

app.post("/crearusuario", crearusuario);
app.post("/login", login);
app.post("/escucho", escucho);

if (process.env.NODE_ENV !== "production") {
  const port = 3000;
  app.listen(port, () => {
    console.log(`SpoTICfy API listening at http://localhost:${port}`);
  });
}

export default app;