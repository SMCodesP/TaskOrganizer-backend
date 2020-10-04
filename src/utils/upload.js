import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, path.resolve(__dirname, '..', '..', 'public', 'images'));
	},
	filename: (req, file, callback) => {
		crypto.pseudoRandomBytes(16, function(err, raw) {
			if (err) return callback(err);

			callback(null, raw.toString('hex') + path.extname(file.originalname));
		});
	}
});
const fileFilter = (req, file, cb) => {
	if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/webp') {
		cb(null, true);
	} else {
		cb(null, false);
	}
}

export default multer({ storage: storage, fileFilter: fileFilter });
