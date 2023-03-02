const app = require('./app');

const startServer = async () => {
    const server = require('http').Server(app)
    server.listen(app.get('port'), () => console.log(`Server on in: http://localhost:${app.get('port')}`))
}

startServer();