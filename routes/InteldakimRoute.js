const express = require("express");
const {
    getInteldakimWithoutLogin,
    getInteldakim,
    getInteldakimById,
    createInteldakim,
    updateInteldakim,
    deleteInteldakim
} = require("../controllers/InteldakimController.js") 
const { verifyUser } = require("../middleware/AuthUser.js") 

const router = express.Router()

router.get('/inteldakim-all', getInteldakimWithoutLogin)
router.get('/inteldakim', verifyUser, getInteldakim)
router.get('/inteldakim/:id', verifyUser, getInteldakimById)
router.post('/inteldakim', verifyUser, createInteldakim)
router.patch('/inteldakim/:id', verifyUser, updateInteldakim)
router.delete('/inteldakim/:id', verifyUser, deleteInteldakim)

module.exports = router;