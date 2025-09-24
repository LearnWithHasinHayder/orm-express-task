import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.task.createMany({
        data: [
            { title: "Learn Prisma" },
            { title: "Build Task Manager", completed: false },
            { title: "Style with Tailwind", completed: true },
            { title: "Write class notes", completed: false },
            { title: "Drink coffee ☕", completed: true },
        ]
    })
}

main()
    .catch(e => console.log(e))
    .finally(() =>prisma.$disconnect())