import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    serverTimestamp // Sunucu zaman damgası için
} from 'firebase/firestore';
import { db } from '../firebase';

const booksCollectionRef = collection(db, 'books'); // 'books' koleksiyonuna referans

// Tüm Kitapları Getir
export const getAllBooks = async () => {
    try {
        // createdAt alanına göre tersten sırala (en yeni en üstte)
        const q = query(booksCollectionRef, orderBy('createdAt', 'desc'));
        const data = await getDocs(q);
        return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
        console.error("Kitaplar getirilirken hata:", error);
        throw error;
    }
};

// Tek Bir Kitabı Getir
export const getBookById = async (id) => {
    try {
        const bookDocRef = doc(db, 'books', id);
        const docSnap = await getDoc(bookDocRef);
        if (docSnap.exists()) {
            return { ...docSnap.data(), id: docSnap.id };
        } else {
            throw new Error("Kitap bulunamadı");
        }
    } catch (error) {
        console.error("Kitap getirilirken hata:", error);
        throw error;
    }
};

// Yeni Kitap Ekle (Admin)
export const addBook = async (bookData) => {
    try {
        // bookData = { title: '...', description: '...', targetAudience: '...', author: '...' }
        const docRef = await addDoc(booksCollectionRef, {
            ...bookData,
            createdAt: serverTimestamp(), // Sunucu zamanını kullan
            updatedAt: serverTimestamp()
        });
        return docRef.id; // Eklenen kitabın ID'sini döndür
    } catch (error) {
        console.error("Kitap eklenirken hata:", error);
        throw error;
    }
};

// Kitap Güncelle (Admin)
export const updateBook = async (id, updatedData) => {
    try {
        const bookDocRef = doc(db, 'books', id);
        await updateDoc(bookDocRef, {
            ...updatedData,
            updatedAt: serverTimestamp() // Güncelleme zamanını ayarla
        });
    } catch (error) {
        console.error("Kitap güncellenirken hata:", error);
        throw error;
    }
};

// Kitap Sil (Admin)
export const deleteBook = async (id) => {
    try {
        const bookDocRef = doc(db, 'books', id);
        await deleteDoc(bookDocRef);
        // İlişkili yorumları da silmek isteyebilirsiniz (daha karmaşık)
    } catch (error) {
        console.error("Kitap silinirken hata:", error);
        throw error;
    }
};