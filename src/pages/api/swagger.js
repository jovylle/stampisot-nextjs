import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import glob from "glob";

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

  const apiPath = path.join(__dirname, "../../../src/pages/api/**/*.js");
  console.log("Resolved API path:", apiPath); // Log the resolved API path

  // Log the matched files
  glob(apiPath, (err, files) => {
    if (err) {
      console.error("Error matching files:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    console.log("Matched files:", files); // Log the matched files

    const options = {
      swaggerDefinition,
      apis: files, // Use the matched files
    };

    console.log("Swagger options:", options); // Log the options to debug

    const swaggerSpec = swaggerJSDoc(options);

    console.log("Generated Swagger Spec:", swaggerSpec); // Log the generated spec to debug

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(swaggerSpec);
  });
}