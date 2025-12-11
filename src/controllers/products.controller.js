
import * as productsServices from '../services/products.services.js';
import { productSchema } from '../schemas/validation.schemas.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await productsServices.getAllProd();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Error interno al obtener productos" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const products = await productsServices.getProdById(id);
        if (products) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno al buscar el producto" });
    }
};

export const createProduct = async (req, res) => {
    try {
        // Validación con Zod
        const validation = productSchema.safeParse(req.body);

        if (!validation.success) {
            // Si falla, devolvemos los errores formateados
            return res.status(400).json({
                error: "Datos inválidos",
                details: validation.error.errors.map(e => e.message)
            });
        }

        // Si pasa, usamos los datos validados (validation.data)
        const { nombre, precio } = validation.data;

        const newProducts = await productsServices.createProd({
            nombre,
            precio
        });
        res.status(201).json(newProducts);
    } catch (error) {
        res.status(500).json({ error: "Error interno al crear el producto" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, precio } = req.body;
        if (!nombre || !precio) {
            return res.status(400).json({ error: "Faltan datos" });
        }
        const updatedProduct = await productsServices.updateProd(id, { nombre, precio });
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno al actualizar el producto" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await productsServices.deleteProd(id);
        if (deletedProduct) {
            res.status(200).json(deletedProduct);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno al eliminar el producto" });
    }
};

