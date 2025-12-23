import { Injectable } from '@nestjs/common';
import { OpenAPIObject } from '@nestjs/swagger';

@Injectable()
export class AppService {
  private swaggerDoc: OpenAPIObject;

  setSwaggerDocument(doc: OpenAPIObject) {
    this.swaggerDoc = doc;
  }

  getSwaggerJson(): OpenAPIObject {
    return this.swaggerDoc;
  }

  getHello(): object {
    return {
      status: 'online',
      version: '1.0.0',
      description: 'Esta é API de tarefas (todos) da turma de Infoweb 2025.',
      documentation: '/api-docs' // Dica visual de onde encontrar o Swagger
    };
  }

  getSwaggerHTML(): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>API Documentation</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
        <style>body { margin: 0; padding: 0; }</style>
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js" crossorigin></script>
        <script>
          window.onload = () => {
            window.ui = SwaggerUIBundle({
              url: '/api-docs/json',
              dom_id: '#swagger-ui',
              deepLinking: true,
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIBundle.SwaggerUIStandalonePreset
              ],
              layout: "BaseLayout"
            });
          };
        </script>
      </body>
      </html>
    `;
  }
}