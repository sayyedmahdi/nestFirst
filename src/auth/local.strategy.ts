import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
 
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthService) {
    super({
      usernameField: 'email',
      secretOrKey: 'sasde'
    });
  }
  async validate(email: string, password: string): Promise<any> {
    return this.authenticationService.getAuthenticatedUser(email, password);
  }
}