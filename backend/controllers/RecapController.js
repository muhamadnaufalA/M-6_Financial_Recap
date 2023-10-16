import Income from "../models/IncomeModel.js";
import Outcome from "../models/OutcomeModel.js";
import { Op } from 'sequelize';

export const getRecap = async(req, res) => {

    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const end = new Date(nextMonth - 1);

    try {
        const incomeResponse = await Income.findAll({
            where: {
                tanggal_pemasukan : today
            },
        })

        const outcomeResponse = await Outcome.findAll({
            where: {
                tanggal_pengeluaran : today
            },
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