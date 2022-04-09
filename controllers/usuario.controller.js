const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario.model");
const { generarJWT } = require('../helpers/jwt.helpers');

const getUsuarios = async (req, res = response) => {
  const usuarios = await Usuario.find({}, "nombre email role google");
  res.json({
    ok: true,
    usuarios,
  });
};

const crearUsuarios = async (req, res = response) => {
  const { password, email } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya se encuentra registrado",
      });
    }
    const usuario = new Usuario(req.body);
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();

    // Generar TOKEN JWT
    const token = await generarJWT( usuario.id );

    res.json({
      ok: true,
      usuario,
      token
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const actualizarUsuario = async (req, res = response) => {
  const uid = req.params.id;
  // TODO: Validar  token y comprobar si es el usuario correcto
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      res.status(404).json({
        ok: false,
        msg: "No existe un usuario",
      });
    }

    // Actualizaciones
    const { password, google, email, ...campos } = req.body;
    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if ( existeEmail ) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese Email",
        });
      }
    }

    campos.email = email;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const eliminarUsuario = async (req, res = response) => {
    const uid = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      res.status(404).json({
        ok: false,
        msg: "No existe un usuario",
      });
    }

    const usuario = await Usuario.findByIdAndDelete( uid );
    res.json({
        ok: true,
        msg: 'Usuario eliminado'
    });

    } catch( error ) { 
        console.error(error);
        res.status(500).json({
          ok: false,
          msg: "Error inesperado... revisar logs",
        });
    };
};


module.exports = {
  getUsuarios,
  crearUsuarios,
  actualizarUsuario,
  eliminarUsuario
};
