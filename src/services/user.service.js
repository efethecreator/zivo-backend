import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsersService = async () => {
    return prisma.user.findMany();
    }

export const getUserByIdService = async (id) => {
        const userId = parseInt(id, 10); 
        return prisma.user.findUnique({
            where: {
                id: userId
            }
        });
    }

export const createUserService = async (data) => {
    return prisma.user.create({
        data: {
            ...data
        }
    });
}

export const updateUserService = async (id, data) => {
    const userId = parseInt(id, 10);
    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            ...data
        }
    });
}

export const deleteUserService = async (id) => {
    const userId = parseInt(id, 10);
    return prisma.user.delete({
        where: {
            id: userId
        }
    });
}
