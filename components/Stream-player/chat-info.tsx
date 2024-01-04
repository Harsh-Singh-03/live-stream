import { useMemo } from "react";
import { Hint } from "../Globals/Hint";
import { Info } from "lucide-react";

interface props {
    isDelayed: boolean;
    isFollowersOnly: boolean;
};
export const ChatInfo = ({ isDelayed, isFollowersOnly }: props) => {

    const hint = useMemo(() => {
        if (isFollowersOnly && !isDelayed) {
          return {msg: "Followers only", label: "Only followers can chat"};
        }
    
        if (isDelayed && !isFollowersOnly) {
          return {msg: "Slow mode", label: "Messages are delayed by 3 seconds"};
        }
    
        if (isDelayed && isFollowersOnly) {
          return {msg: "Followers only and slow mode" , label: "Only followers can chat. Messages are delayed by 3 seconds" }
        }
        return {msg: '', label: ''}
      }, [isDelayed, isFollowersOnly]);
    
    return (
        <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
            <Hint label={hint.label}>
                <Info className="h-4 w-4" />
            </Hint>
            <p className="text-xs font-semibold">
                {hint.msg}
            </p>
        </div>
    )

}