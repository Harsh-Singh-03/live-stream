"use client"

import { verifyEmail } from "@/actions/User"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { isEmail } from "@/lib/utils"
import { AlertTriangle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface props {
    email: string,
}
export const AlertBox = ({ email }: props) => {

    const [isVerificationLoad, setIsVerificationLoad] = useState(false)

    const verificationReq = async () => {
        if (!email || !isEmail(email)) {
            return;
        }
        try {
            setIsVerificationLoad(true)
            const res = await verifyEmail(email)
            if (res && res.success) {
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }
        } catch (error: any) {
            toast.error("Something went wrong")
        } finally {
            setIsVerificationLoad(false)
        }
    }

    return (
        <Alert className="mb-4 md:mb-6 flex items-center justify-between">
            <div className="flex gap-3">
                <AlertTriangle className="h-4 w-4" />
                <div>
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription className="mt-1 text-muted-foreground">
                        Email is not verified yet!
                    </AlertDescription>
                </div>
            </div>
            <Button variant="primary" size="sm" disabled={isVerificationLoad} onClick={verificationReq}>
                Verify
            </Button>
        </Alert>
    )
}