import { Inject, Injectable } from '@nestjs/common';


@Injectable()
export class CustomDynamicService {
  private readonly customValue: any;

  constructor(@Inject('CONFIG_OPTIONS') private options: Record<string, any>) { 
    this.customValue = process.env[options.property]
   }

  get(): any {
    return this.customValue;
  }
}