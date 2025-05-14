import {
    createPortfolio,
    getPortfoliosByBusiness,
    updatePortfolio,
    softDeletePortfolio,
  } from "../repositories/portfolio.repository.js";
  
  export const addPortfolioItem = async (data) => await createPortfolio(data);
  
  export const getPortfolioList = async (businessId) =>
    await getPortfoliosByBusiness(businessId);
  
  export const updatePortfolioItem = async (id, data) =>
    await updatePortfolio(id, data);
  
  export const deletePortfolioItem = async (id, deletedBy) =>
    await softDeletePortfolio(id, deletedBy);
  