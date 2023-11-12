import BudgetRule from "../models/BudgetRuleModel.js";

export const createBudgetRule = async (req, res) => {
    try {
        const userId = req.params.id;
        const newPercentage = req.body.percentage;

        // Ambil total persentase yang sudah ada di database berdasarkan userId
        const existingBudgetRules = await BudgetRule.findAll({ where: { userId } });
        const totalPercentageInDatabase = existingBudgetRules.reduce(
            (total, rule) => total + rule.percentage,
            0
        );
        // Cek apakah jumlah persentase yang baru ditambahkan (newPercentage)
        // ditambahkan dengan total persentase di database melebihi 100
        if (newPercentage + totalPercentageInDatabase > 100) {
            return res.status(400).json({
                message: "Total percentage exceeds 100%"
            });
        }
        if (newPercentage > 100 || newPercentage <= 0) {
            return res.status(401).json({
                message: "Invalid Input"
            });
        }

        req.body.userId = userId;
        await BudgetRule.create(req.body);
        res.status(201).json({
            message: "Budget rule created"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


export const getBudgetRuleByUserId = async(req, res) => {
    try {
        const response = await BudgetRule.findAll({
            where: {
                userId: req.params.id
            }
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
}

export const updateBudgetRule = async(req, res) => {
    try {
        await BudgetRule.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json( { message: "Budget rule updated" } );
    } catch(error) {
        console.log(error.message);
    }
}

export const deleteBudgetRule = async(req, res) => {
    try {
        await BudgetRule.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json( { message: "Budget rule deleted" } );
    } catch(error) {
        console.log(error.message);
    }
}