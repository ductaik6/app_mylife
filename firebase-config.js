/**
 * MyLife Dashboard - Firebase Configuration & Cloud Sync Module
 * Project: app-mylife-v1
 */

// Cấu hình Firebase SDK của bạn
const firebaseConfig = {
  apiKey: "AIzaSyCKyokKFdRYDw2O-kY5CJUg35x0O8W5wTQ",
  authDomain: "app-mylife-v1.firebaseapp.com",
  projectId: "app-mylife-v1",
  storageBucket: "app-mylife-v1.firebasestorage.app",
  messagingSenderId: "809536992286",
  appId: "1:809536992286:web:539bcda2f9a823b9de6a0f",
  measurementId: "G-Z9G7BV440L"
};

// Khởi tạo các dịch vụ Firebase
let fbApp = null;
let fbAuth = null;
let fbDb = null;
let fbAnalytics = null;

try {
  if (typeof firebase !== 'undefined') {
    fbApp = firebase.initializeApp(firebaseConfig);
    fbAuth = firebase.auth();
    fbDb = firebase.firestore();
    
    // Tự động kích hoạt lưu trữ offline trên Firestore để chạy mượt ngay cả khi mất mạng
    try {
      fbDb.enablePersistence({ synchronizeTabs: true }).catch(() => {});
    } catch (e) {}

    if (typeof firebase.analytics === 'function') {
      try { fbAnalytics = firebase.analytics(); } catch (e) {}
    }
    console.log('🔥 [Firebase] Đã kết nối thành công dự án: app-mylife-v1');
  } else {
    console.warn('⚠️ [Firebase] Thư viện SDK chưa được tải vào trang.');
  }
} catch (err) {
  console.warn('⚠️ [Firebase] Khởi tạo gặp sự cố:', err.message);
}

// Đối tượng tiện ích toàn cục MyLifeFirebase
window.MyLifeFirebase = {
  app: fbApp,
  auth: fbAuth,
  db: fbDb,
  analytics: fbAnalytics,
  isAvailable: () => !!fbAuth,

  /**
   * 1. Đăng nhập trực tiếp bằng Google Popup chính chủ
   */
  signInWithGooglePopup: async function() {
    if (!fbAuth) {
      throw new Error('Firebase Auth chưa được khởi tạo.');
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await fbAuth.signInWithPopup(provider);
    return result.user;
  },

  /**
   * 2. Đăng nhập / Đăng ký bằng Email & Mật khẩu
   */
  signInOrRegisterWithEmail: async function(email, password) {
    if (!fbAuth) throw new Error('Firebase Auth chưa được khởi tạo.');
    try {
      const cred = await fbAuth.signInWithEmailAndPassword(email, password);
      return cred.user;
    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        try {
          const newCred = await fbAuth.createUserWithEmailAndPassword(email, password);
          return newCred.user;
        } catch (regErr) {
          throw regErr;
        }
      }
      throw err;
    }
  },

  /**
   * 3. Đăng xuất khỏi Firebase
   */
  logout: async function() {
    if (fbAuth) {
      await fbAuth.signOut();
    }
  },

  /**
   * 4. Đồng bộ dữ liệu phân hệ lên Firestore Cloud (Tasks, Health, Transactions)
   */
  syncModuleToCloud: async function(uid, moduleKey, data) {
    if (!fbDb || !uid) return;
    try {
      await fbDb.collection('mylife_users').doc(uid).collection('modules').doc(moduleKey).set({
        payload: data,
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.warn(`[Firebase] Đồng bộ ${moduleKey} lên mây tạm hoãn:`, err.message);
    }
  },

  /**
   * 5. Tải dữ liệu từ Firestore Cloud về máy
   */
  fetchModuleFromCloud: async function(uid, moduleKey) {
    if (!fbDb || !uid) return null;
    try {
      const doc = await fbDb.collection('mylife_users').doc(uid).collection('modules').doc(moduleKey).get();
      if (doc.exists) {
        return doc.data().payload;
      }
    } catch (err) {
      console.warn(`[Firebase] Tải ${moduleKey} từ mây thất bại:`, err.message);
    }
    return null;
  }
};
