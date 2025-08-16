import MemberProfile from "./MemberProfile"
import NavLinks from "./NavLinks"
import SidebarHeader from "./SidebarHeader"

function Sidebar() {
    return (
        <div className='px-4 w-80 min-h-full bg-base-300 py-12 grid grid-rows-[auto_1fr_auto]'>
            <SidebarHeader />
            <NavLinks />
            <MemberProfile />
        </div>
    )
}
export default Sidebar