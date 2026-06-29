import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, extname } from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class StorageService {
  private readonly uploadDir = './uploads';

  constructor() {
    this.ensureUploadDirExists();
  }

  private ensureUploadDirExists(subdir?: string) {
    const dir = subdir ? join(this.uploadDir, subdir) : this.uploadDir;
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  }

  resolvePath(storagePath: string): string {
    const relative = storagePath.startsWith('/uploads/')
      ? storagePath.slice('/uploads/'.length)
      : storagePath;
    return join(this.uploadDir, relative);
  }

  async saveFile(file: any, subdir?: string): Promise<string> {
    try {
      const fileExtension = extname(file.originalname);
      const fileName = `${randomUUID()}${fileExtension}`;
      const relativePath = subdir ? join(subdir, fileName) : fileName;

      this.ensureUploadDirExists(subdir);
      const filePath = join(this.uploadDir, relativePath);
      writeFileSync(filePath, file.buffer);

      return `/uploads/${relativePath.replace(/\\/g, '/')}`;
    } catch (error) {
      throw new InternalServerErrorException('Failed to save file');
    }
  }

  async saveBuffer(buffer: Buffer, pathTemplate: string): Promise<string> {
    try {
      const ext = extname(pathTemplate);
      const subdir = pathTemplate.includes('/')
        ? pathTemplate.split('/').slice(0, -1).join('/')
        : undefined;
      const fileName = `${randomUUID()}${ext}`;
      const relativePath = subdir ? join(subdir, fileName) : fileName;

      this.ensureUploadDirExists(subdir);
      const filePath = join(this.uploadDir, relativePath);
      writeFileSync(filePath, buffer);

      return `/uploads/${relativePath.replace(/\\/g, '/')}`;
    } catch (error) {
      throw new InternalServerErrorException('Failed to save file');
    }
  }
}
