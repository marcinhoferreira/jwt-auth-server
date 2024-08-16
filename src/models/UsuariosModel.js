const { usuarios } = require('../../models');

class UsuariosModel {
    static get = async (userId) => {
        try {
            const retorno = await usuarios.findByPk(userId);
            return retorno;
        } catch (e) {
            console.error('Erro ao recuperar os dados do usuário: ', e);
            throw new Error(e);
        }
    }
}

module.exports = UsuariosModel;