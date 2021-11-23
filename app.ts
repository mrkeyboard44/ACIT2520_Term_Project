import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express()
app.use(express.json());



// create a user

app.post("/users", async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const user = await prisma.user.create({
            data: { name, email }
        });
        return res.json(user);
    } catch (err) {
        return res.status(400).json(err);
    }
})

app.get("/users", async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                posts: {
                    select: {
                        body: true,
                        title: true
                    }
                }
            }
        })
        return res.json(users);
    } catch (err) {
        return res.status(500).json({ error: "something went wrong :("})
    }
})

app.get("/posts", async (req: Request, res: Response) => {
    try {
        const posts = await prisma.post.findMany()
        return res.json(posts);
    } catch (err) {
        return res.status(500).json({ error: "something went wrong :("})
    }
})

app.listen(3001, () => {
    console.log( "Server running. Visit: localhost:3001/reminders in your browser 🚀" );
})