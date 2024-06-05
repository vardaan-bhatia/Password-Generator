import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const passRef = useRef(null);

  const copyToClip = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    setIsCopied(true);

    // Reset copy status after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (num) {
      str += "0123456789";
    }
    if (char) {
      str += "!@#$%^&*";
    }
    for (let i = 0; i < length; i++) {
      let p = Math.floor(Math.random() * str.length);
      pass += str.charAt(p);
    }
    setPassword(pass);
  }, [length, char, num]);

  useEffect(() => {
    passwordGenerator();
  }, [length, char, num, passwordGenerator]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="flex flex-col items-center bg-white rounded-lg p-8 shadow-xl transform transition-transform duration-300 hover:scale-105">
        <h1 className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white text-center font-bold font-serif text-3xl mb-6 p-2 rounded-md">
          Password Generator
        </h1>
        <input
          type="text"
          className="bg-gray-100 w-80 mb-4 h-10 rounded text-center shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Password"
          value={password}
          readOnly
        />
        <button
          className={`text-white px-4 py-2 rounded mb-6 transition-colors duration-300 ${
            isCopied
              ? "bg-red-500 hover:bg-red-700"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
          onClick={copyToClip}
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
        <div className="flex flex-col items-center w-full">
          <label htmlFor="passwordLength" className="mb-2 text-lg">
            Password Length: {length}
          </label>
          <input
            type="range"
            id="passwordLength"
            name="passwordLength"
            min="8"
            max="25"
            ref={passRef}
            className="w-full mb-4 cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="includeNumbers"
            className="mr-2 cursor-pointer"
            defaultChecked={num}
            onChange={() => setNum((prev) => !prev)}
          />
          <label htmlFor="includeNumbers" className="mr-4 text-lg">
            Include Numbers
          </label>
          <input
            type="checkbox"
            id="includeCharacters"
            className="mr-2 cursor-pointer"
            onChange={() => setChar((prev) => !prev)}
          />
          <label htmlFor="includeCharacters" className="text-lg">
            Include Characters
          </label>
        </div>
      </div>
    </div>
  );
};

export default App;
