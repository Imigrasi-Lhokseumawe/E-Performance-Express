const Users = require("../models/UserModel.js")

const verifyUser = async (req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun anda"})
    }
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    })
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"})
    req.userId = user.id
    req.role = user.role
    next()
}

const adminOnly = async (req, res, next) => {
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    })
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"})
    if (user.role !== "admin") return res.status(403).json({msg: "Khusus Admin"})
    next()
}

const inteldakimOnly = async (req, res, next) => {
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    })
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"})
    if (user.role !== "inteldakim") return res.status(403).json({msg: "Khusus Inteldakim"})
    next()
}

const lalintalkimOnly = async (req, res, next) => {
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    })
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"})
    if (user.role !== "lalintalkim") return res.status(403).json({msg: "Khusus Lalintalkim"})
    next()
}

const tataUsahaOnly = async (req, res, next) => {
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    })
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"})
    if (user.role !== "tataUsaha") return res.status(403).json({msg: "Khusus tataUsaha"})
    next()
}

const tikkimOnly = async (req, res, next) => {
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    })
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"})
    if (user.role !== "tikkim") return res.status(403).json({msg: "Khusus Tikkim"})
    next()
}

module.exports = {
    verifyUser,
    adminOnly,
    inteldakimOnly
};