"use client";

import { toast } from "sonner";
import { useState, useTransition, useRef, ElementRef } from "react";
import { AlertTriangle, KeyRound, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IngressInput } from "livekit-server-sdk";
import { createIngress } from "@/actions/ingress";
import { isEmail } from "@/lib/utils";
import { verifyEmail } from "@/actions/User";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;
interface props {
    isEmailVerified: boolean
    email: string
}
export const GenerateModal = ({ isEmailVerified, email }: props) => {
    const [isPending, startTransition] = useTransition()
    const closeRef = useRef<ElementRef<"button">>(null);
    const [ingressType, setIngressType] = useState<IngressType>(RTMP);

    const onSubmit = () => {
        if(!isEmailVerified){
            toast.error("Please verify your email first to continue!")
            return;
        }
        startTransition(() => {
            createIngress(parseInt(ingressType))
                .then(() => {
                    toast.success("Ingress created");
                    closeRef?.current?.click();
                })
                .catch((err) => {
                    console.log(err)
                    toast.error("Something went wrong")
                });
        });
    }

    const verificationReq = async () => {
        if (!email || !isEmail(email)) {
            return;
        }
        startTransition(() => {
            verifyEmail(email)
            .then((res) => {
                if (res && res.success) {
                    toast.success(res.message)
                } else {
                    toast.error(res.message)
                }
            })
            .catch(() => {
                toast.error("Something went wrong!")
            })
        })
    }

    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button variant="primary" className="w-full md:w-auto">
                    Generate connection
                </Button>
            </DialogTrigger>

            <DialogContent>

                <DialogHeader>
                    <DialogTitle>Generate connection</DialogTitle>
                </DialogHeader>

                <Select
                    disabled={isPending}
                    value={ingressType}
                    onValueChange={(value) => setIngressType(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ingress Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={RTMP}>RTMP</SelectItem>
                        <SelectItem value={WHIP}>WHIP</SelectItem>
                    </SelectContent>
                </Select>
                {!isEmailVerified && (
                    <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Warning!</AlertTitle>
                        <AlertDescription>
                           Please Verifiy your email to generate.
                        </AlertDescription>
                        <div className="mt-4 w-full grid place-items-end">
                            <Button size="sm" variant="secondary" disabled={isPending} className="ml-auto" onClick={verificationReq}>Verify</Button>
                        </div>
                    </Alert>
                )}
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        This action will reset all active streams using the current connection
                    </AlertDescription>
                </Alert>

                <div className="flex justify-between">
                    <DialogClose ref={closeRef} asChild>
                        <Button variant="ghost">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        variant="primary"
                        disabled={isPending}
                        className="gap-2"
                        onClick={onSubmit}
                    >
                        {isPending && isEmailVerified ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : <KeyRound className="w-4 h-4" />}
                        Generate
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}