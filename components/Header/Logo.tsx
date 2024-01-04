import Link from 'next/link'

interface props{
    isDashboard: boolean
}
const Logo = ({isDashboard}: props) => {
    return (
        <Link href="/">
            <div className="flex items-center gap-x-4 hover:opacity-75 transition">
                <div className="hidden md:inline">
                    <h2 className="text-lg lg:text-xl font-semibold">
                        Gammie
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        {isDashboard ? 'Creater Dashboard' : "Let's play"}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default Logo