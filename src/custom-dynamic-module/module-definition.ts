import { ConfigurableModuleBuilder } from '@nestjs/common';
import { DynamicModuleOptions } from './option.interface'

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<DynamicModuleOptions>().build();