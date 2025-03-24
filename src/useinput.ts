import { useState } from "react";

export function useInput(initialValue, submitAction) {
  const [inputValue, setInputVlue] = useState(initialValue);

  const handleChange = (e) => {
    setInputVlue(e.target.value);
  };
  const handleSubmit = () => {
    setInputVlue("");
    submitAction(inputValue);
  };
  return [inputValue, handleChange, handleSubmit];
}
