import { useLazyGetUserByEmailQuery } from "@/src/services/users/users.query";
import {
  setAuthFirebaseLoading,
  setAuthUser,
  setAuthUserLoading,
} from "@/src/store/slices/auth-state-slice/auth-state-slice";
import { AuthUser } from "@/src/store/slices/auth-state-slice/auth-state-slice-types";
import { User } from "firebase/auth";
import { useDispatch } from "react-redux";

const useAuthenticator = () => {
  const dispatch = useDispatch();
  const [getUserByEmail] = useLazyGetUserByEmailQuery();

  const createUserInDb = async (user: User | null) => {
    if (user && user.email) {
      console.log("createUserInDb", user);
    }
  };

  const fetchUserDetails = async (user: User | null) => {
    if (user && user.email) {
      const response = await getUserByEmail({ email: user.email });

      // If API response is 404, then create user in db
      if (
        response.error &&
        "status" in response.error &&
        response.error.status === 404
      ) {
        await createUserInDb(user);
      }
    }
  };

  const handleAuthUserChange = async (user: User | null) => {
    if (user && user.email) {
      const userToDispatch: AuthUser = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

      console.log("userToDispatch", userToDispatch);

      await fetchUserDetails(user);

      dispatch(setAuthFirebaseLoading(false));
      dispatch(setAuthUser(userToDispatch));
    } else {
      dispatch(setAuthFirebaseLoading(false));
      dispatch(setAuthUser(null));
      dispatch(setAuthUserLoading(false));
    }
  };

  return {
    handleAuthUserChange,
  };
};

export default useAuthenticator;
