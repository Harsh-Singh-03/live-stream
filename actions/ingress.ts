"use server"

import {
    IngressAudioEncodingPreset,
    IngressInput,
    IngressClient,
    IngressVideoEncodingPreset,
    RoomServiceClient,
    type CreateIngressOptions,
} from "livekit-server-sdk";

import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";
import { db } from "@/lib/db";
import { fetchUser } from "@/lib/auth-service";
import { revalidatePath } from "next/cache";
// Create room serive
const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export const resetIngresses = async (hostIdentity: string) => {
    // hostIdentity : Currentuserid first get all ingress and rooms and delete each of them 
    const ingresses = await ingressClient.listIngress({
        roomName: hostIdentity
    })

    const rooms = await roomService.listRooms([hostIdentity])

    for (const room of rooms) {
        await roomService.deleteRoom(room.name)
    }

    for (const ingress of ingresses) {
        if (ingress.ingressId) {
            await ingressClient.deleteIngress(ingress.ingressId)
        }
    }
}

export const createIngress = async (ingressType: IngressInput) => {
    // First verify user login or not
    const res = await fetchUser()
    if (!res || !res.success || !res.user || !res.user.isEmailVerified) throw new Error('Session expired!')
    // Then reset previos ingress
    await resetIngresses(res.user.id)
   
    // Create ingress options
    const options: CreateIngressOptions = {
        name: res.user.username,
        roomName: res.user.id,
        participantName: res.user.username,
        participantIdentity: res.user.id,
    };
    // modify options for following ingressType
    if (ingressType === IngressInput.WHIP_INPUT) {
        options.bypassTranscoding = true
    } 
    else {
        options.video = {
            source: TrackSource.CAMERA,
            preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
        };
        options.audio = {
            source: TrackSource.MICROPHONE,
            preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
        };
    }
    // Create ingress with its type & option
    const ingress = await ingressClient.createIngress(
        ingressType,
        options,
    );
   
    // Verify if its created successfully or not
    if(!ingress || !ingress.streamKey || !ingress.url) throw new Error('Failed to create ingress!')
    // After that update the db stream model of particuler user with that ingress credentials
    await db.stream.update({
        where: { userId: res.user.id },
        data: {
          ingressId: ingress.ingressId,
          serverUrl: ingress.url,
          streamKey: ingress.streamKey,
        },
    });
    // Refresh the page
    revalidatePath(`/u/${res.user.username}/keys`)
    // Return with ingress object
    return ingress

}
