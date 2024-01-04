"use client"
import { useState, FormEvent, ChangeEvent } from 'react'
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import { Info, Loader2 } from 'lucide-react'
import { resetPassUser } from '@/actions/User'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { isValidPassword } from '@/lib/utils'
import { toast } from 'sonner'
import { signOut } from 'next-auth/react'

interface props {
    id: string,
    token: string
}
const Newpass = ({ id, token }: props) => {
    const router = useRouter()
    const [isLoad, setIsLoad] = useState(false)
    const [password, setPassword] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!isValidPassword(password)) {
           toast.error('Invalid password!')
            return;
        }
        try {
            setIsLoad(true)
            const res = await resetPassUser(id, token, password)
            if (res && res.success) {
                toast.success(res.message)
                signOut()
                router.replace('/sign-in')
            } else {
                toast.error(res.message)
            }
        } catch (error: any) {
            toast.error("Server error please try again letter!")
        } finally {
            setIsLoad(false)
        }
    }

    if (!id || !token) {
        return notFound()
    }

    return (
        <div className='auth-form flex flex-col gap-4 lg:gap-6'>
            <h4 className='text-xl font-bold text-center'>Reset password</h4>
            <div className='flex items-baseline gap-4'>
                <span className='flex-1 h-[1.5px] bg-gray-300'></span>
                <p className='text-base'>or</p>
                <span className='flex-1 h-[1.5px] bg-gray-300'></span>
            </div>
            <form className='grid w-full gap-4' onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <Input type="password" name="password" value={password} className='form-input' placeholder='Enter new password..' onChange={handleChange} required minLength={8} />
                    <div className="flex items-center gap-2 text-muted-foreground ml-2 mt-2">
                        <Info className='w-4 h-4' />
                        <p className='text-[10px]'>Contain: 1 unique charcter, 1 lowercase, 1 uppercase and 8-30 charcter range</p>
                    </div>
                </div>
                <Button variant='primary' type='submit' className='gap-2' disabled={isLoad}>
                    {isLoad && (
                        <Loader2 className='w-5 h-5 text-gray-200 animate-spin' />
                    )}
                    {isLoad ? "Processing..." : 'Change password'}
                </Button>
            </form>
            <p className='text-gray-400 text-center text-sm'>Don&apos;t have an account?
                <Button asChild variant='link' size='sm' className='text-muted-foreground h-auto' >
                    <Link href='/sign-up'>Create Account?</Link>
                </Button>
            </p>
        </div>

    )
}

export default Newpass