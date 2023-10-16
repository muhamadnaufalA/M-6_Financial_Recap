import Income from "../models/IncomeModel.js";
import Outcome from "../models/OutcomeModel.js";
import Wallet from "../models/WalletModel.js";
import { Op } from 'sequelize';

export const getReport = async(req, res) => {

    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const end = new Date(nextMonth - 1);

    try {
        const incomeResponse = await Income.findAll({
            where: {
                tanggal_pemasukan : {
                    [Op.and]: [
                        { [Op.gte]: start },
                        { [Op.lte]: end }
                    ]
                }
            },
            include: [
                {
                  model: Wallet, 
                  attributes: ['name'],
                  required: false
                }
            ]
        })

        const outcomeResponse = await Outcome.findAll({
            where: {
                tanggal_pengeluaran : {
                    [Op.and]: [
                        { [Op.gte]: start },
                        { [Op.lte]: end }
                    ]
                }
            },
            include: [
                {
                  model: Wallet, 
                  attributes: ['name'],
                  required: false
                }
            ]
        })

        const report = {
            income: incomeResponse,
            outcome: outcomeResponse,
          };


        res.status(200).json(report);
    } catch(error) {
        console.log(error.message);
    }
}