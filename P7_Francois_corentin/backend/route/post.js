const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controller/post');

router.get('/', postCtrl.getAllPost);
router.post('/', postCtrl.createPost);
router.get('/:id', postCtrl.getOnePost);
router.put('/:id', postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;