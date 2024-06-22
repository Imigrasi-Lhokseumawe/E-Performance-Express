const Tikkim = require("../models/TikkimModel.js");
const Users = require("../models/UserModel.js")
const { Op } = require("sequelize");
const moment = require('moment');

const getTikkimWithoutLogin = async (req, res) => {
    try {
        const tikkim = await Tikkim.findAll();
        res.status(200).json(tikkim);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const getTikkim = async (req, res) => {
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

        const tikkim = await Tikkim.findAll({
            where: whereClause,
            include: [{
                model: Users,
                attributes: ['username', 'email', 'role']
            }],
        });

        res.status(200).json(tikkim);
        
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const getTikkimById = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Tikkim.findOne({
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
            response = await Tikkim.findOne({
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

const createTikkim = async (req, res) => {
    const kegiatan = req.body.kegiatan;
    const jumlah = req.body.jumlah;
    const output = req.body.output;
    const anggaran = req.body.anggaran;
    const sisaAnggaran = req.body.sisaAnggaran;
    const periode = req.body.periode;
    const isAccept = false
    const tanggal = req.body.tanggal;
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ error: "User ID not found in the request" });
        }

        await Tikkim.create({
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

        res.json({ msg: "Tikkim Created" });
    } catch (error) {
        console.log(error);
    }
};

const updateTikkim = async (req, res) => {
    try {
        await Tikkim.update(req.body, {
            where:{
                uuid: req.params.id
            }
        })
        res.status(200).json({msg: "Tikkim Updated"})
    } catch (error) {
        console.log(error.message);
    }
};

const deleteTikkim = async (req, res) => {
    try {
        await Tikkim.destroy({
            where: {
                uuid: req.params.id,
            },
        });
        res.status(200).json({ msg: "Tikkim Deleted" });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    getTikkimWithoutLogin,
    getTikkim,
    getTikkimById,
    createTikkim,
    updateTikkim,
    deleteTikkim
};