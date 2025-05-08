import "./App.css";
import React, { useRef, useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

function ToggleButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [eyeIsClosed, setEyeState] = useState(false);

  const toggleShow = () => {
    if (inputRef.current && inputRef.current.type === "password") {
      setEyeState(true);
      if (inputRef.current) {
        inputRef.current.type = "text";
      }
      if (inputRef.current) {
        inputRef.current.type = "password";
      }
      setEyeState(false);
      inputRef.current.type = "password";
    }
  };

  return (
    <form action="" onSubmit={(event) => event.preventDefault()}>
      <input ref={inputRef} type="password" placeholder="Insira uma senha" />
      <button onClick={toggleShow}>
        {eyeIsClosed ? <VscEyeClosed /> : <VscEye />}
      </button>
    </form>
  );
}

export default ToggleButton;
