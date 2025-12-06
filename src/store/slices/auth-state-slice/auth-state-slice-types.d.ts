export interface AuthUser {
  email: string | null;
  photoURL: string | null;
  displayName: string | null;
  phoneNumber: string | null;
}

export interface AuthState {
  firebaseLoading: boolean;
  userLoading: boolean;
  currentUser: AuthUser | null;
}
