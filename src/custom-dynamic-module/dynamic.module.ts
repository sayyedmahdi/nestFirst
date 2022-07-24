import { DynamicModule, Module } from '@nestjs/common';
import { CustomDynamicService } from './dynamic.service';
import { DynamicModuleOptions } from './option.interface';



@Module({
  
})
export class CustomDynamicModule  {
  static register(options: DynamicModuleOptions): DynamicModule {
    return {
      module: CustomDynamicModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        CustomDynamicService,
      ],
      exports: [CustomDynamicService],
    };
  }
}