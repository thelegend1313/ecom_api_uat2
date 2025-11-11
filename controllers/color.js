const prisma = require("../config/prisma")
const xlsx = require('xlsx');//*
const fs = require('fs')

exports.create = async (req, res) => {
    try {
        // code
        const { name,namet,code,status,des,image,short_code,type } = req.body
        console.log('test colorf' + name)
        const color = await prisma.color.create({
            data: {
                name: name,
                namet: namet,
                code: code,
                status: Boolean(status),
                des: des,
                image: image,
                short_code: short_code,
                type: type

            }
        })
        res.send(color)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}
exports.list = async (req, res) => {
    try {
        // code
        const color = await prisma.color.findMany()
        res.send(color)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}
exports.remove = async (req, res) => {
    try {
        // code
        const { id } = req.params
        const color = await prisma.color.delete({
            where: {
                id: Number(id)
            }
        })
        res.send(color)
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
            const { name,namet,code,status,des,image,short_code,type } = data[i]
            /* if(!name){
                failureData.push({ row : i , message : "Name is required" })
                continue
            } */
            console.log(name)
            const color = await prisma.color.create({
                data: {
                name: name,
                namet: namet,
                code: code,
                status: Boolean(status),
                des: des,
                image: image,
                short_code: short_code,
                type: type

            }
            })

        }
        res.send(color)
        //console.log(excel)
    } catch (err) {
        console.log(err)
    }
}
