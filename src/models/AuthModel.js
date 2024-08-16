const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    usuarios
} = require('../../models');
const UsuariosModel = require('./UsuariosModel');
require('dotenv').config();

class AuthModel {
    static signIn = async (email, password) => {
        try {
            const retorno = await usuarios.findOne({
                where: {
                    email: email,
                    status: 'A'
                }
            });
            if (retorno) {
                const sucesso = await bcrypt.compare(password, retorno.senha);
                if (sucesso) {
                    const token = jwt.sign({
                        userId: retorno.id_usuario
                    }, process.env.JWT_KEY, { expiresIn: '7d'});

                    return {
                        accessToken: token
                    };
                }
            } else {
                return {
                    status: 'ERRO',
                    message: 'Usuário e/ou Senha Inválida'
                }
            }
        } catch (e) {
            console.error('Erro ao autenticar o usuário: ', e);
            throw new Error(e);
        }
    }

    static signUp = async (data) => {
        try {
            const retorno = await usuarios.create({
                nome: data.nome,
                email: data.email,
                senha: data.password
            });
            return await this.profile(retorno.id);
        } catch (e) {
            console.error('Erro ao cadastrar o usuário: ', e);
            throw new Error(e);
        }
    }

    static profile = async (userId) => {
        try {
            const retorno = await UsuariosModel.get(userId);
            return retorno;
        } catch (e) {
            console.error('Erro ao recuperar os dados do usuário: ', e);
            throw new Error(e);
        }
    }

    static verifyToken = (token) => {
        try {
            const retorno = jwt.verify(token, process.env.JWT_KEY, (error, success) => {
                if(! error) {
                    return success;
                }
            });
            return retorno;
        } catch (e) {
            console.error('Erro ao validar o token: ', e);
            throw new Error(e);
        }
    }
}

module.exports = AuthModel;