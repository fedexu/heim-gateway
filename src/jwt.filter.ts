import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class JwtFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        const request = host.switchToHttp().getRequest();
        const status = exception.getStatus();

        response.status(status).redirect('/login')
    }
}