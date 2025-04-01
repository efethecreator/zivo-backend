import {
    findAllUsers,
    findUserById,
    deleteUser,
    deleteUserRoles,
    deleteUserProfile,
  } from "../repositories/user.repository.js";
  
  export const getAllUsersService = () => findAllUsers();
  
  export const getUserByIdService = (id) => findUserById(id);
  
  export async function deleteUserByIdService(userId) {
    const existingUser = await findUserById(userId);
    if (!existingUser) {
      throw new Error("Kullanıcı bulunamadı");
    }
  
    await deleteUserRoles(userId);
    await deleteUserProfile(userId);
    await deleteUser(userId);
  
    return { message: "Kullanıcı başarıyla silindi" };
  }
  