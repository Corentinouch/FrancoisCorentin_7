const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const comCtrl = require('../controller/commentaire');

router.post('/', comCtrl.getAllCom);
router.post('/', comCtrl.createCom);
router.get('/:id', comCtrl.getOneCom);
router.put('/:id', comCtrl.modifyCom);
router.delete('/:id', comCtrl.deleteCom);

module.exports = router;