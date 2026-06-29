import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileUploadConfigService } from './file-upload-config.service';

@Module({
  providers: [StorageService, FileUploadConfigService],
  exports: [StorageService, FileUploadConfigService],
})
export class StorageModule {}
