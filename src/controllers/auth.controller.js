// src/controllers/auth.controller.js
import {
  registerUser,
  loginUser,
  getMeById,
} from "../services/auth.service.js";

export async function register(req, res) {
  const { fullName, email, password, userType } = req.body;
  try {
    const user = await registerUser({ fullName, email, password, userType });
    res.status(201).json({ message: "Kayıt başarılı", user });
  } catch (err) {
    console.error("Register error:", err);
    res.status(400).json({ message: err.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(400).json({ message: err.message });
  }
}

export async function getMe(req, res) {
  try {
    const user = await getMeById(req.user.userId);
    res.status(200).json(user);
  } catch (err) {
    console.error("GET /me error:", err);
    res.status(404).json({ message: err.message });
  }
}
