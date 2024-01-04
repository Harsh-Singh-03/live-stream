import { fetchUser } from "./auth-service";
import { db } from "./db";

export const isFollowingUser = async (id: string) => {
  try {
    const data = await fetchUser();
    if (data.success === false || !data.user) return { isFollowing: false, isSelf: false }
    const self = data.user

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      return { isFollowing: false, isSelf: true }
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    return { isFollowing: !!existingFollow, isSelf: false }
  } catch {
    return { isFollowing: false, isSelf: false }
  }
};

export const getFollowedUser = async () => {
  try {
    const currentUser = await fetchUser()
    if (!currentUser.success || !currentUser.user) return []
    const data = await db.follow.findMany({
      where: {
        followerId: currentUser.user.id,
        following: {
          blocking: {
            none: {
              blockedId: currentUser.user.id,
            },
          },
        },
      },
      select: {
        id: true,
        following: {
          select: {
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
          }
        }
      },
      orderBy: [
        {
          following: {
            Stream: {
              isLive: "desc",
            },
          },
        },
        {
          createdAt: "desc"
        }
      ]
    })
    if (!data) return []
    return data
  } catch (error) {
    return []
  }
}
//TODO Left
export const followUser = async (id: string) => {
  const data = await fetchUser();
  if (data.success === false || !data.user) throw new Error("User not found");
  const self = data.user

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === self.id) {
    throw new Error("Cannot follow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) {
    throw new Error("Already following");
  }

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });

  return follow;
};
//TODO Left
export const unfollowUser = async (id: string) => {
  const data = await fetchUser();
  if (data.success === false || !data.user) throw new Error("User not found");
  const self = data.user

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === self.id) {
    throw new Error("Cannot unfollow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (!existingFollow) {
    throw new Error("Not following");
  }

  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });

  return follow;
};