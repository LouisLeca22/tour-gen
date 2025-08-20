"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getExistingTour, generateTourResponse, createNewTour } from "@/utils/action"
import TourInfo from "./TourInfo"
import toast from "react-hot-toast"
import type { Destination, Tour } from "@/utils/types"


function NewTour() {
    const queryClient = useQueryClient()
    const { mutate, isPending, data: tour } = useMutation<
        Tour | null,
        Error,
        Destination
    >

        ({
            mutationFn: async (destination) => {

                const existingTour = await getExistingTour(destination)
                if (existingTour) {
                    return { ...existingTour, stops: existingTour.stops as string[] }
                }
                try {

                    const newTour = await generateTourResponse(destination)
                    if (newTour) {
                        await createNewTour(newTour)
                        queryClient.invalidateQueries({ queryKey: ['tours'] })
                        return newTour
                    }
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        toast.error(error.message)
                        return null
                    } else {
                        toast.error("Une erreur est survenue")
                        return null
                    }
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
                    <input type="text" className="input placeholder-black input-bordered join-item w-full" placeholder="Ville" name="city" required />
                    <input type="text" className="input placeholder-black input-bordered join-item w-full" placeholder="Pays" name="country" required />
                    <select
                        className="select join-item select-bordered w-full"
                        name="tourType"
                        required
                        defaultValue=""
                    >
                        <option value="" disabled >Type de voyage</option>
                        <option value="Famille">Famille</option>
                        <option value="Couple">En couple</option>
                        <option value="Solo">Solo</option>
                        <option value="Aventure">Aventure</option>
                        <option value="Culturel">Culturel</option>
                        <option value="Luxe">Luxe</option>
                        <option value="Budget">Budget</option>
                        <option value="Nature">Nature</option>
                        <option value="Bien-être">Bien-être</option>
                        <option value="Photographie">Photographie</option>
                        <option value="Business">Business</option>
                        <option value="Accessible">Accessible</option>
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