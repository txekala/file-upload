import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = +process.env.SERVER_PORT! || 3000;

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('WebDisk API')
    .setDescription('API for upload files')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, () => {
    console.log(`[SERVER] - http://localhost:${port}`);
  });
}
bootstrap();
