import { fetchUser } from "./auth-service"
import { db } from "./db"

//@ TODO left

export const isBlockedByUser = async (id: string) => {
    try {
      const res = await fetchUser();
      if(!res.success || !res.user) throw new Error('Session expired please re login!')
      const self = res.user
  
      const otherUser = await db.user.findUnique({
        where: { id }
      });
  
      if (!otherUser) {
        throw new Error("User not found");
      }
  
      if (otherUser.id === self.id) {
        return false;
      }
  
      const existingBlock = await db.block.findUnique({
        where: {
          blockerId_blockedId: {
            blockerId: otherUser.id,
            blockedId: self.id,
          },
        },
      });
  
      return !!existingBlock;
    } catch {
      return false;
    }
};

export const blockUser = async (id: string) => {
    if(id.includes('host-')) throw new Error('Can not block yourself')
    const currentUser = await fetchUser()
    if (!currentUser.success || !currentUser.user) throw new Error('Session expired please login!')

    const otherUser = await db.user.findUnique({ where: { id } })
    if (!otherUser) throw new Error("User not found")

    if (otherUser.id === currentUser.user.id) {
        throw new Error('Can not block yourself!')
    }
    const existingBlock = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: currentUser.user.id,
                blockedId: otherUser.id,
            }
        },
    });

    if (existingBlock) {
        throw new Error("Already blocked");
    }
    const Block = await db.block.create({
        data: {
            blockerId: currentUser.user.id,
            blockedId: otherUser.id,
        },
        include: {
            blocked: true
        }
    })
    return Block
}

export const unblockUser = async (id: string) => {

    const currentUser = await fetchUser()
    if (!currentUser.success || !currentUser.user) throw new Error('Session expired please login!')

    const otherUser = await db.user.findUnique({ where: { id } })
    if (!otherUser) throw new Error("User not found")

    if (otherUser.id === currentUser.user.id) {
        throw new Error('Can not unblock yourself!')
    }
    const existingBlock = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: currentUser.user.id,
                blockedId: otherUser.id,
            }
        },
    });

    if (!existingBlock) {
        throw new Error("not blocked");
    }
    const Block = await db.block.delete({
        where: { id: existingBlock.id },
        include: { blocked: true }
    })
    return Block
}