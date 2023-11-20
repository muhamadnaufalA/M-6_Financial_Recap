import BudgetRule from "../models/BudgetRuleModel.js";
import Outcome from "../models/OutcomeModel.js";
import { Sequelize } from 'sequelize';

export const getOutcomeReport = async (req, res) => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const end = new Date(nextMonth - 1);

    try {
        const outcomeResponse = await Outcome.findAll({
            where: {
                userId: req.params.id,
                tanggal_pengeluaran: {
                [Sequelize.Op.and]: [
                    { [Sequelize.Op.gte]: start },
                    { [Sequelize.Op.lte]: end }
                ]
                }
            },
            attributes: [
                "budgetruleId",
                [Sequelize.fn("SUM", Sequelize.col("nominal")), "totalPengeluaran"]
            ],
            group: ["budgetruleId"]
        });

        const outcomeResponse2 = await Outcome.findAll({
            where: {
                userId: req.params.id,
                tanggal_pengeluaran: {
                [Sequelize.Op.and]: [
                    { [Sequelize.Op.gte]: start },
                    { [Sequelize.Op.lte]: end }
                ]
                }
            },
            attributes: [
                "budgetruleId"
            ],
            include: [
                {
                    model: BudgetRule, 
                    attributes: ['name']
                }
            ]
        });

        const data = [...outcomeResponse, ...outcomeResponse2];

        // Melacak nama untuk setiap budgetruleId
        const budgetruleNames = {};

        data.forEach(item => {
            const budgetruleId = item.budgetruleId;
            if(item.budgetrule && item.budgetrule.name) {
                budgetruleNames[budgetruleId] = item.budgetrule.name;
            }
        });

        outcomeResponse.forEach((item) => {
            item.name = budgetruleNames[item.budgetruleId]
        });

        outcomeResponse.sort((a, b) => {
            const nameA = budgetruleNames[a.budgetruleId] || '';
            const nameB = budgetruleNames[b.budgetruleId] || '';
            return nameA.localeCompare(nameB);
        });

        res.status(200).json(outcomeResponse);
    } catch (error) {
        console.error(error.message);
    }
};
