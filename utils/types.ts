export type Destination = {
    city: string,
    country: string,
    tripType: TripType
}

export type Tour = {
    city: string,
    country: string,
    tripType: TripType
    title: string,
    description: string
    stops: string[]
}

enum TripType {
    Famille = "famille",
    Couple = "couple",
    Solo = "solo",
    Aventure = "aventure",
    Culturel = "culturel",
    Luxe = "luxe",
    Budget = "budget",
    Nature = "nature",
    BienEtre = "bien-être",
    Photographie = "photographie",
    Business = "business",
    Accessible = "accessible"
}