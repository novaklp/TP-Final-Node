import 'dotenv/config';
import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';

import productsRouter from './src/routes/products.router.js';
import authRouter from './src/routes/auth.router.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Ruta de Bienvenida (Pública)
app.get('/', (req, res) => {
    res.json({
        message: "¡Bienvenido a la API de Productos! 🚀",
        docs: "Visita el repositorio para ver la documentación",
        endpoints: {
            products: "/api/products",
            auth: "/auth/login"
        }
    });
});

app.use('/api', productsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
    res.status(404).json({ error: "Recurso no Encontrado" });
});

// Middleware Global de Manejo de Errores
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: "JSON inválido o mal formado" });
    }
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
});

const port = 4000;

app.listen(port, () => {
    console.log(`http://localhost:${port}`);

});
