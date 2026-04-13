import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId || '(default)');
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  whatsapp?: string;
  originCity?: string;
  neighborhood?: string;
  role: 'user' | 'admin';
  tipoMembro?: 'user' | 'admin' | 'embaixador';
  is_vip: boolean;
  codigoVip?: string;
  referralCode?: string;
  referredBy?: string;
  mochis: number;
  lastLoginDate?: string;
  monthlyLoginCount?: number;
  monthlyShareCount?: number;
  profileCompleted?: boolean;
  emailConfirmed?: boolean;
  utilizacoesMes?: Record<string, number>;
  plan_type?: 'explorador' | 'mochileiro' | 'trimestral' | 'semestral' | 'anual' | 'embaixador_gratis';
  vip_plan?: string;
  stripe_customer_id?: string;
  points?: number;
  metaAtual?: 'basica' | 'prata' | 'ouro' | 'diamante';
  indicacoesConfirmadas?: number;
  membrosAcompanhados?: number;
  missaoSemanal?: Record<string, boolean>;
  address?: {
    street: string;
    number: string;
    postalCode: string;
    city: string;
  };
  kitStatus?: 'pending' | 'shipped' | 'delivered';
  kitShippedAt?: any;
  last_payment_status?: 'paid' | 'failed' | 'canceled' | 'pending';
  ranking_position?: number;
  level?: number;
  badges?: string[];
  created_at: any;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `users/${uid}`);
    return null;
  }
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  try {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, data, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${uid}`);
  }
}

export async function createUserProfile(uid: string, data: Partial<UserProfile>, refCode?: string | null) {
  try {
    const userRef = doc(db, "users", uid);
    
    // Generate unique referral code
    const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const profile: UserProfile = {
      uid,
      name: data.name || '',
      email: data.email || '',
      whatsapp: data.whatsapp || '',
      originCity: data.originCity || '',
      neighborhood: data.neighborhood || '',
      role: 'user',
      is_vip: false,
      mochis: 50, // Bonus for registration
      referralCode,
      referredBy: refCode || undefined,
      created_at: serverTimestamp(),
      ...data
    };
    await setDoc(userRef, profile);

    // If there's a referral code, notify the server to reward the referrer
    if (refCode) {
      try {
        await fetch('/api/gamification/reward-referral', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            referrerCode: refCode,
            referredId: uid,
            referredName: profile.name
          })
        });
      } catch (err) {
        console.error("Erro ao processar indicação:", err);
      }
    }

    return profile;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `users/${uid}`);
    throw error;
  }
}
