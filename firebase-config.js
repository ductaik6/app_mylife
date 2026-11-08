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
  isAvailable: () => !!fbDb,

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
    if (!fbDb) return false;
    const accId = account.uid || account.id || 'acc-1';
    try {
      await fbDb.collection('mylife_accounts').doc(accId).set({
        accountId: accId,
        uid: account.uid || null,
        name: account.name || 'Người dùng',
        email: account.email || '',
        role: account.role || 'Thành viên',
        color: account.color || '#4285F4',
        initials: account.initials || 'ML',
        isGoogle: !!account.isGoogle,
        tasks: payload.tasks || [],
        health: payload.health || {},
        transactions: payload.transactions || [],
        projects: payload.projects || [],
        lastSyncedAt: firebase.firestore.FieldValue.serverTimestamp(),
        clientTime: new Date().toISOString()
      }, { merge: true });

      // Cập nhật trạng thái vào mylife_system
      await fbDb.collection('mylife_system').doc('sync_status').set({
        lastActiveAccount: accId,
        lastActiveName: account.name || '',
        lastSynced: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      console.log(`☁️ [Firebase Cloud] Đã đồng bộ thành công cho: ${account.name} (${accId})`);
      return true;
    } catch (err) {
      console.error('[Firebase] Lỗi đồng bộ đám mây:', err);
      return false;
    }
  },

  /**
   * 3. Tải toàn bộ dữ liệu tài khoản từ Firestore về máy
   */
  fetchAccountDataFromCloud: async function(account) {
    if (!fbDb) return null;
    const accId = account.uid || account.id || 'acc-1';
    try {
      const doc = await fbDb.collection('mylife_accounts').doc(accId).get();
      if (doc.exists) {
        return doc.data();
      }
    } catch (err) {
      console.warn('[Firebase] Lỗi tải dữ liệu từ mây:', err);
    }
    return null;
  },

  /**
   * 4. Đồng bộ riêng từng phân hệ (Tasks, Health, Transactions)
   */
  syncModuleToCloud: async function(accId, moduleKey, data) {
    if (!fbDb || !accId) return;
    try {
      const updateObj = {
        [moduleKey]: data,
        lastSyncedAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      await fbDb.collection('mylife_accounts').doc(accId).set(updateObj, { merge: true });
    } catch (err) {
      console.warn(`[Firebase] Đồng bộ ${moduleKey} tạm hoãn:`, err.message);
    }
  }
};
