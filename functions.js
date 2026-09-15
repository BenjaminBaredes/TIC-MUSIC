function crearusuario(){

}
export {crearusuario}
function login() {
    
}
export {login}
const escucho = async (req, res) => {
    const { token } = req.body;
    let tokendesencriptado = await jwt.verify(token,clave)
    await query("INSERT * INTO escucha as esc INNER JOIN cancion as can ON esc.cancion_ID = can.ID INNER JOIN usuario as us ON esc.usuario_id = us.ID where us.id", [tokendesencriptado]);
    res.status(201).json({ tokendesencriptado  });
};
export {escucho}