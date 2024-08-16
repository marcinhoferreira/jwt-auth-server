const { AuthModel } = require('../models');

class AuthController {
    static signIn = async (req, res) => {
        try {
            const { email, password } = req.body;            
            const retorno = await AuthModel.signIn(email, password);
            if (! retorno) {
                res.status(401).json({
                    status: 'ERRO',
                    message: 'Usuário e/ou senha inválido'
                });
            } else {
                res.json(retorno);
            }
        } catch (e) {
            res.status(500).json({
                status: 'ERRO',
                message: e.message
            });
        }
    }

    static signUp = async (req, res) => {
        try {
            const data = {
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.password || null
            }
            const retorno = await AuthModel.signUp(data);
            res.json(retorno);
        } catch (e) {
            res.status(500).json({
                status: 'ERRO',
                message: e.message
            });
        }
    }

    static profile = async (req, res) => {
        try {
            const { userId } = req.params;
            const retorno = await AuthModel.profile(userId);
            res.json(retorno);
        } catch (e) {
            res.status(500).json({
                status: 'ERRO',
                message: e.message
            });
        }
    }

    static verifyToken = async (req, res, next) => {
        try {
            const authorizationHeeader = req.headers['authorization'];
            if (typeof authorizationHeeader !== 'undefined') {
                const bearer = authorizationHeeader.split(' ');
                const token = bearer[1];
                const retorno = AuthModel.verifyToken(token);
                if (retorno) {
                    req.userId = retorno.userId;
                    next();
                } else {
                    res.status(401).json({
                        status: 'ERRO',
                        message: 'Token inválido'
                    });
                }
            } else {
                res.sendStatus(403);
            }
        } catch (e) {
            res.status(500).json({
                status: 'ERRO',
                message: e.message
            });
        }
    }
}

module.exports = AuthController;