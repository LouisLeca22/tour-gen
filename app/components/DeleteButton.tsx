"use client"

import { deleteTour } from "@/utils/action"
import { useTransition } from "react"

type Props = {
    tourId: string
}

export default function DeleteTourButton({ tourId }: Props) {
    const [isPending, startTransition] = useTransition()

    return (
        <button
            onClick={() => startTransition(() => deleteTour(tourId))}
            className="btn btn-error"
            disabled={isPending}
        >
            {isPending ? "Suppression..." : "Supprimer cette excursion"}
        </button>
    )
}
