import { useLazyGetUserByPhoneQuery } from "@/src/services/users/users.query";
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
  const [getUserByPhone] = useLazyGetUserByPhoneQuery();

  const createUserInDb = async (user: User | null) => {
    if (user && user.phoneNumber) {
      console.log("createUserInDb", user);
    }
  };

  const fetchUserDetails = async (user: User | null) => {
    if (user && user.phoneNumber) {
      const response = await getUserByPhone({ phone: user.phoneNumber });

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
    if (user && user.phoneNumber) {
      const userToDispatch: AuthUser = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
      };

      await fetchUserDetails(user);

      dispatch(setAuthUser(userToDispatch));
      dispatch(setAuthFirebaseLoading(false));
      dispatch(setAuthUserLoading(false));
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
