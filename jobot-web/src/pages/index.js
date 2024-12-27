// Importing necessary modules and components
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google"; // Font customization
import { useState } from "react"; // React hook for managing component state

// System message used for the AI interaction
const SYSTEM_MESSAGE = "You are Jobot, a helpful and versatile AI created by Bapan Sardar using state-of-the-art ML Models and APIs.";

// Load the 'geist' and 'geist-mono' fonts using Next.js font optimization
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Main component for the page
export default function Home() {
  // State hooks to store API key and bot response message
  const [apiKey, setapiKey] = useState(''); // Holds the API key entered by the user
  const [botMessage, setBotMessage] = useState(''); // Holds the message returned by the bot after processing the API response

  // Define the API endpoint URL for OpenAI's chat completions
  const API_URL = "https://api.openai.com/v1/chat/completions";

  // Async function to send the request to the OpenAI API
  async function sendRequest() {
    try {
      // Sending a POST request to the OpenAI API with the user-provided API key
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Content type as JSON
          'Authorization': 'Bearer ' + apiKey, // Authorization header with the API key
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // The model to be used for completion
          messages: [
            { "role": "system", content: SYSTEM_MESSAGE }, // System message to provide context
            { "role": "user", content: "Hello!" } // Initial user message
          ]
        }),
      });

      // Parse the response from the API
      const responseJson = await response.json();
      
      // Update the bot's response message state with the AI's message
      setBotMessage(responseJson.choices[0].message.content);

      // Log the response to the console (useful for debugging)
      console.log("setBotMessage", setBotMessage);

    } catch (error) {
      // Catch any errors that occur during the API request and log them
      console.error('Error:', error);
      setBotMessage("Something went wrong. Please try again later."); // Provide an error message to the user
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Navigation bar */}
      <nav className="shadow px-4 py-2 flex flex-row justify-between items-center">
        <div className="text-xl font-bold">GPT</div> {/* App Title */}
        <div>
          {/* Input field for the API key */}
          <input 
            type="password" 
            className="border p-2 rounded"
            onChange={e => setapiKey(e.target.value)} // Update the API key state as the user types
            value={apiKey} // Bind the input field value to the API key state
            placeholder="Paste API Key here" // Placeholder text for the input field
          />
        </div>
      </nav>

      {/* Main content area */}
      <div className="p-4">
        {/* Button to trigger the API request */}
        <button 
          className="border rounded-md p-2 bg-blue-500 hover:bg-blue-600 text-white"
          onClick={sendRequest} // Trigger sendRequest function on click
        >
          Send Request
        </button>

        {/* Display the bot's response */}
        <div className="text-lg mt-4">{botMessage}</div> {/* This will show the bot's response or error message */}
      </div>
    </div>
  );
}
