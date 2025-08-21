import prisma from './db'
import { User } from '@prisma/client'

export async function createUser(data: User) {
    try {
        const user = await prisma.user.create({ data })
        return { user }
    } catch (error) {
        return { error }
    }
}

export async function getUserById({
    id,
    clerkId
}: {
    id?: string
    clerkId?: string
}) {
    try {
        if (!id && !clerkId) {
            throw new Error('id or clerkId is required')
        }

        const query = id ? { id } : { clerkId }

        const user = await prisma.user.findUnique({ where: query })
        return { user }
    } catch (error) {
        return { error }
    }
}

export async function updateUser(clerkId: string, data: Partial<User>) {
    try {
        if (!clerkId) {
            throw new Error('id or clerkId is required')
        }

        const user = await prisma.user.update({
            where: { clerkId },
            data
        })
        return { user }
    } catch (error) {
        return { error }
    }
}

export async function deleteUser(clerkId: string) {
    try {
        if (!clerkId) {
            throw new Error('id or clerkId is required')
        }

        const user = await prisma.user.delete({
            where: { clerkId }
        })
        return { user }
    } catch (error) {
        return { error }
    }
}