"use server"
import prisma from './db';
import { currentUser } from "@clerk/nextjs/server"
import { Destination, Tour } from "./types"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export type ChatMessage = {
    role: "user" | "model";
    content: string;
};



export const generateChatResponse = async (chatMessages: Array<{ role: string; content: string }>) => {
    // Map roles to Gemini standard ('user' and 'model')
    const formattedHistory = chatMessages.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: formattedHistory,
        config: {
            systemInstruction: "Vous êtes un assistant aidant",
            temperature: 0,
        },
    });

    return response.text;
};


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
Si tu ne trouves aucune information précise sur ${city}, ou si ${city} n’existe pas, ou si sa population est inférieure à 1,
ou si elle n’est pas située dans ${country}, retourne "tour": null.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: query,
            config: {
                systemInstruction: "Tu es un guide touristique",
                temperature: 0,
                responseMimeType: "application/json",
                // Strict schema definition guarantees the exact JSON structure returned
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        tour: {
                            type: Type.OBJECT,
                            nullable: true,
                            properties: {
                                city: { type: Type.STRING },
                                country: { type: Type.STRING },
                                tourType: { type: Type.STRING },
                                title: { type: Type.STRING },
                                description: { type: Type.STRING },
                                stops: {
                                    type: Type.ARRAY,
                                    items: { type: Type.STRING },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!response.text) return null;

        const tourData = JSON.parse(response.text);
        return (tourData.tour as Tour) || null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export type CreateNewTourActionResult =
    | { success: true; data: Tour }
    | { success: false; error: string }

export const createNewTour = async (tour: Tour): Promise<CreateNewTourActionResult> => {
    const today = new Date().toISOString().split("T")[0]
    const user = await currentUser()
    if (!user) {
        return {
            success: false,
            error: "L'utilisateur n'existe pas"
        }
    }
    const toursToday = await prisma.tour.count({
        where: {
            userId: user.id,
            createdAt: {
                gte: new Date(today),
                lt: new Date(new Date(today).getTime() + 24 * 60 * 60 * 1000), // tomorrow 00:00
            },
        },
    })
    if (toursToday >= 5) {
        return {
            success: false,
            error: "Vous avez déjà créé 5 excursions aujourd'hui"
        }
    }

    const created = await prisma.tour.create({
        data: { ...tour, userId: user.id }
    })

    const result: Tour = {
        city: created.city,
        country: created.country,
        tourType: created.tourType,
        title: created.title,
        description: created.description,
        stops: created.stops as string[],
    }

    return {
        success: true,
        data: result
    }
}

export const getAllTours = async (searchTerm: string) => {

    const user = await currentUser()

    if (!user) {
        return []
    }

    if (!searchTerm) {
        const tours = await prisma.tour.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                city: 'asc'
            }
        })
        return tours
    }
    const tours = await prisma.tour.findMany({
        where: {
            userId: user.id,
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



export const deleteTour = async (id: string) => {
    const user = await currentUser()

    if (!user) {
        throw new Error("Utilisateur non connecté")
    }

    const tour = await prisma.tour.findUnique({ where: { id } })

    if (!tour) {
        throw new Error("Cette excursion n'existe pas")
    }

    if (tour.userId !== user.id) {
        throw new Error("Vous n'avez pas l'autorisation de supprimer cette excursion")
    }

    await prisma.tour.delete({ where: { id } })

    revalidatePath("/tours")

    redirect("/tours")
}