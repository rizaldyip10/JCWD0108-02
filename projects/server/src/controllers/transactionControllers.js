const { Cashier, Category, Cart, Product, sequelize, Transaction, cartDetail, transactionDetail } = require("../models")
const { Sequelize, Op } = require("sequelize")

module.exports = {
    getCartItem: async (req, res) => {
        try {
            const cashierCart = await Cart.findOne({
                where: {
                    id: req.user.id
                }
            })

            const result = await cartDetail.findAll({
                attributes: [
                    'id',
                    'totalItems',
                    'CartId',
                    'ProductId',
                    'totalPrice'
                ],
                where: {
                    CartId: cashierCart.id
                },
                include: [
                    { model: Product, attributes: ['productName', 'productPrice', 'productImage']}
                ]
            })

            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    addToCart: async (req, res) => {
        try {
            const { ProductId, totalItems } = req.body

            const [cashierCart] = await Cart.findOrCreate({
                where: {
                    CashierId: req.user.id
                }
            })

            const product = await Product.findOne({ where: { id: ProductId }})

            const result = await cartDetail.create({
                ProductId,
                totalItems,
                CartId: cashierCart.id,
                totalPrice: totalItems * product.productPrice
            })

            res.status(200).send(result)
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    },
    deleteItem: async (req, res) => {
        try {
            const cashierCart = await Cart.findOne({ where: { CashierId: req.user.id }})
            const result = await cartDetail.destroy({
                where: {
                    id: req.params.id,
                    CartId: cashierCart.id
                }
            })

            if (result[0] === 0) throw { message: "Failed to remove item"}

            res.status(200).send({ message: "Successfuly remove item" })
        } catch (error) {
            res.status(400).send(error)
        }
    },
    checkOut: async (req, res) => {
        try {
            const { id } = req.user
            const cashierCart = await Cart.findOne({ where: { CashierId: id } })
            const item = await cartDetail.findAll({ where: { CartId: cashierCart.id } })

            const createTrans = await Transaction.create({
                CashierId: id,
                amount: req.body.totalPrice
            })
            
            item.map(async (v, i) => {
                await transactionDetail.create({
                    ProductId: v.ProductId,
                    TransactionId: createTrans.id,
                    totalItems: v.totalItems,
                    totalPrice: v.totalPrice
                })
            })
            await cartDetail.destroy({ where: { CartId: cashierCart.id }})

            res.status(200).send({
                message: "Transaction success"
            })
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    },
    updateItem: async (req, res) => {
        try {
            const result = await cartDetail.update({
                totalItems: req.body.totalItems,
                 
            }, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(result)
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    }
}