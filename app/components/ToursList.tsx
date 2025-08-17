import { Tour as PrismaTour } from "@prisma/client"
import TourCard from "./TourCard"

function ToursList({ data }: { data: PrismaTour[] | undefined }) {
    if (!data || data.length === 0) return <h4 className="text-lg">Vous n&paos;avez pas encore enregistré de tours...</h4>
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {data.map((tour) => {
                return <TourCard key={tour.id} tour={tour} />
            })}
        </div>
    )
}
export default ToursList