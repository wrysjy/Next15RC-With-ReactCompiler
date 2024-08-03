'use client';

import { useState } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.js';

export default function TaskList() {
    const tasks = useTasks();
    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <Task task={task} />
                </li>
            ))}
        </ul>
    );
}

function Task({ task }) {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useTasksDispatch();
    let taskContent;

    if (isEditing) {
        taskContent = (
            <>
                <input
                    className="border border-gray-300 px-2 py-1 mr-2"
                    value={task.text}
                    onChange={e => {
                        dispatch({
                            type: 'changed',
                            task: {
                                ...task,
                                text: e.target.value
                            }
                        });
                    }} />
                <button
                    className="text-white bg-blue-500 rounded px-2 py-1 ml-2"
                    onClick={() => setIsEditing(false)}>
                    Save
                </button>
            </>
        );
    } else {
        taskContent = (
            <>
                {task.text}
                <button
                    className="text-white bg-blue-500 rounded px-2 py-1 ml-2"
                    onClick={() => setIsEditing(true)}>
                    Edit
                </button>
            </>
        );
    }
    return (
        <label>
            <input
                className='px-2 py-1 mr-2'
                type="checkbox"
                checked={task.done}
                onChange={e => {
                    dispatch({
                        type: 'changed',
                        task: {
                            ...task,
                            done: e.target.checked
                        }
                    });
                }}
            />
            {taskContent}
            <button
                className="text-white bg-red-500 rounded px-2 py-1 ml-2"
                onClick={() => {
                    dispatch({
                        type: 'deleted',
                        id: task.id
                    });
                }}>
                Delete
            </button>
        </label>
    );
}
