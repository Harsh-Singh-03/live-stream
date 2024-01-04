import { fetchUser } from "./auth-service"
import { db } from "./db"

export const getRecommomendedUser = async () => {
    try {
        const res = await fetchUser()
        if (res.success && res.user) {
            // will have to modify this query excule current user and fetch with live check blocking and blocked by an all..
            const data = await db.user.findMany({
                where: {
                    isEmailVerified: true,
                    AND: [
                        {
                            NOT: {
                                id: res.user.id
                            },
                        },
                        {
                            followedBy: {
                                some: {
                                    followerId: res.user.id,
                                },
                            },
                        },
                        {
                            blocking: {
                                some: {
                                    blockedId: res.user.id,
                                },
                            },
                        },
                    ]
                },
                select:{
                    name: true,
                    id: true,
                    username: true,
                    image: true,
                    isEmailVerified: true,
                    Stream: {
                        select: {
                            isLive: true
                        }
                    }
                },
                orderBy: [
                    {
                        Stream: {
                            isLive: "desc",
                        }
                    },
                    {
                        createdAt: "desc"
                    },
                ]
            })
            if (!data) return { success: false, message: 'some error occured' }
            return { success: true, message: 'Get', data }
        } else {
            const data = await db.user.findMany({
                where: { isEmailVerified: true },
                select:{
                    name: true,
                    username: true,
                    id: true,
                    image: true,
                    isEmailVerified: true,
                    Stream: {
                        select: {
                            isLive: true
                        }
                    }
                },
                orderBy: [
                    {
                        Stream: {
                            isLive: "desc",
                        }
                    },
                    {
                        createdAt: "desc"
                    },
                ]
            })
            if (!data) return { success: false, message: 'some error occured' }
            return { success: true, message: 'Get', data }
        }
    } catch (error) {
        return { success: false, message: 'some error occured' }
    }
}