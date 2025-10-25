const mongoose = require('./database');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./src/graphql/typeDefs');
const resolvers = require('./src/graphql/resolvers');
const app = require('./app');

async function startServer() {
    // Crear instancia de Apollo Server
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        // Activar introspección y playground en todos los entornos
        introspection: true,
        formatError: (error) => {
            console.error('GraphQL Error:', error);
            return {
                message: error.message,
                locations: error.locations,
                path: error.path,
            };
        },
    });

    // Iniciar Apollo Server en modo standalone
    const { url } = await startStandaloneServer(apolloServer, {
        listen: { port: 4000 },
        context: async ({ req }) => ({
            // Aquí puedes agregar contexto como autenticación
            token: req.headers.authorization || '',
        }),
    });

    console.log('🚀 Apollo Server iniciado correctamente');
    console.log(`🚀 GraphQL API: ${url}`);
    console.log(`📚 GraphQL Playground: ${url}`);

    // Iniciar servidor Express para REST API
    app.listen(app.get('puerto'), () => {
        console.log('Nombre de la App:', app.get('nombreApp'));
        console.log('Puerto del servidor:', app.get('puerto'));
        console.log(`🌐 REST API: http://localhost:${app.get('puerto')}/api`);
    });
}

startServer().catch((error) => {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
});