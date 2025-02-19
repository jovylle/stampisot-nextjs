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
    apis: [path.join(__dirname, "users/*.js")], // Explicit path to the API files
  };

  console.log("Swagger options:", options); // Log the options to debug

  const swaggerSpec = swaggerJSDoc(options);

  console.log("Generated Swagger Spec:", swaggerSpec); // Log the generated spec to debug

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(swaggerSpec);
}