import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { environment } from "./environments/environment";
import { HeimHttpService } from "./heim-http/heim-http.service";
import { Service } from "./heim-http/service";

const logger = new Logger();

@Injectable()
export class JwtGuard implements CanActivate {

    private authenticationService: Service = environment.services.authentication;

    constructor(private readonly heimHttpService: HeimHttpService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        let headers = { headers: { authorization: request.headers.authorization ? request.headers.authorization : "" } }

        let errorCode = false;
        let result = await this.heimHttpService.get("/autenticate", headers, this.authenticationService).toPromise()
            .catch((error) => {
                // logger.log("UNAUTHORIZED REQUEST ");
                errorCode = error.response.status;
            });

        if (errorCode)
            return false;
        else
            return true;
    }

}