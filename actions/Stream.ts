"use server";

import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { fetchUser } from "@/lib/auth-service";

export const updateStream = async (values: Partial<Stream>) => {
    try {
        const res = await fetchUser();
        if(!res || !res.success || !res.user) throw new Error('Session expired')
        const self = res.user

        const selfStream = await db.stream.findUnique({
            where: {
                userId: self.id,
            },
        });

        if (!selfStream) {
            throw new Error("Stream not found");
        }

        const validData = {
            thumbnailUrl: values.thumbnailUrl,
            name: values.name,
            isChatEnabled: values.isChatEnabled,
            isChatFollowersOnly: values.isChatFollowersOnly,
            isChatDelayed: values.isChatDelayed,
        };

        const stream = await db.stream.update({
            where: {
                id: selfStream.id,
            },
            data: {
                ...validData,
            },
        });

        revalidatePath(`/u/${self.username}/chat`);
        revalidatePath(`/u/${self.username}`);
        revalidatePath(`/${self.username}`);

        return stream;
        
    } catch {
        throw new Error("Internal Error");
    };
};