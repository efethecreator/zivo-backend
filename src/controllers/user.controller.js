import {
  getAllUsersService,
  getUserByIdService,
  deleteUserByIdService,
  updateUserByIdService,
  updateOwnUserService,
} from "../services/user.service.js";

export async function getAllUsers(req, res) {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Kullanıcılar alınamadı" });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı alınamadı" });
  }
}

export async function deleteUserById(req, res) {
  try {
    await deleteUserByIdService(req.params.id);
    res.status(200).json({ message: "Kullanıcı silindi" });
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı silinemedi" });
  }
}

export async function updateUserById(req, res) {
  try {
    const updated = await updateUserByIdService(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı güncellenemedi" });
  }
}

export async function updateOwnUser(req, res) {
  try {
    const updated = await updateOwnUserService(req.user.userId, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Bilgiler güncellenemedi" });
  }
}
