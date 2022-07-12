const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const comCtrl = require('../controller/commentaire');

router.post('/',auth, comCtrl.getAllCom);
router.post('/',auth, comCtrl.createCom);
router.get('/:id',auth, comCtrl.getOneCom);
router.put('/:id',auth, comCtrl.modifyCom);
router.delete('/:id',auth, comCtrl.deleteCom);

module.exports = router;