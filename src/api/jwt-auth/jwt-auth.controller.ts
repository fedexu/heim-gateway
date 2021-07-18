import { Controller, Get, HttpException, HttpStatus, Post, Request, UseFilters, UseGuards } from '@nestjs/common';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { HeimHttpService } from 'src/heim-http/heim-http.service';
import { Service } from 'src/heim-http/service';
import { JwtGuard } from 'src/jwt.guard';

@Controller()
export class JwtAuthController {
    private service: Service = environment.services.authentication;

    constructor(
        private readonly http: HeimHttpService
    ) { }

    @Post('/token')
    token(@Request() request) {
        return this.http.post("/token", request.body, undefined, this.service).pipe(
            map(response => response.data),
            catchError(error => {
                throw new HttpException({
                    status: error.response.status,
                    error: error.response.statusText,
                }, error.response.status);
            })
        );
    }

    // Example of whildCard with Bearer proxy
    @Get('/autenticate*')
    @UseGuards(JwtGuard)
    profile(@Request() request) {
        return this.http.get(request.url, { headers: { authorization: request.headers.authorization } }, this.service).pipe(
            map(response => response.data),
            catchError(error => {
                throw new HttpException({
                    status: error.response.status,
                    error: error.response.statusText,
                }, error.response.status);
            })
        );
    }

}
