'use client';

import { useState } from 'react';
import { useTasksDispatch } from './TasksContext.js';

let nextId = 3;

export default function AddTask() {
    const [text, setText] = useState('');
    const dispatch = useTasksDispatch();

    return (
        <>
            <input
                className="border border-gray-300 px-2 py-1 mr-2"
                placeholder="Add task"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <button
                className="text-white bg-green-500 rounded px-2 py-1"
                onClick={() => {
                    setText('');
                    dispatch({
                        type: 'added',
                        id: nextId++,
                        text: text,
                    });
                }}>
                Add
            </button>
            <MessageButton />
        </>
    );
}

function MessageButton() {
    return (
        <button
            className="text-white bg-blue-500 rounded px-2 py-1 ml-2"
            onClick={() => alert('Message')}>
            Message {nextId}
        </button>
    );
}