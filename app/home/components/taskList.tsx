import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  collection,
  onSnapshot,
  query,
  updateDoc,
  deleteDoc,
  doc,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { MdDoneOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaUndoAlt } from "react-icons/fa";

const TaskList: React.FC<{ id: string }> = (props) => {
  const [task, setTask] = useState<any>([]);

  useEffect(() => {
    const q = query(collection(db, `${props.id}`));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let todoArr: any = [];
      QuerySnapshot.forEach((doc: any) => {
        todoArr.push({ ...doc.data(), id: doc.id });
      });
      setTask(todoArr);
    });
    return () => unsubscribe();
  },[props.id]);

  const completeHandler = async (id: string) => {
    await updateDoc(doc(db, `${props.id}`, id), {
      status: "Done",
    });
  };

  const undoHandler = async (id: string) => {
    await updateDoc(doc(db, `${props.id}`, id), {
      status: "In Progress",
    });
  };

  const deleteHandler = async (id: string) => {
    await deleteDoc(doc(db, `${props.id}`, id));
  };

  return (
    <Card className="p-5 my-5 bg-purple-50">
      <ul>
        {task.map((item: any) => (
            <li key={item.key}>
              {item.status === "Done" ? (
                <Card className="my-3 bg-red-50 shadow-inner">
                  <div>
                    <CardHeader className="text-xl xl:text-5xl line-through">
                      {item.title}
                    </CardHeader>
                    <Button
                      className="float-end mr-6 bg-blue-600"
                      onClick={() => undoHandler(item.id)}
                    >
                      <FaUndoAlt />
                    </Button>
                    <Button className="float-end mr-6" onClick={() => deleteHandler(item.id)} variant="destructive">
                      <MdDeleteForever />
                    </Button>
                  </div>
                  <CardContent>
                    <CardDescription>
                      {item.status === "Done" ? (
                        <Badge variant="destructive" className="text-md">
                          {item.status}
                        </Badge>
                      ) : (
                        <Badge className="text-md bg-green-400">
                          {item.status}
                        </Badge>
                      )}
                    </CardDescription>
                  </CardContent>
                </Card>
              ) : (
                <Card className="my-3 bg-green-50 shadow-xl">
                  <div>
                    <CardHeader className="text-xl xl:text-5xl">
                      {item.title}
                    </CardHeader>
                    <Button
                      className="float-end mr-6 bg-green-500"
                      onClick={() => completeHandler(item.id)}
                    >
                      <MdDoneOutline />
                    </Button>
                    <Button className="float-end mr-6" onClick={() => deleteHandler(item.id)} variant="destructive">
                      <MdDeleteForever />
                    </Button>
                  </div>
                  <CardContent>
                    <CardDescription>
                      {item.status === "done" ? (
                        <Badge variant="destructive" className="text-md">
                          {item.status}
                        </Badge>
                      ) : (
                        <Badge className="text-md bg-green-400">
                          {item.status}
                        </Badge>
                      )}
                    </CardDescription>
                  </CardContent>
                </Card>
              )}
            </li>
        ))}
      </ul>
    </Card>
  );
};

export default TaskList;
