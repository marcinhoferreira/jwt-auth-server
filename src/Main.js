const express = require('express');
const cors = require('cors');
const {
    publicRoutes,
    privateRoutes
} = require('./routes');
const controller = require('./controllers');
require('dotenv').config();

const app = express();
const PORT = parseInt(process.env.API_PORT || PORT);

process.env.TZ = 'UTC';

let baseUrl = process.env.API_NAME;

if (process.env.API_NAME) {
    baseUrl = `/${process.env.API_NAME}`;
    if (process.env.API_VERSION) {
        baseUrl = `${baseUrl}/${process.env.API_VERSION}`;
    }    
} else {
    if (process.env.API_VERSION) {
        baseUrl = `/${process.env.API_VERSION}`;
    }
}

baseUrl = `${baseUrl}/`;

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use(baseUrl, publicRoutes);
app.use(baseUrl, controller.auth.verifyToken, privateRoutes);

app.listen(PORT, () => {
    console.log(`Servidor online, na porta ${PORT}`);
});
