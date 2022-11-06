import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export class ApiKeyGuard implements CanActivate {
  private apiKey = '709b493c-abc5-48c9-amar-bangla-c7f8f9e5aae3';

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    console.log(req.headers);

    const token = req.headers['x-api-key'];

    if (!token) {
      throw new UnauthorizedException('Token is Required in headers');
    }

    if (token !== this.apiKey) {
      throw new UnauthorizedException('Token is Required in headers');
    }

    //12MEMjflfg9lHbeb
    return true;
  }
}
