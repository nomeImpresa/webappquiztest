'use client'

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000');

export default function HomePage() {
  const [input, setInput] = useState('');
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    socket.on("new_answer", (data) => {
      setAnswers((prev) => [...prev, data]);
    });

    return () => {
      socket.off("new_answer");
    };
  }, []);

  const sendAnswer = () => {
    if (input.trim()) {
      socket.emit("send_answer", input);
      setInput('');
    }
  };

  return (
    <main className="p-4 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Live Game</h1>
      <input
        className="border p-2 text-black"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={sendAnswer} className="ml-2 p-2 bg-blue-600">Invia</button>
      <ul className="mt-4">
        {answers.map((a, i) => <li key={i}>{a}</li>)}
      </ul>
    </main>
  );
}
