import JenisPengeluaran from "../models/JenisPengeluaranModel.js";

export const createJenisPengeluaran = async(req, res) => {
    try {
        req.body.userId = req.params.id;
        await JenisPengeluaran.create(req.body);
        res.status(201).json({
            message: "Jenis Pengeluaran created"
        });
    } catch(error) {
        console.log(error.message);
    }
}

export const getJenisPengeluaranByUserId = async(req, res) => {
    try {
        const response = await JenisPengeluaran.findAll({
            where: {
                userId: req.params.id
            }
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
}

export const updateJenisPengeluaran = async(req, res) => {
    try {
        await JenisPengeluaran.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json( { message: "Jenis Pengeluaran updated" } );
    } catch(error) {
        console.log(error.message);
    }
}

export const deleteJenisPengeluaran = async(req, res) => {
    try {
        await JenisPengeluaran.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json( { message: "Jenis Pengeluaran deleted" } );
    } catch(error) {
        console.log(error.message);
    }
}