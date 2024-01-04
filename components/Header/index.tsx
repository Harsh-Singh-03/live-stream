import Actions from "./Actions"
import Logo from "./Logo"
import Search from "./Search"

interface userProps{
    id: string;
    email: string;
    username: string;
    name: string;
    image: string | null;
    bio: string | null;
    isEmailVerified: boolean;
}
interface props{
    isDashboard: boolean
    userData?: userProps
}
const Navbar = ({isDashboard, userData}: props) => {
    return (
        <nav className="fixed top-0 w-full h-16 z-40 bg-background2 px-2 lg:px-4 flex gap-x-2 justify-between items-center shadow-sm">
           <Logo isDashboard={isDashboard}/>
           {!isDashboard && (
               <Search />
           )}
           <Actions isDashboard={isDashboard} user={userData} />
        </nav>
    )
}

export default Navbar