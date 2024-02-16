"use client";
import { Button } from "@/components/ui/button";
import { signOutUser } from "@/lib/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import firebase_app from "../../lib/firebase";
import TaskInput from "./components/taskInput";
import TaskList from "./components/taskList";

const Tasks = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [userID, setUserID] = useState<string>("");
  const [userName, setUserName] = useState<string | null>("");

  const router = useRouter();
  const auth = getAuth(firebase_app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setAuthenticated(true);
      setUserID(user.uid);
      setUserName(user.displayName);
    } else {
      setAuthenticated(false);
    }
  });

  const handleSignOut = async () => {
    await signOutUser(() => {
      setAuthenticated(false);
      router.push("./");
    });
  };

  return authenticated ? (
    <div className="container">
      <div className="flex justify-between mt-5">
        <p className="text-xl md:text-2xl lg:text-3xl">Welcome {userName}</p>
        <Button variant='destructive' onClick={() => handleSignOut()}>Sign Out</Button>
      </div>
      <TaskInput id={userID} />
      <TaskList id={userID} />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
    </div>
  ) : (
    <div>
      <Link href="./">Sign In</Link>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
    </div>
  );
};

export default Tasks;
