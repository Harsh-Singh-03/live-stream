import { fetchUser } from "./auth-service";
import { db } from "./db";



export const getSearchStream = async (q: string) => {
    // TODO -- Getting error for logged in use condition with checking if blocking
    const stream = await db.stream.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: q
                    },
                },
                {
                    user: {
                        username: {
                            contains: q,
                        },
                    },
                },
            ]
        },
        select: {
            id: true,
            isLive: true,
            name: true,
            thumbnailUrl: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    image: true,
                    bio: true,
                    isEmailVerified: true,
                },
            },
        },
        orderBy: [
            {
                isLive: "desc",
            },
            {
                updatedAt: "desc",
            }
        ],
    })

    return stream || []
}