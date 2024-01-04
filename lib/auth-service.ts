"use server"

import { getServerSession } from "next-auth"
import { db } from "./db"

export const fetchUser = async () => {
    try {
        const session = await getServerSession()
        if (!session || !session.user || !session.user.email) return { success: false, message: "invalid request, session expired please relogin" }
        const user = await db.user.findUnique({
            where: { email: session.user.email },
            select: {id: true, image: true, name: true, email: true, username: true, isEmailVerified: true, bio: true, provider: true}
        })
        if (!user) { return { success: false, message: "session expired please relogin" } }
        else { return { user, success: true } }

    } catch (error: any) {
        return { success: false, message: error.message }
    }
}
// TODO Left
export const getUserByUsername = async (username: string, isCredential?: boolean) =>{
    try {
        const user = await db.user.findUnique({
            where: { username: username },
            select : {
                id: true,
                username: true,
                name: true,
                isEmailVerified: true,
                image: true,
                email: true,
                bio: true,
                _count: true,
                Stream: {
                    select: {
                        id: true,
                        isLive: true,
                        name: true,
                        thumbnailUrl: true,
                        isChatDelayed: true,
                        isChatEnabled: true,
                        isChatFollowersOnly: true,
                        serverUrl: isCredential || false,
                        streamKey: isCredential || false,
                    }
                }
            }
        })
        if (!user) { return { success: false, message: "Not found" } }
        // if(user.username === currentUser.user?.username) return {success: false, message: 'Not allowed'}
        else { return { user, success: true } }

    } catch (error: any) {
        return { success: false, message: error.message }
    }
}

export const accessDashboardByUsername =async (username:string) => {
    try {
        const session = await getServerSession()
        if(!session || !session.user || !session.user.email) return {success: false}
    
        const user = await db.user.findUnique({
            where: {username: username, email: session.user.email},
             select : {
                id: true,
                username: true,
                name: true,
                isEmailVerified: true,
                email: true,
                image: true,
                bio: true
            }
        })
    
        if(!user) return {success: false}
    
        return {success: true, user}
        
    } catch (error) {
        return {success: false}
    }
}
