import { ProductModel } from '../models/product.model.js';

export const getAllProd = async () => {
    return await ProductModel.findAll();
};

export const getProdById = async (id) => {
    return await ProductModel.findById(id);
};

export const createProd = async (productData) => {
    // Aquí podrías agregar lógica de negocio extra antes de guardar
    // Ej: Calcular impuestos, validar stock externo, etc.
    return await ProductModel.create(productData);
};

export const updateProd = async (id, productData) => {
    return await ProductModel.update(id, productData);
};

export const deleteProd = async (id) => {
    return await ProductModel.delete(id);
};
