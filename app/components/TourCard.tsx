import { Tour } from "@prisma/client"
import Link from "next/link"

function TourCard({ tour }: { tour: Tour }) {
    return (
        <Link href={`/tours/${tour.id}`} className="card card-sm rounded-xl bg-base-100">
            <div className="card-body items-center text-center">
                <h2 className="card-title text-center">
                    {tour.title}
                </h2>
            </div>
        </Link>
    )
}
export default TourCard