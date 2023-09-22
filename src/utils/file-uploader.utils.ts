import { extname } from 'path';
import { diskStorage, Options } from 'multer';

export const fileOptions: Options = {
  storage: diskStorage({
    filename: (_, file, callback) => {
      const fileExtName = extname(file.originalname);
      const randomName = Array(10)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      callback(null, `${randomName}${fileExtName}`);
    },
    destination: './files',
  }),
  fileFilter: (_, file, callback) => {
    if (
      !file.originalname.match(
        /\.(jpg|jpeg|png|pdf|m4a|flac|mp3|mp4|mkv|flv|avi)$/,
      )
    ) {
      return callback(new Error('File not allowed!'));
    }
    callback(null, true);
  },
};
