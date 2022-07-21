const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controller/post');

router.get('/',auth, postCtrl.getAllPost);
router.post('/',auth, multer, postCtrl.createPost);
router.get('/:id',auth, postCtrl.getOnePost);
router.put('/:id',auth, multer, postCtrl.modifyPost);
router.delete('/:id',auth, postCtrl.deletePost);
router.post('/:id',auth, postCtrl.likePost);
router.get('/like/:id',auth, postCtrl.hasLike);

module.exports = router;