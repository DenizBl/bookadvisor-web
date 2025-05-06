import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile // Profil güncelleme için
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Firestore'a yazmak için
import { auth, db } from '../firebase';

// Kayıt Olma
export const signUp = async (email, password, displayName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Firebase Auth profilini güncelle (isteğe bağlı ama önerilir)
        await updateProfile(user, { displayName: displayName });

        // Firestore'da kullanıcı dokümanı oluştur (varsayılan rol ile)
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
            uid: user.uid,
            email: user.email,
            displayName: displayName,
            role: 'member', // Yeni kullanıcılar varsayılan olarak 'member' olsun
            createdAt: new Date() // Kayıt tarihini ekle
        });

        return user;
    } catch (error) {
        console.error("Kayıt olma hatası:", error);
        throw error; // Hata yönetimi için hatayı tekrar fırlat
    }
};

// Giriş Yapma
export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Giriş yapma hatası:", error);
        throw error;
    }
};

// Çıkış Yapma
export const logOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Çıkış yapma hatası:", error);
        throw error;
    }
};