import {
  findAllUsers,
  findUserById,
  deleteUser,
  deleteUserRoles,
  deleteUserProfile,
  updateUser,
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

export async function updateUserByIdService(id, data) {
  const user = await findUserById(id);
  if (!user) throw new Error("Kullanıcı bulunamadı");

  return await updateUser(id, data);
}

export async function updateOwnUserService(userId, data) {
  const user = await findUserById(userId);
  if (!user) throw new Error("Kullanıcı bulunamadı");

  return await updateUser(userId, data);
}
