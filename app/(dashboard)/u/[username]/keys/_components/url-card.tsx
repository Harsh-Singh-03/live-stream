import { Input } from "@/components/ui/input"
import { CopyButton } from "./copy-button"

interface props {
    value: string | null
}
export const UrlCard = ({ value }: props) => {
    return (
        <div className="rounded-md bg-muted p-4 md:p-6">
            <div className="flex md:items-center flex-col md:flex-row gap-4 md:gap-6">
                <p className="font-semibold shrink-0">
                    Server URL :
                </p>
                <div className="space-y-2 w-full">
                    <div className="w-full flex items-center gap-x-2">
                        <Input
                            value={value || ""}
                            disabled
                            placeholder="Server URL"
                        />
                        <CopyButton
                            value={value || ""}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}