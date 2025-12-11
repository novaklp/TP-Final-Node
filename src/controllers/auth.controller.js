import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../middlewares/auth.middleware.js';
import bcrypt from 'bcrypt';
import { loginSchema, registerSchema } from '../schemas/validation.schemas.js';
import { UserModel } from '../models/user.model.js';

export const register = async (req, res) => {
    try {
        // 1. Validación con Zod 
        const validation = registerSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                error: "Datos inválidos",
                details: validation.error.errors.map(e => e.message)
            });
        }

        const { username, email, password } = validation.data;

        // 2. Verificar si ya existe 
        const existingUser = await UserModel.findByUsername(username);
        if (existingUser) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }

        // 3. Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Guardar en Firebase 
        const newUser = await UserModel.create({
            username,
            email,
            password: hashedPassword,
            role: "user"
        });

        res.status(201).json({ message: "Usuario registrado exitosamente" });

    } catch (error) {
        res.status(500).json({ error: "Error al registrar usuario" });
    }
};

export const login = async (req, res) => {
    try {
        // Validación con Zod
        const validation = loginSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                error: "Datos inválidos",
                details: validation.error.errors.map(e => e.message)
            });
        }

        const { username, password } = validation.data;

        // 1. Buscar usuario REAL en Firebase
        const userFound = await UserModel.findByUsername(username);

        if (!userFound) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        // 2. Comparar contraseña (La que envía el usuario vs El Hash en Firebase)
        const isMatch = await bcrypt.compare(password, userFound.password);

        if (isMatch) {
            // Crear el payload
            const userForToken = {
                username: userFound.username,
                role: userFound.role,
                id: userFound.id
            };

            const token = jwt.sign(userForToken, SECRET_KEY, { expiresIn: '1h' });

            res.status(200).json({
                token: token,
                message: "Login exitoso"
            });

        } else {
            res.status(401).json({ error: "Credenciales inválidas" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno en el servidor" });
    }
};
