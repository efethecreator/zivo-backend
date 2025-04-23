import {
    createBusinessContact,
    getContactsByBusinessId,
    updateBusinessContact,
    softDeleteBusinessContact,
  } from "../repositories/businessContact.repository.js";
  
  export const addContactService = async (data) => await createBusinessContact(data);
  
  export const getContactsService = async (businessId) =>
    await getContactsByBusinessId(businessId);
  
  export const updateContactService = async (id, data) =>
    await updateBusinessContact(id, data);
  
  export const deleteContactService = async (id, deletedBy) =>
    await softDeleteBusinessContact(id, deletedBy);
  