"use server"
import OpenAI from "openai"
import type { ChatCompletionMessageParam } from "openai/resources"
import { Destination, Tour } from "./types"

const opeani = new OpenAI({
    baseURL: "https://models.github.ai/inference",
    apiKey: process.env.OPENAI_API_KEY
})

export const generateChatResponse = async (chatMessages: ChatCompletionMessageParam[]) => {
    const response = await opeani.chat.completions.create({
        messages: [
            { role: "system", content: "Vous êtes un assistant aidant" },
            ...chatMessages
        ],
        model: "openai/gpt-4o",
        temperature: 0,
    })
    return response.choices[0].message
}


export const getExistingTour = async ({ city, country, tripType }: Destination) => {
    return null
}

export const generateTourResponse = async ({ city, country, tripType }: Destination) => {
    const query = `Trouve une ville appelée ${city} dans ce pays ${country}.
Si ${city} existe dans ce pays ${country}, crée un programme détaillé d’activités adaptées à un voyage de type "${tripType}".
Le programme doit couvrir une journée entière avec au moins 7 arrêts, incluant explicitement un arrêt pour le déjeuner et un arrêt pour le dîner.
La réponse doit respecter le format JSON suivant, sans aucun texte supplémentaire ni balises markdown :
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "tripType": "${tripType}",
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
        const response = await opeani.chat.completions.create({
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

export const createNewTour = async (tour: object) => {
    return null
}