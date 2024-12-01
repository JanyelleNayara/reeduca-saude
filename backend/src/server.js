import Fastify from 'fastify';
import routes from './routes/routes.js';


const fastify = Fastify({
    logger: true
});

fastify.register(routes);

const start = async () => {
    try {
        await fastify.listen({port: 3000});
        console.log('Server is running on port 3000');
        
    } catch (error) {
        fastify.log.error(error);
        process.exit(1)        
    }
};

start();