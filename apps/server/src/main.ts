import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api'); // grlobal prefix means /api/...
  const port = process.env.PORT;
  await app.listen(port ?? 3000);
  console.log(`Server is running on ${port} 🚀`);
}
void bootstrap();
