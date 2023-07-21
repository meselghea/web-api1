import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { PORT } from "./config/config";
import * as cors from "cors";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Tambahkan konfigurasi CORS di sini
 app.use(
    cors({
      origin: "https://w23-vercel-cub24rt71-anggr.vercel.app",
      credentials: true,
    })
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("Warteg API")
    .setDescription("Warteg API documentation")
    .setVersion("2.0")
    .addTag("API")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(PORT, () => {
    console.log(`Your application is running on http://localhost:${PORT}`);
  });
}

bootstrap();
