import { createViewerToken } from "@/actions/token"
import { useEffect, useState } from "react"
import { JwtPayload, jwtDecode } from "jwt-decode";
import { toast } from "sonner"

export const useViewerToken = (hostId: string) => {
    
    const [token, setToken] = useState('')
    const [name, setName] = useState('')
    const [identity, setIdentity] = useState('')
    const [isLoad, setIsLoad] = useState(true)

    useEffect(() => {

        const createToken = async () =>{
            try {
                const viewerToken = await createViewerToken(hostId)
                setToken(viewerToken)
                const decodedToken = jwtDecode(viewerToken) as JwtPayload & { name?: string }
                if(!decodedToken){
                    toast.error("Something went wrong!")
                }
                if(decodedToken){
                    setName(decodedToken.name || '')
                    setIdentity(decodedToken.jti || '')
                }
            } catch (error) {
                toast.error("Something went wrong")
            }finally{
                setIsLoad(false)
            }
        }

        createToken()

    }, [hostId])

    return {
        token,
        name,
        identity,
        isLoad
    }
}