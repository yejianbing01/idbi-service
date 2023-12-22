import * as multer from 'multer';
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

export const uploadPath = 'uploads';

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync(uploadPath);
    } catch (e) {}
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      uuid.v4() + path.extname(file.originalname.toLocaleLowerCase());
    cb(null, uniqueSuffix);
  },
});

export const registerStaticAsserts = (app: NestExpressApplication) => {
  app.useStaticAssets(uploadPath, {
    prefix: `/${uploadPath}`,
  });
};
