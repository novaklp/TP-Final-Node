import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model.js';

export const SECRET_KEY = process.env.JWT_SECRET || "clave_secreta_por_defecto";

export const authenticateToken = (req, res, next) => {
    // Obtener el token del header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Si existe el header, tomamos la segunda parte

    if (!token) {
        return res.status(401).json({ error: "Acceso denegado: Se requiere un token" });
    }

    // Verificar el token
    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido o expirado" });
        }

        try {
            // Verificar si el usuario sigue existiendo en la DB
            const userExists = await UserModel.findByUsername(decoded.username);

            if (!userExists) {
                return res.status(401).json({ error: "Usuario no válido o eliminado" });
            }

            // Si es válido, guardamos los datos del usuario en la petición y pasamos al siguiente
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(500).json({ error: "Error al verificar usuario" });
        }
    });
};
