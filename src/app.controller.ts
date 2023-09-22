import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  Param,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileOptions } from './utils/file-uploader.utils';
import { Response } from 'express';
import { ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';

type FileResponse = {
  originalname: string;
  filename: string;
};

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

class FilesUploadDtoMultiple {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}

@ApiTags('endpoints')
@Controller()
export class AppController {
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'file to upload',
    type: FileUploadDto,
  })
  @Post()
  @UseInterceptors(FileInterceptor('file', fileOptions))
  async uploadedFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    console.log(response);
    return response;
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'file to upload',
    type: FilesUploadDtoMultiple,
  })
  @Post('multiple')
  @UseInterceptors(FilesInterceptor('file', 20, fileOptions))
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const response: FileResponse[] = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get(':filename')
  seeUploadedFile(@Param('filename') image: string, @Res() res: Response) {
    return res.sendFile(image, { root: './files' });
  }
}
