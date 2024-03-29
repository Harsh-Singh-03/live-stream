"use client"

import { useParticipants } from "@livekit/components-react"
import { useMemo, useState } from "react"
import { useDebounce } from "usehooks-ts"
import { Input } from "../ui/input"
import { LocalParticipant, RemoteParticipant } from "livekit-client"
import { ScrollArea } from "../ui/scroll-area"
import { CommunityItem } from "./community-item"

interface props {
    hostName: string,
    viewerName: string,
    isHidden: boolean
}
export const ChatCommunity = ({ hostName, viewerName, isHidden }: props) => {
    const [value, setValue] = useState("")
    const debouncedValue = useDebounce<string>(value, 500)
    const participants = useParticipants()

    const onChange = (val: string) => {
        setValue(val)
    }

    const filteredParticipants = useMemo(() => {
        const deduped = participants.reduce((acc, participant) => {
            const hostAsViewer = `host-${participant.identity}`;
            if (!acc.some((p) => p.identity === hostAsViewer)) {
                acc.push(participant);
            }
            return acc;
        }, [] as (RemoteParticipant | LocalParticipant)[]);

        return deduped.filter((participant) => {
            return participant.name?.toLowerCase().includes(debouncedValue.toLowerCase())
        });
    }, [participants, debouncedValue]);

    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Community is disabled
                </p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <Input className="border-white/10" placeholder="Search community" value={value} onChange={(e) => onChange(e.target.value)} />
            <ScrollArea className="gap-y-2 mt-4">
                <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
                    No results
                </p>
                {filteredParticipants.map((participant) => (
                    <CommunityItem
                        key={participant.identity}
                        hostName={hostName}
                        viewerName={viewerName}
                        participantName={participant.name}
                        participantIdentity={participant.identity}
                    />
                ))}
            </ScrollArea>
        </div>
    )
}