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
    await query("INSERT * INTO escucha INNER JOIN cancion ON tabla1.columna_comun = tabla2.columna_comun;", [nombre]);
    res.status(201).json({ nombre });
};
export {escucho}