import { fetchUser } from "./auth-service";
import { db } from "./db";


export const getStream = async () => {
    let userId;

    try {
        const res = await fetchUser()
        if(res && res.success && res.user){
            userId = res.user.id
        }else{
            userId = null
        }
    } catch {
        userId = null
    }

    let stream = []

    if(userId){
        stream = await db.stream.findMany({
            where: {
                user: {
                    NOT: {
                        blocking: {
                            some: {
                                blockedId: userId
                            },
                        },
                    },
                },
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
    }else{
        stream = await db.stream.findMany({
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
    }
    return stream || []
}