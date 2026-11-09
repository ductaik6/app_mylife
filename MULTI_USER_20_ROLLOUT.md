# MyLife multi-user 20 — rollout notes

## Scope
This branch prepares the static MyLife app for up to 20 distinct Firebase Authentication users. It does not make the app production-ready by itself and does not deploy Firestore rules.

## Data identity
- Firebase Authentication UID is the cloud ownership key.
- New Google accounts use the full UID as their local account key.
- Existing local account IDs are retained to avoid losing browser-local cache.
- The client first reads `mylife_accounts/{uid}`; during transition it may attempt a legacy document read using the saved local account ID.
- A successful legacy read is not a safe migration mechanism after strict rules are deployed. Export/merge legacy documents with a trusted Admin SDK or a carefully supervised Firebase Console process before enforcing these rules.

## Firestore rules
`firestore.rules` is the proposed rules source. It is intentionally not deployed by this commit.
Before publishing it:
1. Back up/export the Firestore database.
2. Migrate required legacy `acc-gg-*` documents to `mylife_accounts/{Firebase UID}`.
3. Verify each UID-to-legacy-document mapping with the actual Firebase Authentication user.
4. Test with two separate Google accounts in the Firebase Rules Playground or emulator.
5. Publish only after the app writes exclusively to UID documents.

## Data currently synchronized
- tasks
- projects
- transactions
- health
- taskSettings

The finance PIN remains browser-local and is only a UI lock, not server-side authorization. AI chat history is not currently persisted to Firestore by the existing app.

## Important limitations before inviting 20 testers
- Do not treat the client-side 20-account cap as access control; it is only a UI limit.
- Per-user UID rules are the actual data boundary.
- The current full-document sync can still overwrite newer data when the same user edits from multiple devices at once. This branch is aimed at distinct users using separate accounts; multi-device conflict resolution needs a separate revision/version strategy.
- Gemini calls still run from the browser. Do not place a shared secret API key in the deployed frontend. A backend proxy with Firebase ID-token verification and per-UID rate limits is the recommended next step.
- Browser runtime, real Firebase Rules, and 20-user concurrent load tests have not been executed by this change.

## Manual smoke test
1. Sign in as Google user A; create one task, project, transaction, and health log.
2. Sign out; sign in as user B; confirm A's data is not visible.
3. Create different records as B.
4. Sign out and sign back in as A; verify A's records remain.
5. With A authenticated, attempt to read/write `mylife_accounts/{B_UID}`; Firestore must reject it.
6. Repeat with two separate browsers/devices and inspect for sync overwrites.
