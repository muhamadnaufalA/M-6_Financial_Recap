import Category from "../models/CategoryModel.js"
import BudgetRule from "../models/BudgetRuleModel.js";

export const createCategory = async(req, res) => {
    try {
        req.body.userId = req.params.id;
        await Category.create(req.body);
        res.status(201).json({
            message: "Category created"
        });
    } catch(error) {
        console.log(error.message);
    }
}

export const getCategoryByUserId = async(req, res) => {
    try {
        const response = await Category.findAll({
            where: {
                userId: req.params.id
            },
            include: [
                {
                    model: BudgetRule,
                    attributes: ['name'],
                    required: false
                  }
            ]
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
}

export const getCategoryById = async(req, res) => {
    try {
        const response = await Category.findOne({
            where: {
                id: req.params.id,
            },
            attributes: [
                'id',
                'name', 
                'budget',
                'budgetruleid'
            ],
            include: [
                {
                    model: BudgetRule,
                    attributes: ['id','name'],
                    required: false
                  }
            ]
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
}

export const updateCategory = async(req, res) => {
    try {
        await Category.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json( { message: "Category updated" } );
    } catch(error) {
        console.log(error.message);
    }
}

export const deleteCategory = async(req, res) => {
    try {
        await Category.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json( { message: "Category deleted" } );
    } catch(error) {
        console.log(error.message);
    }
}