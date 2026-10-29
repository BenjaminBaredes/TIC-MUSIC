import express from "express";
import usuarioRoutes from "./routes/routes.js";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send("API working!");
});

app.use("/", usuarioRoutes);

if (process.env.NODE_ENV !== "production") {
  const port = 3000;
  app.listen(port, () => {
    console.log(`SpoTICfy API listening at http://localhost:${port}`);
  });
}

export default app;