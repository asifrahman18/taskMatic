import { FirebaseError } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import firebase_app from './firebase';

export const auth = getAuth(firebase_app)

const provider = new GoogleAuthProvider();


export async function signIn(email: string, password: string) {
  let result = null,
    error = null

  try {
    result = await signInWithEmailAndPassword(auth, email, password)
  } catch (e) {
    error = e as FirebaseError
  }

  return { result, error }
}


export async function signOutUser(onSignOut: () => void) {
  await signOut(auth)
  onSignOut()
}


export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  let result = null,
    error = null

  try {
    result = await signInWithPopup(auth, provider)
  } catch (e) {
    error = e as FirebaseError
  }

  return { result, error }
}


export async function getCurrentUser() {
  await auth.currentUser?.reload()
  return auth.currentUser
}


// export async function signIn(email: string, password: string) {
//   return signInWithEmailAndPassword(auth, email, password);
// }

// export async function UserSignOut() {
//   return signOut(auth);
// }

// export async function signInGoogle(){
//   return signInWithPopup(auth, provider)
// }

// export function useUser() {
//   const [user, setUser] = useState<User | null | false>(false);

//   useEffect(() => {
//     return onAuthStateChanged(auth, (User) => setUser(user));
//   }, []);

//   return user;
// }