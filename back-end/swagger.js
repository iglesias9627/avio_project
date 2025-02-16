import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: { title: 'Aviobook API', version: '1.0.0', description: 'API documentation for managing flights' },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default (app) => {
  app.use('/api-docs', serve, setup(swaggerDocs));
};
