import {
    addContactService,
    getContactsService,
    updateContactService,
    deleteContactService,
  } from "../services/businessContact.service.js";
  
  export const createBusinessContactController = async (req, res) => {
    try {
      const data = {
        businessId: req.body.businessId,
        contactName: req.body.contactName,
        contactValue: req.body.contactValue,
      };
      const created = await addContactService(data);
      res.status(201).json(created);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const getBusinessContactsController = async (req, res) => {
    try {
      const contacts = await getContactsService(req.params.businessId);
      res.json(contacts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const updateBusinessContactController = async (req, res) => {
    try {
      const updated = await updateContactService(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const deleteBusinessContactController = async (req, res) => {
    try {
      await deleteContactService(req.params.id, req.user.userId);
      res.json({ message: "İletişim bilgisi silindi" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  