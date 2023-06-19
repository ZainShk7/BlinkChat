import React, { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const { signOut, currentUser, isLoading } = useAuth();
  useEffect(() => {
    if (!currentUser && !isLoading) router.push("/login");
  }, [currentUser, isLoading]);

  return (
    <div>
      <button onClick={signOut} className="bg-black">
        Sign Out
      </button>
    </div>
  );
};

export default Home;
