import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

export default function handler (req, res) {
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

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(swaggerSpec);
}