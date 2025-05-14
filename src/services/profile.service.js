import {
    findProfileByUserId,
    updateProfileByUserId,
  } from "../repositories/profile.repository.js";
  
  export async function updateProfileService(userId, data) {
    const profile = await findProfileByUserId(userId);
  
    if (!profile) {
      const error = new Error("Profil bulunamadı.");
      error.status = 404;
      throw error;
    }
  
    return await updateProfileByUserId(userId, data);
  }
  