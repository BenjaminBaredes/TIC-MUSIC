import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {

    const [tipo, token] = (req.headers.authorization ?? "").split(" ");

    if (tipo !== "Bearer" || !token) {
        return res.status(401).json({ mensaje: "Token requerido" });
    }

    try {
        req.usuario = jwt.verify(token, process.env.JWT_SECRET)
        next();
    } catch {
        res.status(401).json({ mensaje: "Token inválido o vencido" });
    }
};
export const verificarAdmin = (req, res, next) => {
 if (!req.usuario){
    res.status(401).json({ mensaje: "usuario no autenticado"  });
 }
 if (req.usuario.rol !== "admin") {
    return res.status(403).json({ mensaje: "Acceso denegado: se requieren permisos de administrador" });
}
else{
    next()
}
};