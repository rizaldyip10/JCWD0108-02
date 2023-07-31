const { Cashier, Category, Cart, Product, sequelize, Transaction, cartDetail, transactionDetail } = require("../models")
const { Sequelize } = require("sequelize")
const transaction = require("../models/transaction")

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
                    [Sequelize.literal("Product.productPrice * cartDetail.totalItems"), "totalPrice"],
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
                amount: totalItems * product.productPrice
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
                    totalItems: v.totalItems
                })
            })
            const removeCart = await cartDetail.destroy({ where: { CartId: cashierCart.id }})

            res.status(200).send({
                message: "Transaction success"
            })
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    },
    getAllTrans: async (req, res) => {
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 10;
            const offset = (page - 1) * limit;
            const search = req.query.search;
            const catId = +req.query.catId;
            const transId = +req.query.transId
            const sort = req.query.sort || 'DESC';
            const sortBy = req.query.sortBy || 'createdAt';
            const dateStart = req.query.dateStart || new Date()
            const dateEnd = req.query.dateStart || new Date()
            const condition = {}
            
            if (search) {
                condition[Op.or] = [{ productName: { [Op.like]: `%${search}%` } }];
            }
            if (catId) {
                condition.CategoryId = catId;
            }
            if (transId) {
                condition.TransactionId = transId
            }

            const result = await transactionDetail.findAll({
                attributes: [
                    'id',
                    'totalItems',
                    'createdAt',
                    'TransactionId',
                    'ProductId',
                    [Sequelize.literal("transactionDetail.totalItems * Product.productPrice"), "totalPrice"]
                ],
                limit,
                offset,
                include: [
                    { model: Product, attributes: ['productImage', 'productName', 'productPrice']},
                    { model: Transaction, attributes: ['id'], include: 
                        { model: Cashier, attributes: ['username', 'firstName', 'lastName'] }
                    }
                ],
                order: [
                    [sortBy, sort]
                ],
                where: condition
            })

            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    updateItem: async (req, res) => {
        try {
            const result = await cartDetail.update({ totalItems: req.body.totalItems}, {
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