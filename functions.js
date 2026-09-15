const crearusuario = async (req, res) => {
        const { nombre, password } = req.body;
        const newpassword = bcrypt.hash(password)
        await query("INSERT INTO usuario (nombre, password) VALUES ($1, $2)" [nombre, newpassword])
    }
export {crearusuario}
function login() {
    
}
export {login}
const escucho = async (req, res) => {
    const { token } = req.body;
    let tokendesencriptado = await jwt.verify(token,clave)
    res.json( await query("INSERT * INTO escucha as esc INNER JOIN cancion as can ON esc.cancion_ID = can.ID INNER JOIN usuario as us ON esc.usuario_id = us.ID where us.id", [tokendesencriptado]));
};
export {escucho}