const express = require("express");
const {PrismaClient} = require("@prisma/client");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT;


const getUser = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            message: 'Internal error'
        })
    }
}

const createUser = async (req, res) => {
    const {name, email} = req.body;
    try {
        // midleware 
        // jika email sudah ada
        const existingUser = await prisma.user.findUnique({
            where: {email}
        })
        if (existingUser) {
           return res.status(401).json({
                message: 'Email sudah terdaftar'
            })
        }
    // controllers
    //create data user
        const user = await prisma.user.create({
            data: {
                name,
                email
            }
        })
        res.status(201).json({
            message: 'Data berhasil ditambahkan',
            data: {
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }


}

const editUser = async (req, res) => {
    const {name, email} = req.body;
    try {
        // ubah data user
        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: name,
                email: email
            }
        })
        res.status(201).json({
            message: "Berhasil ubah data",
            data: {
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}
const deleteUser = async (req, res) => {
    try {

        //hapus data user
        const user = await prisma.user.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.status(200).json({
            message: 'Berhasil hapus data',
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server'
        })
    }
}
app.use(express.json());
app.get("/user", getUser);
app.post("/user", createUser);
app.put("/user/:id", editUser);
app.delete("/user/:id", deleteUser);
app.listen(PORT, () => {
    console.log(`Server ${PORT}`)
})
