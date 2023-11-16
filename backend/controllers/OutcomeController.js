import Category from "../models/CategoryModel.js";
import BudgetRule from "../models/BudgetRuleModel.js";
import Outcome from "../models/OutcomeModel.js";
import Wallet from "../models/WalletModel.js";

export const createOutcome = async(req, res) => {

    let wallet;
    
    if(req.body.walletId) {
        wallet = await Wallet.findOne({
            where: {
                id: req.body.walletId,
            },
            attributes: [
                'id',
                'name', 
                'balance'
            ],
        });
    }

    try {
        if (!req.body.name || !req.body.nominal || !req.body.tanggal_pengeluaran || !req.body.budgetruleId || !req.body.categoryId || !req.body.walletId) {
            res.status(400).json({
                status: 400,
                message: "Data yang dikirimkan tidak lengkap. Harap isi semua bidang yang diperlukan."
            });
        } else if(req.body.budgetruleId == 0 || req.body.categoryId == 0 || req.body.walletId == 0) {
            res.status(400).json({
                status: 400,
                message: "Data yang dikirimkan tidak lengkap. Harap isi semua bidang yang diperlukan."
            })
        } else if (wallet.balance >= req.body.nominal) {
            req.body.userId = req.params.id;
            await Outcome.create(req.body);
            res.status(201).json({
                message: "Outcome created"
            });
        } else {
            res.status(422).json({
                status: 422,
                message: "Saldo Anda tidak cukup!"
            });
        }
    } catch(error) {
        console.log(error.message);
    }
}

export const getAllOutcomeUser = async(req, res) => {
    try {
        const response = await Outcome.findAll({
            where: {
                userId: req.params.id
            },
            attributes: [
                'id',
                'name', 
                'nominal', 
                'tanggal_pengeluaran',
                'budgetruleId',
                'categoryId',
                'walletId'
            ],
            include: [
              {
                model: Wallet, 
                attributes: ['name'],
                required: false
              },
              {
                model: Category,
                attributes: ['name'],
                required: false 
              },
              {
                model: BudgetRule,
                attributes: ['name'],
                required: false
              }
            ],
            order: [['id', 'DESC']]
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
}

export const getOutcomeById = async(req, res) => {
    try {
        const response = await Outcome.findOne({
            where: {
                id: req.params.id,
            },
            attributes: [
                'id',
                'name', 
                'nominal', 
                'tanggal_pengeluaran',
                'budgetruleId',
                'categoryId',
                'walletId'
            ],
            include: [
                {
                  model: Wallet, 
                  attributes: ['name'],
                  required: false
                },
                {
                  model: Category,
                  attributes: ['name'],
                  required: false 
                },
                {
                  model: BudgetRule,
                  attributes: ['name'],
                  required: false
                }
              ],
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
}

export const updateOutcome = async(req, res) => {
    let wallet;
    
    if( req.body.walletId ) {
        wallet = await Wallet.findOne({
            where: {
                id: req.body.walletId,
            },
            attributes: [
                'id',
                'name', 
                'balance'
            ],
        });
    }
    try {
        if (wallet.balance >= req.body.nominal) {
            await Outcome.update(req.body, {
                where: {
                    id: req.params.id,
                }
            })
            res.status(200).json({ message: "Outcome updated" });
        } else {
            res.status(422).json({
                status: 422,
                message: "Saldo Anda tidak cukup!"
            });
        }
    } catch(error) {
        console.log(error.message);
    }
}

export const deleteOutcome = async(req, res) => {
    try {
        await Outcome.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json( { message: "Outcome deleted" } );
    } catch(error) {
        console.log(error.message);
    }
}

// export const PieChart = async(req, res) => {
//     try {
//         const response = await Outcome.findAll({
//             where: {
//                 userId: req.params.id
//             },
//             attributes: [
//                 'id',
//                 'name', 
//                 'nominal', 
//                 'tanggal_pengeluaran',
//                 'budgetruleId',
//                 'categoryId',
//                 'walletId'
//             ],
//             include: [
//               {
//                 model: Wallet, 
//                 attributes: ['name'],
//                 required: false
//               },
//               {
//                 model: Category,
//                 attributes: ['name'],
//                 required: false 
//               },
//               {
//                 model: BudgetRule,
//                 attributes: ['name'],
//                 required: false
//               }
//             ],
//             order: [['id', 'ASC']]
//         });
//         const data = response.map(item => {
//             return {
//                 nominal : item.nominal,
//                 budgetRule : item.budgetRule
//             };
//         });

//         var x = 0;
//         var y = 0;
//         var z = 0;
//         var total = 0;

//         for (let i = 0; i < data.length; i++) {
//             if (data.budgetRule == "Needs"){
//                 x = x + data.nominal;
//             }else if (data.budgetRule == "Wants"){
//                 y = y + data.nominal;
//             }else {
//                 z = z + data.nominal;
//             } 
//         }
//         console.log(data.nominal)
//         total = x + y + z;

//         var n;
//         var w;
//         var s;

//         n = x/total * 100;
//         w = y/total * 100;
//         s = z/total * 100;

//         let data1 = {
//             "name" : data.budgetRule,
//             "percent" : n
//         }
//         let result = []
//         result.push(data1);
//         res.status(200).json(result);
//     } catch(error) {
//         console.log(error.message);
//     }
// }