import bcrypt from 'bcrypt';

// Simulamos una Base de Datos de usuarios
// En la vida real, esto vendría de MongoDB o MySQL
// La contraseña aquí YA ESTÁ ENCRIPTADA (es el hash de "1234")
const usersDB = [
    {
        username: "admin",
        password: "$2b$10$P8.uYjV.x.M.x.M.x.M.x.M.x.M.x.M.x.M.x.M.x.M.x.M.x.M" // Esto es un ejemplo, generaremos uno real ahora
    }
];

// Función auxiliar para encriptar (Solo para que veas cómo se hace, normalmente se usa al Registrarse)
export const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Función auxiliar para comparar
export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
