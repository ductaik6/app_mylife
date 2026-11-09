/**
 * MyLife Dashboard - Firebase Configuration & Cloud Sync Module
 * Project: app-mylife-v1
 */

const firebaseConfig = {
  apiKey: "AIzaSyCKyokKFdRYDw2O-kY5CJUg35x0O8W5wTQ",
  authDomain: "app-mylife-v1.firebaseapp.com",
  projectId: "app-mylife-v1",
  storageBucket: "app-mylife-v1.firebasestorage.app",
  messagingSenderId: "809536992286",
  appId: "1:809536992286:web:539bcda2f9a823b9de6a0f",
  measurementId: "G-Z9G7BV440L"
};

let fbApp = null;
let fbAuth = null;
let fbDb = null;
let fbAnalytics = null;

try {
  if (typeof firebase !== 'undefined') {
    fbApp = firebase.initializeApp(firebaseConfig);
    fbAuth = firebase.auth();
    fbDb = firebase.firestore();

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
  isAvailable: () => !!fbDb && !!fbAuth,

  /**
   * 1. Đăng nhập trực tiếp bằng Google Popup chính chủ
   */
  signInWithGooglePopup: async function() {
    if (!fbAuth) throw new Error('Firebase Auth chưa được khởi tạo.');
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await fbAuth.signInWithPopup(provider);
    return result.user;
  },

  /**
   * 2. Đồng bộ TOÀN BỘ dữ liệu tài khoản lên Firestore (hiển thị trực tiếp trong collection 'mylife_accounts')
   */
  syncAccountDataToCloud: async function(account, payload) {
    if (!fbDb || !fbAuth || !account?.uid) {
      throw new Error('Thiếu Firebase hoặc UID tài khoản.');
    }
    const uid = account.uid;
    if (!fbAuth.currentUser || fbAuth.currentUser.uid !== uid) {
      throw new Error('Từ chối đồng bộ: UID không khớp người đang đăng nhập.');
    }

    const safePayload = payload || {};
    try {
      await fbDb.collection('mylife_accounts').doc(uid).set({
        accountId: uid,
        uid,
        name: account.name || 'Người dùng',
        email: account.email || fbAuth.currentUser.email || '',
        role: account.role || 'Thành viên',
        color: account.color || '#4285F4',
        initials: account.initials || 'ML',
        isGoogle: true,
        tasks: safePayload.tasks || [],
        health: safePayload.health || {},
        transactions: safePayload.transactions || [],
        projects: safePayload.projects || [],
        lastSyncedAt: firebase.firestore.FieldValue.serverTimestamp(),
        clientTime: new Date().toISOString()
      }, { merge: true });

      // Trạng thái đồng bộ được tách theo UID, không dùng document chung.
      await fbDb.collection('mylife_system').doc(uid).set({
        lastActiveAccount: uid,
        lastActiveName: account.name || '',
        lastSynced: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      console.log(`☁️ [Firebase] Đã đồng bộ UID: ${uid}`);
      return true;
    } catch (err) {
      console.error('[Firebase] Lỗi đồng bộ:', err);
      throw err;
    }
  },

  fetchAccountDataFromCloud: async function(account) {
    if (!fbDb || !fbAuth || !account?.uid) {
      throw new Error('Thiếu Firebase hoặc UID tài khoản.');
    }
    const uid = account.uid;
    if (!fbAuth.currentUser || fbAuth.currentUser.uid !== uid) {
      throw new Error('Từ chối tải dữ liệu: UID không khớp người đang đăng nhập.');
    }

    const doc = await fbDb.collection('mylife_accounts').doc(uid).get();
    if (doc.exists) return doc.data();

    // Migration bridge: đọc document cũ theo ID nội bộ trước khi chuyển sang UID.
    // Chỉ dùng trong giai đoạn chuyển đổi; xóa fallback sau khi đã xác minh dữ liệu.
    if (account.id && account.id !== uid) {
      const legacyDoc = await fbDb
        .collection('mylife_accounts')
        .doc(account.id)
        .get();
      if (legacyDoc.exists) {
        console.warn('[Firebase] Đã đọc document legacy:', account.id);
        return legacyDoc.data();
      }
    }
    return null;
  },

  fetchModuleFromCloud: async function(uid, moduleKey) {
    if (!fbDb || !fbAuth || !uid) return null;
    if (!fbAuth.currentUser || fbAuth.currentUser.uid !== uid) {
      throw new Error('Từ chối tải phân hệ: UID không khớp người đang đăng nhập.');
    }
    const aliases = { health_data: 'health' };
    const key = aliases[moduleKey] || moduleKey;
    const allowed = ['tasks', 'health', 'transactions', 'projects'];
    if (!allowed.includes(key)) {
      throw new Error('Phân hệ không hợp lệ: ' + moduleKey);
    }
    const doc = await fbDb.collection('mylife_accounts').doc(uid).get();
    return doc.exists ? (doc.data()[key] ?? null) : null;
  },

  syncModuleToCloud: async function(uid, moduleKey, data) {
    if (!fbDb || !fbAuth || !uid) return false;
    if (!fbAuth.currentUser || fbAuth.currentUser.uid !== uid) {
      throw new Error('Từ chối đồng bộ phân hệ: UID không khớp người đang đăng nhập.');
    }
    const aliases = { health_data: 'health' };
    const key = aliases[moduleKey] || moduleKey;
    const allowed = ['tasks', 'health', 'transactions', 'projects'];
    if (!allowed.includes(key)) {
      throw new Error('Phân hệ không hợp lệ: ' + moduleKey);
    }
    await fbDb.collection('mylife_accounts').doc(uid).set({
      [key]: data,
      lastSyncedAt: firebase.firestore.FieldValue.serverTimestamp(),
      clientTime: new Date().toISOString()
    }, { merge: true });
    return true;
  }
};
