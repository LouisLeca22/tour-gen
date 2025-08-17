import { TourType } from "@prisma/client"

export type Destination = {
    city: string,
    country: string,
    tourType: TourType
}

export type Tour = {
    city: string,
    country: string,
    tourType: TourType
    title: string,
    description: string
    stops: string[]
}

