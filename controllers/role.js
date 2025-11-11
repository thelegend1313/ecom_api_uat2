const prisma = require("../config/prisma")
const xlsx = require('xlsx');//*
const fs = require('fs')

exports.create = async (req, res) => {
    try {
        // code
        const { name } = req.body
        console.log('test role' + name)
        const role = await prisma.role.create({
            data: {
                name: name
            }
        })
        res.send(role)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}
//*add

exports.importt = async (req, res) => {
    try {
        /*    if (!req.files || Object.keys(req.files).length === 0) {
               return res.status(400).send('No files were uploaded.');
           } */
        //console.log(req.files)
        const excel = req.files['files[]']

        console.log(excel)
        //console.log("excel.files.mimetype"+excel.files.mimetype)
        if (excel.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            return res.status(400).json({ message: "Invalid file format" })
            fs.unlinkSync(excel.tempFilePath)
        }
        const workbook = xlsx.readFile(excel.tempFilePath)
        const sheetName = workbook.SheetNames[0]
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName])

        const successData = []
        const failureData = []


        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            const { name, status } = data[i]
            /* if(!name){
                failureData.push({ row : i , message : "Name is required" })
                continue
            } */
            console.log(name)
            const role = await prisma.role.create({
                data: {
                    name: name
                }
            })
           
        }
 res.send(role)
        //console.log(excel)
    } catch (err) {
        console.log(err)
    }
}

//*add end
exports.list = async (req, res) => {
    try {
        // code
        const role = await prisma.role.findMany()
        res.send(role)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}

exports.remove = async (req, res) => {
    try {
        // code
        const { id } = req.params
        const role = await prisma.role.delete({
            where: {
                id: Number(id)
            }
        })
        res.send(role)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}