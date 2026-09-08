function crearusuario(){

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