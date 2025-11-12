const prisma = require('../config/prisma')
//const logger = require('../config/logger')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    try {
        //code

        const {
            email, password, birthday, birthmonth,
            birthyear, age, sex,
            address, country, zipcode, roleId
        } = req.body
        console.log("roleId", req.body)
        // Step 1 Validate body
        if (!email) {
            return res.status(400).json({ message: 'Email is required!!!' })
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required!!!" })
        }

        // Step 2 Check Email in DB already ?
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (user) {
            return res.status(400).json({ message: "Email already exits!!" })
        }
        // Step 3 HashPassword
        const hashPassword = await bcrypt.hash(password, 10)
       // console.log("testrole")


        // Step 4 Register
        await prisma.user.create({
            data: {
                email: email,
                password: hashPassword,
                birthday: Number(birthday),
                birthyear: Number(birthyear),
                birthmonth: Number(birthmonth),
                age: Number(age),
                sex: sex,
                address: address,
                country: country,
                zipcode: zipcode,
                roleId: parseInt(roleId)

            }
        })


        res.send('Register Success')
    } catch (err) {
        // err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.login = async (req, res) => {
    try {
        //code

        //logger.info('INFO message');
        //logger.debug('DEBUG message');
        //logger.error('ERROR message');
        const { email, password } = req.body
        // Step 1 Check Email
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        const role = await prisma.role.findFirst({
            where: {
                id: user.roleId
            }
        })
        if (!user || !user.enabled) {
            return res.status(400).json({ message: 'User Not found or not Enabled' })
        }
        // Step 2 Check password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Password Invalid!!!' })
        }
        // Step 3 Create Payload
        const payload = {
            id: user.id,
            email: user.email,
            role: role.name
        }
        // Step 4 Generate Token
        jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: "Server Error" })
            }
            res.json({ payload, token })

        })
    } catch (err) {
        // err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}
exports.currentUser = async (req, res) => {
    try {
        //code
        const user = await prisma.user.findFirst({
            where: { email: req.user.email },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        })
        res.json({ user })
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}
