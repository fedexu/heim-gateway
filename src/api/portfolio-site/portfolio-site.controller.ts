import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HeimHttpService } from 'src/heim-http/heim-http.service';
import { Service } from 'src/heim-http/service';
import { JwtGuard } from 'src/jwt.guard';
import { JwtFilter } from 'src/jwt.filter';

@Controller()
export class PortfolioSiteController {
    // private service: Service = environment.services.serviceA;

    constructor(
        private readonly http: HeimHttpService
    ) { }

    // @UseGuards(JwtGuard)
    // @UseFilters(JwtFilter)
    // @Get('/ping')
    // pingServiceA() {
    //     return this.http.get("/ping", undefined, this.service).pipe(
    //         map(response => response.data)
    //     );
    // }

}
