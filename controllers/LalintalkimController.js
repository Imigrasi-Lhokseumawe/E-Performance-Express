const Lalintalkim = require("../models/LalintalkimModel.js");
const Users = require("../models/UserModel.js")
const { Op } = require("sequelize");

const getLalintalkim = async (req, res) => {
    try {
        if (req.role === "admin") {
            const lalintalkim = await Lalintalkim.findAll({
                include: [{
                    model: Users,
                    attributes: ['username', 'email', 'role']
                }],
            });
            res.status(200).json(lalintalkim);
        } else {
            const lalintalkim = await Lalintalkim.findAll({
                where: {
                    userId: req.userId,
                },
                include: [{
                    model: Users,
                    attributes: ['username', 'email', 'role']
                }],
            });
            res.status(200).json(lalintalkim);
        }
        
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const getLalintalkimById = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Lalintalkim.findOne({
                attributes: ['uuid', 'id', 'kegiatan', 'jumlah', 'output', 'anggaran', 'sisaAnggaran', 'periode'],
                where: {
                    uuid: req.params.id
                },
                include: [{
                    model: Users,
                    attributes: ['username', 'email']
                }]
            })
        } else {
            response = await Lalintalkim.findOne({
                attributes: ['uuid', 'id'],
                where: {
                    [Op.and]: [{ uuid: req.params.id }, { userId: req.userId }]
                },
                include: [{
                    model: Users,
                    attributes: ['username', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

const createLalintalkim = async (req, res) => {
    const kegiatan = req.body.kegiatan;
    const jumlah = req.body.jumlah;
    const output = req.body.output;
    const anggaran = req.body.anggaran;
    const sisaAnggaran = req.body.sisaAnggaran;
    const periode = req.body.periode;
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ error: "User ID not found in the request" });
        }

        await Lalintalkim.create({
            kegiatan: kegiatan,
            jumlah: jumlah,
            output: output,
            anggaran: anggaran,
            sisaAnggaran: sisaAnggaran,
            periode: periode,
            userId: req.userId
        });

        res.json({ msg: "Lalintalkim Created" });
    } catch (error) {
        console.log(error);
    }
};

const updateLalintalkim = async (req, res) => {
    try {
        await Lalintalkim.update(req.body, {
            where:{
                uuid: req.params.id
            }
        })
        res.status(200).json({msg: "Lalintalkim Updated"})
    } catch (error) {
        console.log(error.message);
    }
};

const deleteLalintalkim = async (req, res) => {
    try {
        await Lalintalkim.destroy({
            where: {
                uuid: req.params.id,
            },
        });
        res.status(200).json({ msg: "Lalintalkim Deleted" });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    getLalintalkim,
    getLalintalkimById,
    createLalintalkim,
    updateLalintalkim,
    deleteLalintalkim
};