import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UseInterceptors
  } from '@nestjs/common';
import { Observable } from 'rxjs';
  
export function Serialize(fields: string[]) {
    return UseInterceptors(new HttpRequestBodyInterceptor(fields));
}
  
@Injectable()
export class HttpRequestBodyInterceptor implements NestInterceptor {
    constructor(private fields: any) {}


    intercept(context: ExecutionContext, next: CallHandler): Observable <any>{
      const request = context.switchToHttp().getRequest().body;
    
      
      this.fields.map((field) => {
        if (request[field] !== undefined && request[field] !== '' && request[field] !== null){
            request[field] =  request[field].replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
            console.log(field , request[field]);
        }
      })
      return next.handle()
    }
}

  
  