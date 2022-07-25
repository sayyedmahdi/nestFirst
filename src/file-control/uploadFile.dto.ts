import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';
 
class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;

  @ApiProperty({type: 'string'})
  id : string
}
 
export default FileUploadDto;