import React from 'react'
import tasks from '../../models/tasks'
import { getTask } from '@/app/api/getTask'

const TaskList = () => {
  const clickHandler = () =>{
    getTask()
  }

  return (
    <div>
      
    </div>
  )
}

export default TaskList
