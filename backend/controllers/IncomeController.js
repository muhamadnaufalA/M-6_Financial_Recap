import Income from "../models/IncomeModel.js";

export const createIncome = async(req, res) => {
    try {
        req.body.userId = req.params.id;
        await Income.create(req.body);
        res.status(201).json({
            message: "Income created"
        });
    } catch(error) {
        console.log(error.message);
    }
}

export const getIncomeByUserId = async(req, res) => {
    try {
        const response = await Income.findAll({
            where: {
                userId: req.params.id
            },
            attributes: [
                'name', 
                'balance', 
                'tanggal_pemasukan'
            ]
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
}