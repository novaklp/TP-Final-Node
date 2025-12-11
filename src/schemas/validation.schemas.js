import { z } from 'zod';

// Validar Producto
export const productSchema = z.object({
    nombre: z.string({
        required_error: "El nombre es obligatorio",
        invalid_type_error: "El nombre debe ser un texto"
    }).min(3, "El nombre debe tener al menos 3 caracteres"),

    precio: z.number({
        required_error: "El precio es obligatorio",
        invalid_type_error: "El precio debe ser un número"
    }).positive("El precio debe ser mayor a 0"),

    category: z.array(z.string()).optional(),
    stock: z.number().int().positive().optional()
});

// Validar Login
export const loginSchema = z.object({
    username: z.string().min(1, "El usuario es obligatorio"),
    password: z.string().min(1, "La contraseña es obligatoria")
});

// Validar Registro
export const registerSchema = z.object({
    username: z.string({ required_error: "El usuario es requerido" })
        .min(3, "El usuario debe tener al menos 3 caracteres"),

    email: z.string({ required_error: "El email es requerido" })
        .email("Debe ser un email válido (ej: usuario@mail.com)"),

    password: z.string({ required_error: "La contraseña es requerida" })
        .min(6, "La contraseña debe tener al menos 6 caracteres")
});
