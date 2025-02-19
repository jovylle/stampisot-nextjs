// filepath: /c:/Users/me/fore/lab/stampisot-nextjs/src/pages/api/swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";
import path from "path";

const app = express();

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Admin Panel API",
    version: "1.0.0",
    description: "API documentation for our Next.js project",
  },
  servers: [{ url: "/api" }], // Use relative path
};

const options = {
  swaggerDefinition,
  apis: [path.resolve(process.cwd(), "src/pages/api/**/*.js")], // Absolute path to the API files
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;