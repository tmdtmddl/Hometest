// import { useInput } from "./useinput";

// function displayMessage(message) {
//   alert(message);
// }

// const App = () => {
//   const [inputValue, handleChange, handleSubmit] = useInput("", displayMessage);

//   return (
//     <div>
//       <h1>useInput</h1>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleChange}
//         className="border"
//       />

//       <button onClick={handleSubmit} className="border">
//         확인
//       </button>
//     </div>
//   );
// };

// export default App;

import { useFetch } from "./useFetch";
//네트워크상에서 데이터를 가져올때 js fetch Api 많이 사용함

const baseUrl = "https://jsonplaceholder.typicode.com";
const App = () => {
  const { data: userData } = useFetch(baseUrl, "users");
  const { data: postData } = useFetch(baseUrl, "posts");

  return (
    <div className="flex flex-col gap-y-2">
      <h1>useFetch</h1>

      {userData && <pre>{JSON.stringify(userData[0], null, 2)}</pre>}
      <h1>post</h1>
      {postData && <pre>{JSON.stringify(postData[0], null, 2)}</pre>}
    </div>
  );
};

export default App;
