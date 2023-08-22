import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Hirely API')
        .setDescription('Hirely API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('swagger', app, swaggerDocument);

    app.useGlobalPipes(new ValidationPipe());

    const configService = app.get(ConfigService);

    const port = configService.get('PORT');
    await app.listen(port);
}
bootstrap();
