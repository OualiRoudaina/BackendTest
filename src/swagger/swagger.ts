// src/swagger/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

/**
 * @param {Express} app - Instance d'Express
 */
function setupSwagger(app: Express) {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: { title: "Dashboard API", version: "1.0.0" },
    },
    apis: ["./src/controllers/*.ts"], // chemins vers tes controllers
  };

  const specs = swaggerJsdoc(options);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
}

export default setupSwagger;
