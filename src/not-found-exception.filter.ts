import { ArgumentsHost, Catch, ExceptionFilter, HttpException, NotFoundException } from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const request = host.switchToHttp().getRequest();


    if (/(?:\/|^)[^.\/]+$/.test(request.url)) {
      // console.log("it's a URL")
      response.status(404).json(exception.getResponse());
    } else {
      // console.log("it's a file")
      response.redirect('/TO_BE_STATIC_SERVER')
    }
  }
}
