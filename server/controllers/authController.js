import bcrypt from 'bcryptjs'
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