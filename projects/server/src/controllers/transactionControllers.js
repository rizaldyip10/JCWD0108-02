const { Category, Cart, Product, sequelize, Transaction, cartDetail } = require("../models")
const { Sequelize } = require("sequelize")

module.exports = {
    getCartItem: async (req, res) => {
        try {
            const result = await cartDetail.findAll({
                where: {
                    isPaid: false,
                    CashierId: req.user.id
                },
                attributes: [
                    'id',
                    'totalItems',
                    'CashierId',
                    'ProductId',
                    [Sequelize.literal('Product.productPrice * cartDetail.totalItems'), "TotalPrice"]
                ],
                include: [{
                    model: Product,
                    where: { isDeleted: false },
                    attributes: { exclude: ['productDescription', 'isDeleted', 'createdAt', 'updatedAt'] },
                    include: [{ model: Category, where: { isDeleted: false }, attributes: ['Category']}]
                }]
            })

            res.status(200).send(result)
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    },
    addToCart: async (req, res) => {
        try {
            const result = await cartDetail.create({
                CashierId: req.user.id,
                ProductId: req.body.ProductId,
                totalItems: req.body.totalItems,
            })

            res.status(200).send(result)
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    },
    deleteCart: async (req, res) => {
        try {
            const result = await Cart.destroy({
                where: {
                    id: req.body.id,
                    ProductId: req.body.ProductId,
                    isPaid: false
                }
            })

            if (result === 0) throw { message: "Remove item failed"}

            res.status(200).send({
                message: "Remove item success!"
            })
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    },
    checkOut: async (req, res) => {
        try {
            const t = await sequelize.transaction()
            try {
                const payment = await cartDetail.update({ isPaid: true }, {
                    where: {
                        CashierId: req.user.id,
                        isPaid: false
                    }
                }, { transaction: t })

                const result = await Cart.findAll({
                    where: {
                        isPaid: false,
                        CashierId: req.user.id
                    },
                    attributes: [
                        'id',
                        'Quantity',
                        'CashierId',
                        'ProductId',
                        [Sequelize.literal('Product.productPrice * Cart.Quantity'), "TotalPrice"]
                    ],
                    include: [{
                        model: Product,
                        where: { isDeleted: false },
                        attributes: { exclude: ['productDescription', 'isDeleted', 'createdAt', 'updatedAt'] },
                        include: [{ model: Category, where: { isDeleted: false }, attributes: ['Category']}]
                    }]
                })

                



                await t.commit()

                res.status(200).send({
                    message: "Checkout success!"
                })
            } catch (error) {
                await t.rollback()
                throw error
            }
        } catch (error) {
            res.status(400).send(error)
        }
    }
}