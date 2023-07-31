const { Cashier, Category, Cart, Product, sequelize, Transaction, cartDetail, transactionDetail } = require("../models")
const { Sequelize, Op } = require("sequelize")

module.exports = {
    getTrans: async (req, res) => {
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 10;
            const offset = (page - 1) * limit;
            const search = req.query.search;
            const catId = +req.query.catId;
            const transId = +req.query.transId
            const sort = req.query.sort || 'DESC';
            const sortBy = req.query.sortBy || 'createdAt';
            const dateStart = req.query.dateStart
            const dateEnd = req.query.dateEnd
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
            if (dateStart || dateEnd) {
                condition.createdAt = {
                    [Op.between]: [new Date(dateStart), new Date(dateEnd)]
                  }
            }

            const result = await Transaction.findAll({
                attributes: ['id', 'createdAt', 'CashierId', 'amount'],
                include: [{
                    model: Cashier,
                    attributes: ['id', 'username', 'firstName', 'lastName']
                },{
                    model: transactionDetail,
                    attributes: ['totalItems', 'ProductId', 'totalPrice'],
                    include: [{
                        model: Product,
                        attributes: ['productName', 'productPrice', 'productImage'] 
                    }],
                }],
                limit,
                offset,
                where: condition,
                order: [
                    [sortBy, sort]
                ],
                subQuery: false
            })
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error)
        }
    }
}