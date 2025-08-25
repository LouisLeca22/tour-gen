"use client"

import { getAllTours } from "@/utils/action"
import { useQuery } from "@tanstack/react-query"
import ToursList from "./ToursList"
import { useState } from "react"

function ToursPage() {
    const [searchValue, setSearchValue] = useState("")
    const { data, isPending } = useQuery({
        queryKey: ['tours', searchValue],
        queryFn: () => getAllTours(searchValue)
    })
    return (
        <>
            <form className="max-w-lg mb-12">
                <div className="join w-full">
                    <input type="text" required placeholder="Entrer une ville ou un pays..." className="input input-bordered join-item w-full" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    <button className="btn btn-primary join-item" type="button" disabled={isPending} onClick={() => setSearchValue("")}>
                        {isPending ? "Patientez..." : "réinitialiser"}
                    </button>
                </div>
            </form>
            {isPending ? <span className="loading"></span> : <ToursList data={data} />}
        </>
    )
}
export default ToursPage