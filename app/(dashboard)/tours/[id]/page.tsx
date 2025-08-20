import TourInfo from "@/app/components/TourInfo"
import { getSingleTour } from "@/utils/action"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import axios from "axios"
const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

export default async function SingleTourPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const tour = await getSingleTour(id)
    if (!tour) {
        redirect('/tours')
    }

    const { data } = await axios(`${url}${tour.city}`)
    const tourImage = data?.results[0]?.urls?.raw
    return (
        <div>
            <Link href="/tours" className="btn btn-secondary mb-12">
                Retour
            </Link>
            {
                tourImage ? <div>
                    <Image src={tourImage} width={300} height={300} className="rounded-xl shadow-xl mb-16 h-96 w-96 object-cover" alt={tour.title} priority />
                </div> : null
            }
            <TourInfo tour={{ ...tour, stops: tour.stops as string[] }} />
        </div>
    )
}
