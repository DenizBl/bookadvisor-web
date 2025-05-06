import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

const commentsCollectionRef = collection(db, 'comments'); // 'comments' koleksiyonu

// Belirli Bir Kitabın Yorumlarını Getir
export const getCommentsForBook = async (bookId) => {
    try {
        // createdAt'a göre eskiden yeniye sırala
        const q = query(
            commentsCollectionRef,
            where('bookId', '==', bookId),
            orderBy('createdAt', 'asc')
        );
        const data = await getDocs(q);
        return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
        console.error("Yorumlar getirilirken hata:", error);
        throw error;
    }
};

// Yeni Yorum Ekle (Member)
export const addComment = async (commentData) => {
    // commentData = { bookId: '...', userId: '...', userName: '...', text: '...' }
    try {
        const docRef = await addDoc(commentsCollectionRef, {
            ...commentData,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error("Yorum eklenirken hata:", error);
        throw error;
    }
};