import BudgetRule from "../models/BudgetRuleModel.js";
import Category from "../models/CategoryModel.js";
import Income from "../models/IncomeModel.js";
import Outcome from "../models/OutcomeModel.js";
import Wallet from "../models/WalletModel.js";
import { Op } from 'sequelize';

export const getRecap = async(req, res) => {

    const today = new Date();

    try {
        const incomeResponse = await Income.findAll({
            where: {
                tanggal_pemasukan : today,
                userId: req.params.id
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
                tanggal_pengeluaran : today,
                userId: req.params.id
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

export const getRecapByMonth = async(req, res) => {

    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const end = new Date(nextMonth - 1);

    try {
        const incomeResponse = await Income.findAll({
            where: {
                userId: req.params.id,
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
                userId: req.params.id,
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
                },
                {
                    model: BudgetRule, 
                    attributes: ['name'],
                    required: false
                },
                {
                    model: Category, 
                    attributes: ['name'],
                    required: false
                }
            ]
        })
        
        const report = [...incomeResponse, ...outcomeResponse];

        const result = report.map(item => {
            return {
                id_income: item.budgetrule ? "-" : item.id,
                id_outcome: item.budgetrule ? item.id : "-",
                tanggal: item.tanggal_pemasukan || item.tanggal_pengeluaran,
                keterangan: item.name,
                budgetrule: item.budgetrule ? item.budgetrule.name : "-",
                category: item.category ? item.category.name : "-",
                nominal: item.balance || item.nominal,
                wallet: item.wallet.name
            };
        });

        result.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

        
        res.status(200).json(result);
    } catch(error) {
        console.log(error.message);
    }
}