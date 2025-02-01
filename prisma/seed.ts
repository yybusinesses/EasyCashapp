import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a test job
  const job = await prisma.project.create({
    data: {
      title: "Website Development - Portfolio Site",
      description: "Need a developer to create a simple portfolio website using React and Tailwind CSS",
      budget: {
        min: 500,
        max: 1000,
        currency: "USD"
      },
      skills: ["React", "Tailwind CSS", "Next.js"],
      location: {
        type: "REMOTE",
        country: "Worldwide"
      },
      duration: "2 weeks",
      status: "OPEN"
    }
  })

  console.log('Created test job:', job)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 