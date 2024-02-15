"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { getTask } from "@/app/api/getTask";

const TaskInput = () => {
  const [title, setTitle] = useState<string>("");

  const setTitleHandler = (title: string) => {
    setTitle(title);
  };

  const clickHandler = () =>{
    getTask()
  }
  
  return (
    <div>
      <form>
        <Label htmlFor="title">Enter Task</Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter Title"
          onChange={(e) => setTitleHandler(e.target.value)}
          required
        />
        <Button onClick={clickHandler}>Add</Button>
      </form>
    </div>
  );
};

export default TaskInput;
