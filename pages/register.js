import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import { useAuth } from "@/context/authContext";
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { profileColors } from "@/utils";
import { db, auth } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

const gProvider = new GoogleAuthProvider();
const Register = () => {
  const router = useRouter();
  const { currentUser, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && currentUser) router.push("/");
  }, [currentUser, isLoading]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, gProvider);
    } catch (error) {
      console.error(error);
    }
  };
  const colorIndex = Math.floor(
    Math.random(profileColors) * profileColors.length
  );
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const displayName = evt.target[0].value;
    const email = evt.target[1].value;
    const password = evt.target[2].value;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName,
        email,
        color: profileColors[colorIndex],
      });

      await setDoc(doc(db, "userChats", user.uid), {});

      await updateProfile(user, { displayName });

      router.push("/");
    } catch (error) {
      console.error("Error in createUserWithEmailAndPassword: ", error);
    }
  };

  return isLoading || (!isLoading && currentUser) ? (
    "Loader....."
  ) : (
    <div className="h-[100vh] flex justify-center items-center bg-c1">
      <div className="flex flex-col items-center">
        <div className="text-center">
          <div className="text-4xl font-bold">Blink Chat</div>
          <div className="mt-3  text-c3">Create New Account</div>
        </div>
        {/* buttons container */}
        <div className="flex items-center gap-2 w-full mt-10 mb-5">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]"
            onClick={signInWithGoogle}
          >
            <div className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md">
              <IoLogoGoogle size={24} />
              <span>Login With Google</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]">
            <div className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md">
              <IoLogoFacebook size={24} />
              <span>Login With Facebook</span>
            </div>
          </div>
        </div>
        {/* OR Div */}
        <div className="flex items-center gap-1">
          <span className="w-5 h-[1px] bg-c3"></span>
          <span className="text-c3 font-semibold">OR</span>
          <span className="w-5 h-[1px] bg-c3"></span>
        </div>

        <form
          className="flex flex-col items-center gap-3 w-[500px] mt-5"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Display Name"
            className="w-full h-14 bg-c5 rounded-xl outline-none px-5 text-c3"
            autoComplete="off"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full h-14 bg-c5 rounded-xl outline-none px-5 text-c3"
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-14 bg-c5 rounded-xl outline-none px-5 text-c3"
            autoComplete="off"
          />
          <button className="mt-4 w-full h-14 rounded-xl outline-none text-base font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Sign Up
          </button>
        </form>

        <div className="flex justify-center gap-1 text-c3 mt-5">
          <span>already have an account?</span>
          <Link
            href={"/login"}
            className="font-semibold text-white underline underline-offset-2 cursor-pointer"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
