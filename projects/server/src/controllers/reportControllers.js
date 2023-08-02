const { Cashier, Category, Cart, Product, sequelize, Transaction, cartDetail, transactionDetail } = require("../models")
const { Sequelize, Op } = require("sequelize")

module.exports = {
    getTrans: async (req, res) => {
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 10;
            const offset = (page - 1) * limit;
            const search = req.query.search;
            const sort = req.query.sort || 'DESC';
            const sortBy = req.query.sortBy || 'createdAt';
            const dateStart = req.query.dateStart
            const dateEnd = req.query.dateEnd
            const condition = {}
            

            if (search) {
                condition[Op.or] = [{ id: { [Op.like]: `%${search}%` } }];
              
            }
            if (dateStart || dateEnd) {
                condition.createdAt = {[Op.and]: {
                    [Op.gte]: new Date(dateStart).toLocaleDateString(),
                    [Op.lte]: new Date(dateEnd).toLocaleDateString()
                }}}

            const result = await Transaction.findAll({
                attributes: ['id', 'createdAt', 'CashierId', 'amount'],
                include: [{
                    model: Cashier,
                    attributes: ['id', 'username', 'firstName', 'lastName'],
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
            })
            const total = await Transaction.count({ where: condition })

            res.status(200).send({
                currentPage: page,
                totalPage: Math.ceil(total / limit),
                total: total,
                limit,
                result,
            })
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    }
}