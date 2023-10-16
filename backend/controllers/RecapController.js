import Income from "../models/IncomeModel.js";
import Outcome from "../models/OutcomeModel.js";
import Wallet from "../models/WalletModel.js";

export const getRecap = async(req, res) => {

    const today = new Date();

    try {
        const incomeResponse = await Income.findAll({
            where: {
                tanggal_pemasukan : today
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
                tanggal_pengeluaran : today
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