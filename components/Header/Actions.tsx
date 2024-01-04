"use client"

import { fetchUser } from "@/lib/auth-service"
import UsermenuSkeleton from "@/components/Skeletons/Usermenu"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useCustom } from "@/context/Customhook"

import { PopoverClose } from "@radix-ui/react-popover"
import { Clapperboard, LogOut, X } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import Usermenu from "./Usermenu"
import { UserAvatar } from "../Globals/User-Avatar"

interface userProps {
    id: string;
    email: string;
    username: string;
    name: string;
    image: string | null;
    bio: string | null;
    isEmailVerified: boolean;
}
interface props {
    isDashboard: boolean,
    user?: userProps
}
const Actions = ({ isDashboard, user }: props) => {

    const { userData, setUserData }: any = useCustom()

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const res = await fetchUser()
                setUserData({ status: res.success ? 'authenticated' : 'unauthenticated', user: res.user || {} })

            } catch (error: any) {
                setUserData({ status: 'unauthenticated', user: {} })
                console.error(error.message)
            }
        }

        if (userData.status !== 'authenticated' && isDashboard === false) {
            fetchUserData()            
        }
        if (isDashboard === true && user) {
            setUserData({ status: "authenticated", user: user })
        }

    },[])

    return (
        <div className="flex items-center justify-end gap-x-2">
            {userData.status === 'unauthenticated' && isDashboard === false && (
                <Button size="sm" variant="primary">
                    <Link href='/sign-in'>
                        Login
                    </Link>
                </Button>
            )}
            {userData.status === 'authenticated' && userData.user && (
                <div className="flex items-center gap-x-2 md:gap-x-4">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-muted-foreground hover:text-primary"
                        asChild
                    >
                        {isDashboard === false ? (
                            <Link href={`/u/${userData.user.username}`}>
                                <Clapperboard className="h-5 w-5 md:mr-2" />
                                <span className="hidden md:block">
                                    Dashboard
                                </span>
                            </Link>
                        ) : (
                            <Link href='/'>
                                <LogOut className="h-5 w-5 mr-2" />
                                <span>
                                    Exit
                                </span>
                            </Link>
                        )}
                    </Button>

                    <Popover>
                        <PopoverTrigger className="hover:opacity-75">
                            <UserAvatar
                                username={userData.user.name}
                                imageUrl={userData.user.image || ''}
                                size='md'
                            />
                        </PopoverTrigger>
                        <PopoverContent className="mr-4 px-2 pb-1">
                            <PopoverClose className="absolute top-2 right-6">
                                <X className="w-4 h-4 hover:text-muted-foreground transition" />
                            </PopoverClose>
                            <Usermenu email={userData.user.email} isEmailVerify={userData.user.isEmailVerified} username={userData.user.username} image={userData.user.image || ''} name={userData.user.name} />
                        </PopoverContent>
                    </Popover>
                </div>
            )}
            {userData.status === 'loading' && (
                <UsermenuSkeleton />
            )}
        </div>
    )
}

export default Actions