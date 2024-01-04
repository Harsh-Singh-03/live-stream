"use server"

import { fetchUser } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service"
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache"

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

export const onBlock = async ( id:string ) => {
    const self = await fetchUser()
    let res;
    if(!self || !self.success || !self.user) throw new Error('session expired')
    try {
        res = await blockUser(id) 
    } catch {
        // That means user is guest
    }
    try {
        roomService.removeParticipant(self.user.id, id)
    } catch {
        // That means user is not in the room
    }
    
    revalidatePath(`/${self.user.username}`)
    revalidatePath(`/u/${self.user.username}`)
    return res?.blocked.username || 'guest user'
}

export const onUnblock = async ( id:string ) => {
    try {
        const res = await unblockUser(id)
        revalidatePath('/')
        if(res){
            revalidatePath(`/${res.blocked.username}`)
        }
        return res
    } catch (error) {
        throw new Error('Interal server error')
    }
}