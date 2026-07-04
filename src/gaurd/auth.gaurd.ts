import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AuthGaurd implements CanActivate{
   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
       const user = context.switchToHttp().getRequest().user ;
       return user.role === "manager"
   }
}