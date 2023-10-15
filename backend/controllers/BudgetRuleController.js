import BudgetRule from "../models/BudgetRuleModel.js";

export const createBudgetRule = async(req, res) => {
    try {
        req.body.userId = req.params.id;
        await BudgetRule.create(req.body);
        res.status(201).json({
            message: "Budget rule created"
        });
    } catch(error) {
        console.log(error.message);
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