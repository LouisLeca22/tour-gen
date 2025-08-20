"use server"
import OpenAI from "openai"
import prisma from './db';

import type { ChatCompletionMessageParam } from "openai/resources"
import { Destination, Tour } from "./types"

const openai = new OpenAI({
    baseURL: "https://models.github.ai/inference",
    apiKey: process.env.OPENAI_API_KEY
})

export const generateChatResponse = async (chatMessages: ChatCompletionMessageParam[]) => {
    const response = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "Vous êtes un assistant aidant" },
            ...chatMessages
        ],
        model: "openai/gpt-4o",
        temperature: 0,
    })
    return response.choices[0].message
}


export const getExistingTour = async ({ city, country, tourType }: Destination) => {
    return prisma.tour.findUnique({
        where: {
            city_country_tourType: {
                city, country, tourType
            }
        }
    })
}

export const generateTourResponse = async ({ city, country, tourType }: Destination) => {
    const query = `Trouve une ville appelée ${city} dans ce pays ${country}.
Si ${city} existe dans ce pays ${country}, crée un programme détaillé d’activités adaptées à un voyage de type "${tourType}".
Le programme doit couvrir une journée entière avec au moins 7 arrêts, incluant explicitement un arrêt pour le déjeuner et un arrêt pour le dîner.
La réponse doit respecter le format JSON suivant, sans aucun texte supplémentaire ni balises markdown :
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "tourType": "${tourType}",
    "title": "titre du circuit",
    "description": "description de la ville et du circuit adapté au type de voyage",
    "stops": [
      "court paragraphe sur l’arrêt 1 (matin)",
      "court paragraphe sur l’arrêt 2",
      "court paragraphe sur l’arrêt 3",
      "court paragraphe sur l’arrêt 4 (déjeuner inclus)",
      "court paragraphe sur l’arrêt 5",
      "court paragraphe sur l’arrêt 6",
      "court paragraphe sur l’arrêt 7 (dîner inclus)"
    ]
  }
}
Si tu ne trouves aucune information précise sur ${city}, ou si ${city} n’existe pas, ou si sa population est inférieure à 1,
ou si elle n’est pas située dans ${country}, retourne { "tour": null }, sans caractères supplémentaires.`;


    try {
        const response = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: "Tu es un guide touristique" },
                { role: 'user', content: query }
            ],
            model: "openai/gpt-4o",
            temperature: 0,
            response_format: { type: "json_object" }
        })
        const tourData = JSON.parse(response.choices[0].message.content!)
        if (!tourData.tour) {
            return null
        }

        return tourData.tour as Tour
    } catch (error) {
        console.log(error)
        return null
    }
}

export const createNewTour = async (tour: Tour) => {
    const today = new Date().toISOString().split("T")[0]

    const toursToday = await prisma.tour.count({
        where: {
            createdAt: {
                gte: new Date(today),
                lt: new Date(new Date(today).getTime() + 24 * 60 * 60 * 1000), // tomorrow 00:00
            },
        },
    })
    if (toursToday >= 5) {
        throw new Error("Vous avez déjà créé 5 excursions aujourd'hui")
    }

    return prisma.tour.create({
        data: tour
    })
}

export const getAllTours = async (searchTerm: string) => {
    if (!searchTerm) {
        const tours = await prisma.tour.findMany({
            orderBy: {
                city: 'asc'
            }
        })
        return tours
    }
    const tours = await prisma.tour.findMany({
        where: {
            OR: [
                {
                    city: {
                        contains: searchTerm
                    }
                },
                {
                    country: {
                        contains: searchTerm
                    }
                }
            ]
        },
        orderBy: {
            city: "asc"
        }
    })
    return tours
}


export const getSingleTour = async (id: string) => {
    return prisma.tour.findUnique({
        where: {
            id
        }
    })
}

