"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleUserRound, UserCog, UserRoundX, Users, UsersRound } from "lucide-react";
import { useState } from "react";
import { PersonalTab } from "./personal-tab";
import { props } from "@/lib/type";
import { FollowingTab } from "./following-tab";
import { FollowersTab } from "./follower-tab";
import { BlockTab } from "./block-tab";
import { CredentialsTab } from "./credential-tab";

export const UserModal = ({user, following, followers, blocking}: props) => {
    const [activeTab, setActiveTab] = useState('personal')
    const onChange = (value: string) => {
        setActiveTab(value)
    }
    const TabData = [
        {
            icon: CircleUserRound,
            title: 'personal',
        },
        {
            icon: Users,
            title: 'followings',
        },
        {
            icon: UsersRound,
            title: 'followers',
        },
        {
            icon: UserRoundX,
            title: 'blocks',
        },
        {
            icon: UserCog,
            title: 'credentials',
        }
    ]
    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto p-0">Edit</Button>
            </DialogTrigger>

            <DialogContent className="rounded-md max-w-3xl p-3 md:p-6">

                <DialogHeader>
                    <DialogTitle className="text-center tracking-wider font-semibold">
                        Profile Settings
                    </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue={activeTab} className="w-full mt-4 md:mt-2" onValueChange={onChange}>
                    
                    <TabsList className="w-full relative">
                        {TabData.map((data, i) => (
                            <TabsTrigger value={data.title} className="w-full gap-2 px-0" key={i}>
                                <data.icon className="w-5 h-5" />
                                {activeTab === data.title && (
                                    <span className="inline text-sm font-medium absolute -translate-y-8 bg-white text-black rounded py-1 px-2 md:hidden">{data.title}</span>
                                )}
                                <span className="hidden md:inline">{data.title}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                   <TabsContent value="personal">
                        <PersonalTab initialImage={user.image} initialName={user.name} />
                   </TabsContent>

                   <TabsContent value="followings">
                        <FollowingTab Followings={following} />
                   </TabsContent>

                   <TabsContent value="followers">
                        <FollowersTab Followers={followers} />
                   </TabsContent>

                   <TabsContent value="blocks">
                        <BlockTab Block={blocking} />
                   </TabsContent>

                   <TabsContent value="credentials">
                        <CredentialsTab id={user.id} initialEmail={user.email} initialUsername={user.username} />
                   </TabsContent>

                </Tabs>

            </DialogContent>

        </Dialog>
    )
}