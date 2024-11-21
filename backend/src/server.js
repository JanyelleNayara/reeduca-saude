import Fastify from 'fastify';
import users from './users/users.js';
// import routes from './routes/routes.js';
// import cors from '@fastify/cors';

const fastify = Fastify({
    logger: true
})

// fastify.register(cors, {})

// fastify.register(routes)

fastify.register(users)

fastify.listen({port: 3000}, () => { 
    console.log('Server is running on port 3000')
})