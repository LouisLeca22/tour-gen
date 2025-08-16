import Link from "next/link"

const links = [
    { href: "/chat", label: "Chat" },
    { href: "/tours", label: "Excursions" },
    { href: "/tours/new-tour", label: "Nouvelle Excursion" },
    { href: "/profile", label: "Profil" }
]

function NavLinks() {
    return (
        <ul className='menu text-base-content w-auto'>
            {links.map((link) => {
                return (
                    <li key={link.href}>
                        <Link href={link.href} className='capitalize'>
                            {link.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    )
}
export default NavLinks