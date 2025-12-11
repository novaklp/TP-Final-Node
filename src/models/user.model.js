import { db } from '../config/firebase.js';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';

const USERS_COLLECTION = 'users';

export const UserModel = {
    // Buscar usuario por nombre de usuario 
    findByUsername: async (username) => {
        const q = query(collection(db, USERS_COLLECTION), where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        // Retornamos el primer usuario encontrado 
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    },

    // Crear nuevo usuario
    create: async (userData) => {
        const docRef = await addDoc(collection(db, USERS_COLLECTION), userData);
        return { id: docRef.id, ...userData };
    }
};
