import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../utils/swagger';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerUiDist = require('swagger-ui-dist');

const swaggerUiAssetPath = swaggerUiDist.getAbsoluteFSPath();

export default function handler (req, res) {
  if (req.method === 'GET') {
    if (req.url === '/api/swagger') {
      res.setHeader('Content-Type', 'text/html');
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Swagger UI</title>
          <link rel="stylesheet" type="text/css" href="/api/swagger/swagger-ui.css" >
          <link rel="icon" type="image/png" href="/api/swagger/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/api/swagger/favicon-16x16.png" sizes="16x16" />
          <style>
            html
            {
              box-sizing: border-box;
              overflow: -moz-scrollbars-vertical;
              overflow-y: scroll;
            }
            *,
            *:before,
            *:after
            {
              box-sizing: inherit;
            }

            body
            {
              margin:0;
              background: #fafafa;
            }
          </style>
        </head>
        <body>
          <div id="swagger-ui"></div>
          <script src="/api/swagger/swagger-ui-bundle.js"> </script>
          <script src="/api/swagger/swagger-ui-standalone-preset.js"> </script>
          <script>
          window.onload = function() {
            const ui = SwaggerUIBundle({
              url: '/api/swagger/swagger.json',
              dom_id: '#swagger-ui',
              deepLinking: true,
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
              ],
              plugins: [
                SwaggerUIBundle.plugins.DownloadUrl
              ],
              layout: "StandaloneLayout"
            })
            window.ui = ui
          }
          </script>
        </body>
        </html>
      `);
    } else if (req.url === '/api/swagger/swagger.json') {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    } else {
      const filePath = `${swaggerUiAssetPath}${req.url.replace('/api/swagger', '')}`;
      res.sendFile(filePath);
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};