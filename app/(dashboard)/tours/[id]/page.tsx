import TourInfo from "@/app/components/TourInfo"
import { getSingleTour } from "@/utils/action"
import Link from "next/link"
import { redirect } from "next/navigation"

async function SingleTourPage({ params }: { params: { id: string } }) {
    const tour = await getSingleTour(params.id)
    if (!tour) {
        redirect('/tours')
    }
    return (
        <div>
            <Link href="/tours" className="btn btn-secondary mb-12">
                Retour
            </Link>
            <TourInfo tour={{ ...tour, stops: tour.stops as string[] }} />
        </div>
    )
}
export default SingleTourPage