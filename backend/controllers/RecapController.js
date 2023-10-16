import Income from "../models/IncomeModel.js";
import Outcome from "../models/OutcomeModel.js";
import { Op } from 'sequelize';

export const getRecap = async(req, res) => {

    const today = new Date();

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