import { updateProfileService } from "../services/profile.service.js";

export async function updateProfile(req, res) {
  const userId = req.user.userId;
  const profileData = req.body;

  try {
    const updatedProfile = await updateProfileService(userId, profileData);
    res.status(200).json({
      message: "Profil güncellendi ✅",
      profile: updatedProfile,
    });
  } catch (err) {
    console.error("Profil güncelleme hatası:", err);
    res.status(err.status || 500).json({ message: err.message });
  }
}
