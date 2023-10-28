const express = require('express');
const router = express.Router();
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       // cb(null, 'server/public/uploads/store_theme/');
//       cb(null, 'frontend/theme/');
//     },
//     filename: (req, file, cb) => {
//       const finalFileName = `${Date.now()}-${file.originalname}`;
//       cb(null, finalFileName);
//     },
//   });

// const upload = multer({ storage });
 
const StorethemeController = require('../Controller/StorethemeController')

router.post('/upload/store/theme', StorethemeController.storeSaves);

// for backup
// router.post('/upload/store/theme',upload.single('file'), StorethemeController.storeSaves);

module.exports = router;
