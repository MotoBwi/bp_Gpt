import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
const SYSTEM_MESSAGE = "You are Jobot, a helpful and verstail AI created by Bapan Sardar using state-of arts ML Models and APIs.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const[apiKey, setapiKey] = useState('');
  const[botMessage, setBotMessage] = useState("");

const API_URL = "https://api.openai.com/v1/chat/completions";

 async function sendRequest(){
  const response = await fetch(API_URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", content: SYSTEM_MESSAGE},
        {"role": "user", content: "Hello!"}]
    }),
  });
  const responseJson = await response.json();
  
  setBotMessage(responseJson.choices[0].message.content);

  console.log("setBotMessage", setBotMessage);
 }




  return<div className="flex flex-col h-screen">
    <nav className="shadow px-4 py-2 flex flex-row justify-between items-center">
      <div className="text-xl font-bold">Jobot</div>
      <div>
        <input 
        type="password" 
        className="border p-2 rounded"
        onChange={e => setapiKey(e.target.value)}
        value={apiKey} 
        placeholder="Paste API Key here"/>
      </div>
    </nav>
    <div className="p-4">
      <button 
      className="border rounded-md p-2 bg-blue-500 hover:bg-blue-600 text-white"
      onClick={sendRequest}>
        Send Request
        </button>
        <div className="text-lg mt-4">{botMessage}</div>
    </div>
  </div>
}