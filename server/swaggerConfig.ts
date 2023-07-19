import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'lottoSyndicateManager',
      version: '1.0.0',
      description: 'API documentation for your Node.js Express backend',
    },
    basePath: '/',
  },
  apis: ['src/routers/*.ts'], // Update the path to match your route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export { swaggerSpec };