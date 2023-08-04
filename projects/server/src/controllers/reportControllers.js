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
                    [Op.gte]: new Date(dateStart).setHours(7,0,0,0),
                    [Op.lte]: new Date(dateEnd).setHours(30,59,59,599)
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
            res.status(400).send(error)
        }
    },
    profit: async (req, res) => {
        try {
            const todayStart = new Date()
            todayStart.setDate(todayStart.getDate() + 1)
            todayStart.setHours(-17,0,0,0)

            const todayEnd = new Date()
            todayEnd.setDate(todayEnd.getDate() + 1)
            todayEnd.setHours(6,59,59,599)
            const todayIncome = await Transaction.sum("amount", {
                where: {
                    createdAt: {
                        [Op.and]: {
                            [Op.gte]: todayStart,
                            [Op.lte]: todayEnd
                        }
                    }
                }
            })

            const yesterdayIncome = await Transaction.sum("amount", {
                where: {
                    createdAt: {
                        [Op.and]: {
                            [Op.gte]: new Date().setHours(-17,0,0,0),
                            [Op.lte]: new Date().setHours(6,59,59,599)
                        }
                    }
                }
            })

            const result = todayIncome - yesterdayIncome
            res.status(200).send(result.toString())
        } catch (error) {
            res.status(400).send(error)
        }
    },
    todayOrder: async (req, res) => {
        try {
            const todayStart = new Date()
            todayStart.setDate(todayStart.getDate() + 1)
            todayStart.setHours(-17,0,0,0)

            const todayEnd = new Date()
            todayEnd.setDate(todayEnd.getDate() + 1)
            todayEnd.setHours(6,59,59,599)

            const result = await Transaction.count({
                where: {
                    createdAt: {
                        [Op.and]: {
                            [Op.gte]: todayStart,
                            [Op.lte]: todayEnd
                        }
                    }
                }
            })

            res.status(200).send(result.toString())
        } catch (error) {
            res.status(400).send(error)
        }
    },
    topProduct: async (req, res) => {
        try {
            const allTransactions = await Transaction.findAll({
                include: [
                  {
                    model: transactionDetail,
                    include: {
                      model: Product
                    }}],
              })
          
              const productSalesCount = {}
          
              allTransactions.forEach((transaction) => {
                transaction.transactionDetails.forEach((detail) => {
                  const { Product, totalItems } = detail;
                  if (productSalesCount[Product?.productName]) {
                    productSalesCount[Product?.productName] += totalItems;
                  } else {
                    productSalesCount[Product?.productName] = totalItems;
                  }})
              })
          
              const productSalesArray = Object.keys(productSalesCount).map((productName) => ({
                productName,
                salesCount: productSalesCount[productName]
              }))
          
              productSalesArray.sort((a, b) => b.salesCount - a.salesCount)

              const top5Products = productSalesArray.slice(0, 5);
          
              res.status(200).send(top5Products)
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    },
    totalCashier: async (req, res) => {
        try {
           const result = await Cashier.count()
           res.status(200).send(result.toString()) 
        } catch (error) {
            res.status(400).send(error)
        }
    },
    daySales: async (req, res) => {
        try {
            const result = await Transaction.findAll({
              attributes: [
                [sequelize.fn('date', sequelize.col('createdAt')), 'date'],
                [sequelize.fn('sum', sequelize.col('amount')), 'totalAmount'],
              ],
              group: [sequelize.fn('date', sequelize.col('createdAt'))],
              order: [[sequelize.fn('date', sequelize.col('createdAt')), 'DESC']],
              limit: 7
            });
        
            res.status(200).send(result);
          } catch (error) {
            console.log(error);
            res.status(400).send(error);
          }
    }
}