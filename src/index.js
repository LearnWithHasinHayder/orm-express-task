import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express()
const prisma = new PrismaClient()
app.use(express.urlencoded())

app.get('/', async (req, res) => {
    const tasks = await prisma.task.findMany()
    res.send(`
      <!DOCTYPE html>
        <html>

        <head>
            <script src="//cdn.tailwindcss.com"></script>
        </head>

        <body class="p-6">
            <div class='container max-w-md mx-auto'>
                <h1 class="text-2xl font-bold mb-4">Task Manager</h1>
                <form method="POST" action="/add" class="mb-4 flex gap-2">
                    <input name="title" placeholder="New Task" class="border border-gray-300 rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md">Add</button>
                </form>
                <ul>
                    ${tasks.map(t => `
                    <li class="mb-2 flex items-center justify-between">
                        <span class="${t.completed ? 'line-through text-gray-500' : ''}">
                            ${t.title}
                        </span>
                        <div class="flex gap-2">
                            <form method="POST" action="/toggle/${t.id}">
                                <button type="submit" class="text-sm bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-md font-medium transition-colors duration-200">
                                    ${t.completed ? 'Undo' : 'Mark as Done'}
                                </button>
                            </form>
                            <form method="POST" action="/delete/${t.id}" onsubmit="return confirm('Sure?')">
                                <button type="submit" class="text-sm bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md font-medium transition-colors duration-200">Delete</button>
                            </form>
                        </div>
                    </li>
                    `).join("")}
                </ul>
            </div>
        </body>

        </html>  
    `)
})

app.post("/add", async (req, res) => {
    const { title } = req.body
    await prisma.task.create({
        data: { title }
    })
    res.redirect("/")
})
app.post("/toggle/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const task = await prisma.task.findUnique({ where: { id } })
    await prisma.task.update({ data: { completed: !task.completed }, where: { id } })
    res.redirect("/")
})


app.post("/delete/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    await prisma.task.delete({ where: { id } })
    res.redirect("/")
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
    console.log("Running...")
})