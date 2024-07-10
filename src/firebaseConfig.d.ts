declare module "firebaseConfig" {
    import { Firestore } from "firebase/firestore";
    import { FirebaseApp } from "firebase/app";

    const app: FirebaseApp;
    const db: Firestore;

    export { app, db };
}