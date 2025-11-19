import { auth } from "@/src/firebase.config";

const authHeader = async () => {
  if (auth.currentUser) {
    const accessToken = await auth.currentUser.getIdToken();
    return `Bearer ${accessToken}`;
  }
  return "Bearer ";
};

export default authHeader;
