# MyLife multi-user 20 — rollout notes

## Test objective
Run a fresh-data pilot with up to 20 distinct Google/Firebase Authentication users. Existing legacy account data is intentionally out of scope and will not be migrated.

## Identity and data isolation
- Firebase Authentication UID is the only canonical identity for Google test users.
- New account document path: `mylife_accounts/{uid}`.
- Per-user sync metadata path: `mylife_system/{uid}`.
- A user cannot switch to another locally saved account unless that account matches the currently authenticated Firebase UID.
- The old local demo/password account flow and Google bypass are blocked for this pilot.

## Fresh-data behavior
- Login does not read legacy `acc-gg-*` documents.
- The app initializes the signed-in UID's local data space and uploads the new test data.
- Existing legacy documents are left untouched in Firestore.
- Do not manually delete old documents; they are simply not used by this test branch.

## Firestore rules
The proposed `firestore.rules` file restricts both account and sync-status documents to the matching authenticated UID. It is not deployed automatically.
Publish these rules only after deploying this branch's UID-based client code. The currently deployed main branch may still use legacy document IDs and shared sync-status paths, so publishing the strict rules before deploying the branch can break the current website.

## Included modules
- tasks
- projects
- transactions
- health
- taskSettings

Finance PIN remains a browser-side UI lock, not server-side protection. AI chat history remains browser-local. Gemini is still called from the browser; do not distribute a shared secret API key in the frontend.

## Before inviting 20 testers
1. Deploy the branch to a staging URL or merge after review.
2. Enable Google provider in Firebase Authentication.
3. Add the staging/production host to Firebase Authentication Authorized domains.
4. Publish `firestore.rules` after the UID-based app is deployed.
5. Test with two separate Google accounts first: each creates records and confirms the other cannot read them.
6. Test sign-out, refresh, and sign-in again.
7. Only then invite the remaining users.

## Validation and limitations
- GitHub Actions workflow `.github/workflows/validate.yml` checks JavaScript syntax on pull requests and pushes to the pilot branch.
- JavaScript syntax compilation passed locally for `app.js` and `firebase-config.js`.
- No real browser login, Firebase Rules Playground, or 20-user concurrent load test has been run yet.
- The current full-document sync may overwrite a user's own newer edits if the same user edits from multiple devices simultaneously. Conflict/version handling is a separate required improvement for multi-device usage.
- The 20-account count in the browser is a convenience limit, not a security boundary. UID-based Firestore rules provide data isolation.
