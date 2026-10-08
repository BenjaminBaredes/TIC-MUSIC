import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {

    const [tipo, token] = (req.headers.authorization ?? "").split(" ");

    if (tipo !== "Bearer" || !token) {
        return res.status(401).json({ mensaje: "Token requerido" });
    }

    try {
        req.usuario = jwt.verify(token, process.env.JWT_SECRET);

        next();
    } catch {
        res.status(401).json({ mensaje: "Token inválido o vencido" });
    }
};