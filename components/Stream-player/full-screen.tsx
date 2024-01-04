"use client"

import { Maximize, Minimize } from "lucide-react";
import { Hint } from "../Globals/Hint";
import { Button } from "../ui/button";

interface props {
    isFullScreen: boolean;
    onToggle: () => void
}
export const FullScrren = ({ onToggle, isFullScreen }: props) => {
    const Icon = isFullScreen ? Minimize : Maximize
    const label = isFullScreen ? 'Exit' : 'Full screen'

    return (
        <div className="flex items-center justify-center gap-4">
            <Hint label={label} asChild>
                <Button  variant='ghost'  className="hover:bg-white/10"  size='sm'  onClick={onToggle} >
                    <Icon className="h-5 w-5" />
                </Button>
            </Hint>
        </div>
    )
}