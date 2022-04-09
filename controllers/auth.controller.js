const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require("../models/usuario.model");
const { generarJWT } = require('../helpers/jwt.helpers');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {

        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario y/o contraseña no valida'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario y/o contraseña no valida'
            });
        }

        // Generar TOKEN JWT
        const token = await generarJWT( usuarioDB.id );
        
        res.json({
            ok: true,
            token
        });
    } catch ( error ) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    login
};