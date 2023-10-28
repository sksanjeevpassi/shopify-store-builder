const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // cb(null, 'server/public/uploads/store_logo/');
      cb(null, 'frontend/theme/images/');
    },
    filename: (req, file, cb) => {
      const finalFileName = `${Date.now()}-${file.originalname}`;
      cb(null, finalFileName);
    },
  });

const upload = multer({ storage });
 
const StoredetailController = require('../Controller/StoredetailController')

router.post('/create/store',upload.single('file'), StoredetailController.storeSaves);
// router.post('/create/store',StoredetailController.storeSaves);
router.get('/get/store', StoredetailController.getStore);
router.get('/send/mail', StoredetailController.senMailToUser);

module.exports = router;
