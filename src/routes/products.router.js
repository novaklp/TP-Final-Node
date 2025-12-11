import express from 'express';
const router = express.Router();


import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/products.controller.js';

import { authenticateToken } from '../middlewares/auth.middleware.js';

// Rutas Privadas 
router.get('/products', authenticateToken, getAllProducts);

router.get('/products/:id', authenticateToken, getProductById);


router.post('/products/create', authenticateToken, createProduct);

router.put('/products/:id', authenticateToken, updateProduct);

router.delete('/products/:id', authenticateToken, deleteProduct);



export default router;



