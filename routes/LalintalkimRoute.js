const express = require("express");
const {
    getLalintalkimWithoutLogin,
    getLalintalkim,
    getLalintalkimById,
    createLalintalkim,
    updateLalintalkim,
    deleteLalintalkim
} = require("../controllers/LalintalkimController.js") 
const { verifyUser } = require("../middleware/AuthUser.js") 

const router = express.Router()

router.get('/lalintalkim-all', getLalintalkimWithoutLogin)
router.get('/lalintalkim', verifyUser, getLalintalkim)
router.get('/lalintalkim/:id', verifyUser, getLalintalkimById)
router.post('/lalintalkim', verifyUser, createLalintalkim)
router.patch('/lalintalkim/:id', verifyUser, updateLalintalkim)
router.delete('/lalintalkim/:id', verifyUser, deleteLalintalkim)

module.exports = router;