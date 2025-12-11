import { db } from '../config/firebase.js';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const PRODUCTS_COLLECTION = 'products';

export const ProductModel = {
    findAll: async () => {
        const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
        // Transformamos el formato raro de Firebase a un array normal de objetos
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    },

    findById: async (id) => {
        const docRef = doc(db, PRODUCTS_COLLECTION, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            return null;
        }
    },

    create: async (data) => {
        // Firebase genera el ID automáticamente
        const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), data);
        return { id: docRef.id, ...data };
    },

    update: async (id, data) => {
        const docRef = doc(db, PRODUCTS_COLLECTION, id);
        // Primero verificamos si existe (opcional, pero buena práctica)
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return null;

        await updateDoc(docRef, data);
        return { id, ...data };
    },

    delete: async (id) => {
        const docRef = doc(db, PRODUCTS_COLLECTION, id);
        // Verificamos si existe antes de borrar para devolver el objeto borrado (o null)
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return null;

        await deleteDoc(docRef);
        return { id: docSnap.id, ...docSnap.data() };
    }
};
