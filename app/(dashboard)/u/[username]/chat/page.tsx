import { getUserByUsername } from "@/lib/auth-service"
import { ToggleOption } from "./_components/toggle-option"
import ErrorPage from "@/components/Globals/error"


const page = async ({ params }: { params: { username: string } }) => {

    const res = await getUserByUsername(params.username)

    if(!res || !res.success || !res.user || !res.user.Stream) {
        return (
         <ErrorPage />
        )
    }


    return (
        <div className="p-4 md:p-6">
            <div className="mb-4 md:mb-6">
                <h1 className="text-xl md:text-2xl font-bold">
                    Chat settings
                </h1>
            </div>
            <div className="space-y-4">
                <ToggleOption
                    field="isChatEnabled"
                    label="Enable chat"
                    value={res.user.Stream.isChatEnabled}
                />
                <ToggleOption
                    field="isChatDelayed"
                    label="Delay chat"
                    value={res.user.Stream.isChatDelayed}
                />
                <ToggleOption
                    field="isChatFollowersOnly"
                    label="Must be following to chat"
                    value={res.user.Stream.isChatFollowersOnly}
                />
            </div>
        </div>
    )
}

export default page