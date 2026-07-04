import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class Interceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
      console.log('Request started') ;
      const time = Date.now() ;
      return next.handle().pipe(
        tap(() => console.log("response took" ,` ${Date.now() - time}ms`))
      )   
    }
}