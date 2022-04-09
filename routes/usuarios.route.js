/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, crearUsuarios, actualizarUsuario, eliminarUsuario } = require('../controllers/usuario.controller');
const { validarJWT } = require('../middlewares/validarjwt.middleware');
const router = Router();

router.get( '/', validarJWT, getUsuarios );
router.post( '/', 
    [   
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ], crearUsuarios );

router.put( '/:id',
    [   
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ], actualizarUsuario );

router.delete( '/:id', validarJWT, eliminarUsuario );

module.exports = router;