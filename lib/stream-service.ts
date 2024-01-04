import { db } from "./db";

export const getStreamById =async (id: string) => {
    try {
        const stream = await db.stream.findUnique({
            where: { userId: id },
        });
        if(!stream) return {success: false}
        return {success: true, stream};
            
    } catch (error) {
        return {success: false,}
    }
    
}