const AuthController = require('./AuthController');

const apiStatus = async (req, res) => {
    try {
        res.json({
            status: 'OK',
            message: 'Servidor on-line'
        });
    } catch (e) {
        res.status(500).json({
            status: 'ERRO',
            message: e.message
        });
    }
}

const controller = {
    status: apiStatus,
    auth: AuthController
}

module.exports = controller;