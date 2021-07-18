import { Module } from '@nestjs/common';
import { JwtAuthController } from './api/jwt-auth/jwt-auth.controller';
import { PortfolioSiteController } from './api/portfolio-site/portfolio-site.controller';
import { HeimHttpModule } from './heim-http/heim-http.module';

@Module({
  imports: [HeimHttpModule],
  controllers: [
    JwtAuthController,
    PortfolioSiteController
    ],
})
export class HeimGatewayModule { }
