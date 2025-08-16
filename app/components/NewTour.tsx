"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getExistingTour, generateTourResponse, createNewTour } from "@/utils/action"
import TourInfo from "./TourInfo"
import toast from "react-hot-toast"
import type { Destination, Tour } from "@/utils/types"


function NewTour() {

    const { mutate, isPending, data: tour } = useMutation<
        Tour | null,
        Error,
        Destination
    >

        ({
            mutationFn: async (destination) => {
                const newTour = await generateTourResponse(destination)
                if (newTour) {
                    return newTour
                }

                toast.error("Aucune ville trouvée...")
                return null
            }
        })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const destination = Object.fromEntries(formData.entries()) as Destination
        mutate(destination)
    }

    if (isPending) {
        return <span className="loading loading-lg"></span>
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-2xl">
                <h2 className="mb-4">Choisissez votre destination</h2>
                <div className="join w-full">
                    <input type="text" className="input input-bordered join-item w-full" placeholder="Ville" name="city" required />
                    <input type="text" className="input input-bordered join-item w-full" placeholder="Pays" name="country" required />
                    <select
                        className="select join-item select-bordered w-full text-gray-400"
                        name="tripType"
                        required
                        defaultValue=""
                    >
                        <option value="" disabled >Type de voyage</option>
                        <option value="famille">Famille</option>
                        <option value="couple">En couple</option>
                        <option value="solo">Solo</option>
                        <option value="aventure">Aventure</option>
                        <option value="culturel">Culturel</option>
                        <option value="luxe">Luxe</option>
                        <option value="budget">Budget</option>
                        <option value="nature">Nature</option>
                        <option value="bien-être">Bien-être</option>
                        <option value="photographie">Photographie</option>
                        <option value="business">Business</option>
                        <option value="accessible">Accessible</option>
                    </select>
                    <button className="btn btn-primary text-white join-item" type="submit">Générer votre excursion</button>
                </div>
            </form>
            <div className="mt-16">
                {tour ? <TourInfo tour={tour} /> : null}
            </div>
        </>
    )
}
export default NewTour