import {
    getAllUsersService,
    getUserByIdService,
    deleteUserByIdService,
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
  