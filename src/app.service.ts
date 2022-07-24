import { Injectable } from '@nestjs/common';
import { CustomDynamicService } from './custom-dynamic-module/dynamic.service';

@Injectable()
export class AppService {
  constructor(private customDynamicService: CustomDynamicService) {}
  
  getHello(): string {
    return 'Hello World!';
  }

  getProperty (): any {
    return this.customDynamicService.get();
  }
}
