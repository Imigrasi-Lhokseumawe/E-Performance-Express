const Inteldakim = require("../models/InteldakimModel.js");
const Users = require("../models/UserModel.js")
const { Op } = require("sequelize");

const getInteldakim = async (req, res) => {
    try {
        if (req.role === "admin") {
            const inteldakim = await Inteldakim.findAll({
                include: [{
                    model: Users,
                    attributes: ['username', 'email', 'role']
                }],
            });
            res.status(200).json(inteldakim);
        } else {
            const inteldakim = await Inteldakim.findAll({
                where: {
                    userId: req.userId,
                },
                include: [{
                    model: Users,
                    attributes: ['username', 'email', 'role']
                }],
            });
            res.status(200).json(inteldakim);
        }
        
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const getInteldakimById = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Inteldakim.findOne({
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
            response = await Inteldakim.findOne({
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

const createInteldakim = async (req, res) => {
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

        await Inteldakim.create({
            kegiatan: kegiatan,
            jumlah: jumlah,
            output: output,
            anggaran: anggaran,
            sisaAnggaran: sisaAnggaran,
            periode: periode,
            userId: req.userId
        });

        res.json({ msg: "Inteldakim Created" });
    } catch (error) {
        console.log(error);
    }
};

const updateInteldakim = async (req, res) => {
    try {
        await Inteldakim.update(req.body, {
            where:{
                uuid: req.params.id
            }
        })
        res.status(200).json({msg: "Inteldakim Updated"})
    } catch (error) {
        console.log(error.message);
    }
};

const deleteInteldakim = async (req, res) => {
    try {
        await Inteldakim.destroy({
            where: {
                uuid: req.params.id,
            },
        });
        res.status(200).json({ msg: "Inteldakim Deleted" });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    getInteldakim,
    getInteldakimById,
    createInteldakim,
    updateInteldakim,
    deleteInteldakim
};