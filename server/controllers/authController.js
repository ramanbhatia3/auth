import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const signup = async (req, res) => {
    try{
        const {name, email, password} = req.body

        if (!name || !email || !password){
            return res.status(400).json({ message : "All fields are required" })
        }

        const existingUser = await User.findOne({email})

        if (existingUser){
            return res.status(409).json({ message : "Email already in use" })
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        return res.status(201).json({ message : "User registered successfully" })
    }
    catch(error){
        console.error("SignUp Error: ", error)
        return res.status(500).json({ message : "Server Error" })
    }
}

export const login = async (req, res) => {
    try{
        const {email, password} = req.body

        if (!email || !password){
            return res.status(400).json({ message : "All fields are required" })
        }

        const user = await User.findOne({ email })

        if (!user){
            return res.status(401).json({ message : "Invalid email or password" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch){
            return res.status(401).json({ message : "Invalid email or password" })
        }

        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        )

        return res.status(200).json({
            message : "LogIn Successful",
            token
        })
    }
    catch(error){
        console.error("LogIn Error: ",error)
        return res.status(500).json({ message : "Server Error" })
    }
}