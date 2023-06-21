import React, { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import LeftNav from "@/components/LeftNav";

const Home = () => {
  const router = useRouter();
  const { signOut, currentUser, isLoading } = useAuth();
  useEffect(() => {
    if (!currentUser && !isLoading) router.push("/login");
  }, [currentUser, isLoading]);

  return !currentUser ? (
    <Loader />
  ) : (
    // <div>
    //   <button onClick={signOut} className="bg-black">
    //     Sign Out
    //   </button>
    // </div>
    <div className="bg-c1 flex h-[100vh]">
      <div className="flex w-full shrink-0">
        <LeftNav />
        <div className="flex bg-c2 grow">
          <div>sidebar</div>
          <div>Chat</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
