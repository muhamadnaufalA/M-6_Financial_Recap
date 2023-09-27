import Income from "../models/IncomeModel.js";

export const createIncome = async(req, res) => {
    try {
        req.body.userId = req.params.id;
        await Income.create(req.body);
        res.status(201).json({msg: "Income Created"});
    } catch(error) {
        console.log(error.message);
    }
}

export const getIncome = async(req, res) => {
    try {
        const response = await Income.findAll({
            attributes: ['id_income', 'name', 'nominal', 'date']
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
}