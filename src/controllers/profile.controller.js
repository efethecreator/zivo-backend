import { updateProfileService } from "../services/profile.service.js";
import { uploadToS3 } from "../services/uploadService.js";

export async function updateProfile(req, res) {
  const userId = req.user.userId;
  const profileData = req.body;

  try {
    // 🖼 Görsel varsa S3'e yükle
    if (req.file) {
      const imageUrl = await uploadToS3(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );
      profileData.photoUrl = imageUrl;
    }

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
