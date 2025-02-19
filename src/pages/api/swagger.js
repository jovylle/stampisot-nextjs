import swaggerJSDoc from "swagger-jsdoc";

export default function handler (req, res) {
  const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "Admin Panel API",
      version: "1.0.0",
      description: "API documentation for our Next.js project",
    },
    servers: [{ url: "/api" }], // Change to deployed URL later
  };

  const options = {
    swaggerDefinition,
    apis: ["./src/pages/api/**/*.js"], // <-- Corrected path
  };

  const swaggerSpec = swaggerJSDoc(options);

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(swaggerSpec);
}
