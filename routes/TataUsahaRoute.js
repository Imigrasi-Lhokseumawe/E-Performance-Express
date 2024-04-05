const express = require("express");
const {
    getTataUsaha,
    getTataUsahaById,
    createTataUsaha,
    updateTataUsaha,
    deleteTataUsaha
} = require("../controllers/TataUsahaController.js") 
const { verifyUser } = require("../middleware/AuthUser.js") 

const router = express.Router()

router.get('/tata-usaha', verifyUser, getTataUsaha)
router.get('/tata-usaha/:id', verifyUser, getTataUsahaById)
router.post('/tata-usaha', verifyUser, createTataUsaha)
router.patch('/tata-usaha/:id', verifyUser, updateTataUsaha)
router.delete('/tata-usaha/:id', verifyUser, deleteTataUsaha)

module.exports = router;