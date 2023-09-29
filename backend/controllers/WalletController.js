import Wallet from "../models/WalletModel.js"

export const createWallet = async(req, res) => {
    try {
        req.body.userId = req.params.id;
        await Wallet.create(req.body);
        res.status(201).json({
            message: "Wallet created"
        });
    } catch(error) {
        console.log(error.message);
    }
}

export const getWalletByUserId = async(req, res) => {
    try {
        const response = await Wallet.findAll({
            where: {
                userId: req.params.id
            }
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message)
    }
}

export const updateWallet = async(req, res) => {
    try {
        await Wallet.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json( { message: "Wallet updated" } );
    } catch(error) {
        console.log(error.message);
    }
}

export const deleteWallet = async(req, res) => {
    try {
        await Wallet.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json( { message: "Wallet deleted" } );
    } catch(error) {
        console.log(error.message);
    }
}