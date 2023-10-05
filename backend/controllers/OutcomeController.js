import Outcome from "../models/OutcomeModel.js";

export const createOutcome = async(req, res) => {
    try {
        req.body.userId = req.params.id;
        await Outcome.create(req.body);
        res.status(201).json({
            message: "Outcome created"
        });
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
                'tanggal_pengeluaran'
            ]
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
}

export const getOutcomeByOutcomeId = async(req, res) => {
    try {
        const response = await Outcome.findOne({
            where: {
                id: req.params.id,
                userId: req.params.userId
            },
            attributes: [
                'id',
                'name', 
                'nominal', 
                'tanggal_pengeluaran'
            ]
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
}

export const updateOutcome = async(req, res) => {
    try {
        await Outcome.update(req.body, {
            where: {
                id: req.params.id,
            }
        })
        res.status(200).json( { message: "Outcome updated" } );
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

