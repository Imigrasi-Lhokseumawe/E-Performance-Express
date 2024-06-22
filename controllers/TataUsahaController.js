const TataUsaha = require("../models/TataUsahaModel.js");
const Users = require("../models/UserModel.js")
const { Op } = require("sequelize");
const moment = require('moment');

const getTataUsahaWithoutLogin = async (req, res) => {
    try {
        const tataUsaha = await TataUsaha.findAll();
        res.status(200).json(tataUsaha);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const getTataUsaha = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const parsedStartDate = startDate ? moment(startDate).startOf('day').toDate() : null;
        const parsedEndDate = endDate ? moment(endDate).endOf('day').toDate() : null;

        let whereClause = {};

        if (parsedStartDate && parsedEndDate) {
            whereClause.createdAt = {
                [Op.between]: [parsedStartDate, parsedEndDate]
            };
        }
        
        if (req.role !== "admin") {
            whereClause.userId = req.userId;
        }

        const tataUsaha = await TataUsaha.findAll({
            where: whereClause,
            include: [{
                model: Users,
                attributes: ['username', 'email', 'role']
            }],
        });

        res.status(200).json(tataUsaha);
        
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const getTataUsahaById = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await TataUsaha.findOne({
                attributes: ['uuid', 'id', 'kegiatan', 'jumlah', 'output', 'anggaran', 'sisaAnggaran', 'periode', 'isAccept'],
                where: {
                    uuid: req.params.id
                },
                include: [{
                    model: Users,
                    attributes: ['username', 'email']
                }]
            })
        } else {
            response = await TataUsaha.findOne({
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

const createTataUsaha = async (req, res) => {
    const kegiatan = req.body.kegiatan;
    const jumlah = req.body.jumlah;
    const output = req.body.output;
    const anggaran = req.body.anggaran;
    const sisaAnggaran = req.body.sisaAnggaran;
    const periode = req.body.periode;
    const isAccept = false;
    const tanggal = req.body.tanggal;
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ error: "User ID not found in the request" });
        }

        await TataUsaha.create({
            kegiatan: kegiatan,
            jumlah: jumlah,
            output: output,
            anggaran: anggaran,
            sisaAnggaran: sisaAnggaran,
            periode: periode,
            isAccept: isAccept,
            tanggal: tanggal,
            userId: req.userId
        });

        res.json({ msg: "TataUsaha Created" });
    } catch (error) {
        console.log(error);
    }
};

const updateTataUsaha = async (req, res) => {
    try {
        await TataUsaha.update(req.body, {
            where:{
                uuid: req.params.id
            }
        })
        res.status(200).json({msg: "TataUsaha Updated"})
    } catch (error) {
        console.log(error.message);
    }
};

const deleteTataUsaha = async (req, res) => {
    try {
        await TataUsaha.destroy({
            where: {
                uuid: req.params.id,
            },
        });
        res.status(200).json({ msg: "TataUsaha Deleted" });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    getTataUsahaWithoutLogin,
    getTataUsaha,
    getTataUsahaById,
    createTataUsaha,
    updateTataUsaha,
    deleteTataUsaha
};