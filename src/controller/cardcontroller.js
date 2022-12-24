const cardModel = require("../models/cardmodel")
const customerMoodel = require('../models/customermodel')

const { isValidObjectId, isValidCardNumber, isValidPhone, isValidString } = require("../validations/validations")


//====================================CREATE CARD================================================================//

const createCard = async function (req, res) {
    try {
        let data = req.body
        data.status = data.status.toUpperCase()
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "provide data to create" })
        }
        if (!isValidCardNumber(data.cardNumber.trim())) return res.status(400).send({ status: true, msg: "provide valid card number" })

        if (!isValidString(data.cardType.trim())) return res.status(400).send({ status: false, msg: "provide valid cardtype" })
        if (!isValidString(data.customerName.trim())) return res.status(400).send({ status: false, msg: "provide valid customerName" })
        if (data.status.trim()) {
            if (data.status !== "ACTIVE" || data.status == "INACTIVE") {
                return res.status(400).send({ status: false, msg: "provide valid status info" })
            }
        }
        if (!isValidObjectId(data.customerID.trim())) return res.status(400).send({ status: false, msg: "provide valid cutomerId" })


        const cardCreation = await cardModel.create(data)
        return res.status(201).send({ status: true, data: cardCreation })
    }
    catch (error) {
        return res.status(500).send({ status: true, msg: error.message })
    }
}

//=======================================GET CARD=================================================================//

const getCardDetails = async function (req, res) {
    try {

        const fetchData = await cardModel.find({ status: "ACTIVE" })
        return res.status(200).send({ status: true, msg: fetchData })

    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports = { createCard, getCardDetails }
