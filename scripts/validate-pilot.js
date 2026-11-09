const fs = require('node:fs');
const assert = require('node:assert/strict');

const app = fs.readFileSync('app.js', 'utf8');
const firebase = fs.readFileSync('firebase-config.js', 'utf8');
const rules = fs.readFileSync('firestore.rules', 'utf8');

const checks = [
  ['Firebase auth observer is registered', /firebaseAuth\.onAuthStateChanged\s*\(/.test(app)],
  ['successful login is handled from Firebase user', /handleFirebaseUserLoginSuccess\(user\)/.test(app)],
  ['cloud sync requires the authenticated UID to match', /auth\?\.currentUser\?\.uid\s*===\s*targetId/.test(app)],
  ['fake password-based Google login is absent', !/existingAcc\.password\s*\|\|\s*['"]123456['"]/.test(app)],
  ['legacy account document IDs are not read', !/collection\(['"]mylife_accounts['"]\)\.doc\(['"]acc-/.test(firebase)],
  ['Firestore account path is UID-based', /collection\(['"]mylife_accounts['"]\)\.doc\(uid\)/.test(firebase)],
  ['Firestore rules compare auth UID with document ID', /request\.auth\.uid\s*==\s*uid/.test(rules)],
  ['account documents are UID protected', /match \/mylife_accounts\/{uid}/.test(rules)],
  ['system documents are UID protected', /match \/mylife_system\/{uid}/.test(rules)],
  ['no temporary open-database rule remains', !/allow\s+read\s*,\s*write\s*:\s*if\s+request\.time/.test(rules)]
];

for (const [label, passed] of checks) {
  console.log((passed ? 'PASS' : 'FAIL') + ' - ' + label);
}
assert.ok(checks.every(([, passed]) => passed), 'One or more multi-user pilot safety checks failed.');
