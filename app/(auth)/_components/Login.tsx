"use client"
import { signIn } from 'next-auth/react'
import { useState, FormEvent, ChangeEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { isEmail, isValidPassword } from '@/lib/utils'
import { Loader2, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

const Login = () => {
    const router = useRouter()
    const [isLoad, setIsLoad] = useState(false)

    const [Credential, setCredential] = useState({ email: '', password: "" })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredential({ ...Credential, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!isEmail(Credential.email)) {
            toast.error("Please enter a valid email.")
            return;
        }
        if (!isValidPassword(Credential.password)) {
            toast.error("Password should be 8 charcter long.")
            return;
        }
        try {
            setIsLoad(true)
            const res = await signIn("Credentials", {
                redirect: false,
                email: Credential.email,
                password: Credential.password
            })
            if (res?.ok) {
                toast.success("Successfully login !!")
                router.replace('/')
            } else {
                toast.error(res?.error || '')
            }
        } catch (error: any) {
            toast.error("Server error please try again letter!")
        } finally {
            setIsLoad(false)
        }
    }

    return (
        <div className='auth-form flex flex-col gap-4 lg:gap-6'>
            <h4 className='text-xl font-bold text-center'>Welcome, Sign In</h4>
            <div className='flex items-baseline gap-4'>
                <span className='flex-1 h-[1.5px] bg-gray-300'></span>
                <p className='text-base'>or</p>
                <span className='flex-1 h-[1.5px] bg-gray-300'></span>
            </div>
            <form className='grid w-full gap-4' onSubmit={(e) => handleSubmit(e)}>
                <Input type="email" name="email" value={Credential.email} placeholder='example@gmail.com' onChange={handleChange} required />
                <Input type="password" value={Credential.password} name="password" placeholder='password...' onChange={handleChange} required minLength={8} />
                <Button variant='primary' type='submit' className='gap-2' disabled={isLoad}>
                    {isLoad ? (
                        <Loader2 className='w-5 h-5 text-gray-200 animate-spin' />
                    ) : <LogIn className='w-5 h-5 text-gray-200' />}
                    {isLoad ? "Processing..." : 'SIGN IN'}
                </Button>
            </form>
            <div className='flex justify-end'>
                <Button asChild variant='link' size='sm' className='text-muted-foreground h-auto' >
                    <Link href='/reset-password-request'>Forget password?</Link>
                </Button>
            </div>
            <p className='text-gray-400 text-center text-sm'>Don't have an account? 
                <Button asChild variant='link' size='sm' className='text-muted-foreground h-auto' >
                    <Link href='/sign-up'>Create Account?</Link>
                </Button>
            </p>
        </div>

    )
}

export default Login