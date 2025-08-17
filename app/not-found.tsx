import Link from "next/link"
import { SiOpenaigym } from "react-icons/si"


function NotFound() {
    return (
        <div className="hero min-h-screen bg-base-200">

            <div className="hero-content text-center">

                <div className="max-w-md">

                    <SiOpenaigym className='w-30 h-30 text-primary mx-auto mb-8' />
                    <h1 className="text-6xl font-bold text-primary">
                        Page non trouvée
                    </h1>
                    <p className="py-6 text-lg leading-loose">
                        Cette page n&apos;existe pas
                    </p>

                    <Link href='/chat' className="btn btn-secondary">
                        Commencer
                    </Link>

                </div>
            </div>
        </div>
    )
}
export default NotFound