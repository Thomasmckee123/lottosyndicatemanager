import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "lottoSyndicateManager",
      version: "1.0.0",
      description: "API documentation for your Node.js Express backend",
    },
    basePath: "/",
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["src/routers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export { swaggerSpec };
