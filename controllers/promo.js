const prisma = require("../config/prisma")
const xlsx = require('xlsx');//*
const fs = require('fs')

exports.create = async (req, res) => {
    try {
        // code
        const { name } = req.body
        console.log('test promof' + name)
        const promo = await prisma.promo.create({
            data: {
                name: name
            }
        })
        res.send(promo)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}
exports.list = async (req, res) => {
    try {
        // code
        const promo = await prisma.promo.findMany()
        res.send(promo)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}
exports.remove = async (req, res) => {
    try {
        // code
        const { id } = req.params
        const promo = await prisma.promo.delete({
            where: {
                id: Number(id)
            }
        })
        res.send(promo)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}

exports.importt = async (req, res) => {
    try {
        // code
        const excel = req.files

        console.log(excel.undefined)
        console.log(excel.undefined.mimetype)
        if (excel.undefined.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            return res.status(400).json({ message: "Invalid file format" })
            fs.unlinkSync(excel.undefined.tempFilePath)
        }
        const workbook = xlsx.readFile(excel.undefined.tempFilePath)
        const sheetName = workbook.SheetNames[0]
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName])

        const successData = []
        const failureData = []


        for (let i = 0; i < data.length; i++) {
            const { name } = data[i]
            /* if(!name){
                failureData.push({ row : i , message : "Name is required" })
                continue
            } */
            console.log(name)
            const promo = await prisma.promo.create({
                data: {
                    name: name
                }
            })

        }
        res.send(promo)
        //console.log(excel)
    } catch (err) {
        console.log(err)
    }
}