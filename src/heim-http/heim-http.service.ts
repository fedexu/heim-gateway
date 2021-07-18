import { HttpService as axiosHttp } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Injectable, Logger, Patch } from '@nestjs/common';
import { Service } from './service';
import { RoudRobinService } from './roud-robin.service';

const logger = new Logger();

@Injectable()
export class HeimHttpService {

    constructor(
        private readonly httpService: axiosHttp,
        private readonly roudRobinService: RoudRobinService) {
    }

    get<T = any>(url: string, config?: AxiosRequestConfig, service?: Service): Observable<AxiosResponse<T>> {
        return this.httpService.get(this.url(url, service, "GET"), config)
    };
    delete<T = any>(url: string, config?: AxiosRequestConfig, service?: Service): Observable<AxiosResponse<T>> {
        return this.httpService.delete(this.url(url, service, "DELETE"), config)
    };
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig, service?: Service): Observable<AxiosResponse<T>> {
        return this.httpService.post(this.url(url, service, "POST"), data, config)
    };
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig, service?: Service): Observable<AxiosResponse<T>> {
        return this.httpService.put(this.url(url, service, "PUT"), data, config)
    };
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig, service?: Service): Observable<AxiosResponse<T>> {
        return this.httpService.patch(this.url(url, service, "PATCH"), data, config)
    };

    url(url: string, service: Service, verb: string): string {
        let redirect = this.balance(service) + url;
        redirect = service.https ? "https://" + redirect : "http://" + redirect
        logger.log("Redirect: " + url + " -> " + redirect, "HeimHttpService");
        return redirect;
    }

    balance(service: Service) {
        if (service.roundRobin)
            return service.roundRobin()
        else {
            service.roundRobin = this.roudRobinService.roundRobin(service.hosts);
            return service.roundRobin()
        }
    }

}

