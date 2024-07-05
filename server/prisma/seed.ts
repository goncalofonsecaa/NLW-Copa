import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient () 

async function main () {
    const user = await prisma.user.create({
        data: {
            name: 'Jonh Doe',
            email: "jonh.doe@gmail.com",
            avatarUrl: "https://github.com/goncalofonsecaa.png"
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: "Example Pool",
            code: "BOL123",
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id,
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: "2024-07-04T12:00:00.670Z",
            firstTeamCountryCode: "DE",
            secondTeamCountryCode: "BR",
        }
    })

    await prisma.game.create({
        data: {
            date: "2024-07-05T12:00:00.670Z",
            firstTeamCountryCode: "PT",
            secondTeamCountryCode: "FR",

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                }
            }
        }
    },
    })
}


main () 