"use client"

import { Volume1, Volume2, VolumeX } from "lucide-react"
import { Hint } from "../Globals/Hint"
import { Slider } from "../ui/slider"
import { Button } from "../ui/button"

interface props {
    value: number,
    onChange: (value: number) => void
    onToggle: () => void
}

export const VolumeControl = ({ value, onChange, onToggle }: props) => {

    const Icon = value === 0 ? VolumeX : value > 50 ? Volume2 : Volume1
    const label = value === 0 ? 'Unmute' : 'Mute'
    const handleChange = (value: number[]) => {
        onChange(value[0])
    }

    return (
        <div className="flex items-center gap-2">
            <Hint label={label} asChild>
                <Button variant='ghost' size="sm" onClick={onToggle} className="hover:bg-white/10" >
                    <Icon className="h-6 w-6" />
                </Button>
            </Hint>
            <Slider
                className="w-[8rem] cursor-pointer"
                onValueChange={handleChange}
                value={[value]}
                max={100}
                step={1}
            />
        </div>
    )
}