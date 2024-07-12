import { Firestore as FirestoreType } from 'firebase/firestore';

declare module 'firebase/firestore' {
    export interface Firestore extends FirestoreType {
        collection: (path: string) => CollectionReference;
    }
    export interface CollectionReference {
        add: (data: any) => Promise<any>;
    }
}