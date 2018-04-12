const Hapi = require('hapi');
const BookSchema = require('./book.schema');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');

const server = Hapi.Server({
    host: 'localhost',
    port: 4545
});

async function registerGraphql() {
    await server.register({
        plugin: graphqlHapi,
        options: {
            path: '/graph',
            graphqlOptions: {
                schema: BookSchema,
                debug: true
            },
            route: {
                cors: false
            }
        }
    });

    await server.register({
        plugin: graphiqlHapi,
        options: {
            path: '/debug',
            graphiqlOptions: {
                endpointURL: '/graph',
                formatError: error => ({
                    message: error.message,
                    location: error.location,
                    stack: error.stack
                })
            }
        }
    });
}

async function registerRoutes() {
    server.route({
        method: 'GET',
        path: '/',
        handler: () => 'Up and running.'
    });

    await registerGraphql();
}

async function start(server) {
    await registerRoutes();
    await server.start();
}

start(server)
.then(() => {
    console.log('Server started');
})
.catch(err => {
    console.error(err);
});