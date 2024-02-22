"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

import { Card } from "@/components/ui/card";

const TaskInput: React.FC<{ id: string }> = (props) => {
  const [input, setInput] = useState<string>("");


  const createTask = async (e: any) =>{
    e.preventDefault(e);
    if(input === ''){
      alert('Please enter a title')
      return
    }
    await addDoc(collection(db, `${props.id}`), {
      title: input,
      status: "In Progress",
    })
  }

  return (
    <Card className="p-5 mt-5 border-primary">
      <form onSubmit={createTask}>
        <Label htmlFor="title" className="text-3xl my-2">Enter Your Task</Label>
        <Input
        className="mt-2 text-2xl"
          id="title"
          type="text"
          value={input}
          placeholder="Enter Task"
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <Button className="mt-2" type="submit">Add Task</Button>
      </form>
    </Card>
  );
};

export default TaskInput;
