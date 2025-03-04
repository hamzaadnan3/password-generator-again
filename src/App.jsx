import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [password, setPasssword] = useState("");
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const passwordRef = useRef(null);
  const genratePassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) str += "12345678910";
    if (charAllowed) str += "!@#$%^&*(}{][";

    let resultPass = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length + 1);
      resultPass += str.charAt(randomIndex);
    }
    setPasssword(resultPass);
  }, [length, numbersAllowed, charAllowed]);

  useEffect(() => {
    genratePassword();
  }, [length, numbersAllowed, charAllowed]);

  const copyToClipboardHandler = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-3">
      <h1 className="text-2xl text-orange-400">Password Generator Again</h1>
      <div className="">
        <input
          ref={passwordRef}
          type="text"
          placeholder="Password"
          readOnly
          value={password}
          className="w-full border-0 h-full"
        />
        <button
          onClick={copyToClipboardHandler}
          className="bg-blue-400  text-white p-1"
        >
          Copy
        </button>
      </div>
      <div>
        <input
          type="range"
          name="length"
          id="length"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          min={8}
          max={16}
        />
        <label htmlFor="length">Length : {length}</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="number"
          id="number"
          onChange={() => setNumbersAllowed((prev) => !prev)}
          value={numbersAllowed}
        />
        <label htmlFor="number">Allow Numbers</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="character"
          id="character"
          onChange={() => setCharAllowed((prev) => !prev)}
          value={charAllowed}
        />
        <label htmlFor="character">Allow Character</label>
      </div>
    </div>
  );
}

export default App;
