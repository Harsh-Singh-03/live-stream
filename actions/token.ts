"use server"

import { v4 } from "uuid"
import { fetchUser } from "@/lib/auth-service"
import { isBlockedByUser } from "@/lib/block-service"
import { db } from "@/lib/db"
import { AccessToken } from "livekit-server-sdk"

export const createViewerToken = async (hostId: string) =>{
    let self;
    // Check user is guest or logged in 
    const res = await fetchUser()
    // if guest then then create guest username and random id
    if(!res || !res.success || !res.user){
        const id = v4();
        const username = `guest#${Math.floor(Math.random() * 1000)}`;
        self = {id, username}
    }
    // else just assign its own user object
    if(res.success && res.user){
        self = res.user
    }
    // Verify host with it 
    const host = await db.user.findUnique({where: {id: hostId}})
    if(!host) throw new Error('Invaild host')
    // verify viewing user is block or not if block throw an error
    const isblocked = await isBlockedByUser(host.id)
    if(isblocked) throw new Error('User is blocked')
    // check if the host or viewing user is same or not
    const isSame = host.id === self?.id
    // create new accesstoken for stream viewing from livekit 
    // Where user identity as isSame / loggedin / guest - id and same name as username
    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_API_SECRET!,
        {
          identity: isSame ? `host-${self?.id}` : self?.id,
          name: self?.username,
        }
    );
    // Then grand the token for specific actions
    token.addGrant({
        room: host.id,
        canPublish: false,
        canPublishData: true,
        roomJoin: true
    })
    //Now return the jwt token
    return await Promise.resolve(token.toJwt())
}