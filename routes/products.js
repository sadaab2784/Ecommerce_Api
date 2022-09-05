const express = require('express');
const router = express.Router();
const Product = require('./../model/product');


/* GET home page. */
router.post('/create', async function (req, res, next) {
    let { name, quantity } = req.body;
    try {

        if (!name || !quantity) {
            return res.status(422).json({
                msg: "Name and quantity is required",
            })
        }

        let product = await Product.create({
            name: name,
            quantity: quantity,
        })
        res.status(201).json({
            "data": {
                product: {
                    name: product.name,
                    quantity: product.quantity,
                }
            }
        })
    } catch (err) {
        return res.status(422).json({
            err
        })
    }



});

router.get("/", async (req, res, next) => {
    try {
        let product = await Product.find()
        let productsArray = product.map((el) => {
            return {
                id: el._id,
                name: el.name,
                quantity: el.quantity,
            }
        })

        res.status(200).json({
            data: {
                product: productsArray
            }
        })
    }
    catch (err) {
        return res.status(422).json({
            err
        })
    }


})
router.delete('/:id', async (req, res, next) => {
    let { id } = req.params;
    try {
        let product = await Product.findByIdAndDelete({ _id: id })

        if (product) {
          return  res.status(200).json({
                data: {
                    message: "product deleted"
                }
            })
        } else {

            return res.status(422).json({
                data: {
                    msg: "Invalid Id"
                }
            })
        }

    }
    catch (err) {
        return res.status(422).json({
            err
        })
    }
})

router.patch("/:id/update_quantity", async (req, res, next) => {
    let { id } = req.params;
    let { number } = req.query;

    try {

        if (!id || !number) {
            return res.status(422).json({
                msg: "Id and quantity is required",
            })
        }


        let product = await Product.findByIdAndUpdate({ _id: id }, {
            quantity: number,
        }, { new: true })

        if (product) {
          return  res.status(200).json({
                data: {
                    product: {
                        _id: product._id, name: product.name, quantity: product.quantity
                    },
                    message: "updated successfully"
                }
            })
        } else {

          return  res.status(422).json({
                data: {
                    msg: "Invalid Id"
                }
            })
        }
    }
    catch (err) {
        next(err)
    }


})

module.exports = router;
