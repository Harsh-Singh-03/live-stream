import { getUserByUsername } from "@/lib/auth-service"
import { UrlCard } from "./_components/url-card"
import { KeyCard } from "./_components/key-card"
import { GenerateModal } from "./_components/generate-modal"
import ErrorPage from "@/components/Globals/error"

const page = async ({params}: {params: {username: string}}) => {

    const res = await getUserByUsername(params.username, true)

    if( !res || !res.success || !res.user || !res.user.Stream ) {
        return (
         <ErrorPage />
        )
    }

    return (
        <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-6">
                <h1 className="text-xl md:text-2xl font-bold">
                    Keys & URLs
                </h1>
                <GenerateModal email={res.user.email} isEmailVerified={res.user.isEmailVerified} />
            </div>
            <div className="space-y-4">
                <UrlCard value={res.user.Stream.serverUrl} />
                <KeyCard value={res.user.Stream.streamKey} />
            </div>
        </div>
    )
}

export default page