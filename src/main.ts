import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Tarefas (TODO List)')
    .setDescription('API para gerenciamento de tarefas da turma Infoweb 2025')
    .setVersion('1.0')
    .addTag('tasks')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // Injeta o documento no AppService para ser servido manualmente
  const appService = app.get(AppService);
  appService.setSwaggerDocument(document);

  // Opcional: Ainda tenta configurar o padrão caso o ambiente suporte, 
  // mas nossos endpoints manuais /api-docs e /api-docs/json garantem o funcionamento.
  try {
    SwaggerModule.setup('docs-padrao', app, document);
  } catch (e) {
    console.log('Swagger UI padrão não pôde ser carregado (provavelmente falta swagger-ui-express), usando fallback manual.');
  }

  await app.listen(3000);
}
bootstrap();