const express = require("express");
const {
    getTikkimWithoutLogin,
    getTikkim,
    getTikkimById,
    createTikkim,
    updateTikkim,
    deleteTikkim
} = require("../controllers/TikkimController.js") 
const { verifyUser } = require("../middleware/AuthUser.js") 

const router = express.Router()

router.get('/tikkim-all', getTikkimWithoutLogin)
router.get('/tikkim', verifyUser, getTikkim)
router.get('/tikkim/:id', verifyUser, getTikkimById)
router.post('/tikkim', verifyUser, createTikkim)
router.patch('/tikkim/:id', verifyUser, updateTikkim)
router.delete('/tikkim/:id', verifyUser, deleteTikkim)

module.exports = router;