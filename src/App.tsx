// import React from "react";

// const App = () => {
//   const todos = {
//     one: "반복문 이해하기",
//     two: "이해할겨?",
//     title: "이해했음?",
//   };

//   for (const todo in todos) {
//     console.log(todo); //one,two,title
//   }
//   return <div>App</div>;
// };

// export default App;
// import React from "react";

// const App = () => {
//   const todos = ["반복문 이해하기", "이해할겨?", "이해했음?"];

//   for (const todo in todos) {
//     console.log(todo); //0,1,2
//     console.log(`${todo}번째질문 ${todos[todo]}`);
//     //0번째질문 반복문 이해하기1번째질문 이해할겨? 2번째질문 이해했음?
//   }
//   return <div>App</div>;
// };

// export default App;

// import React from "react";

// const App = () => {
//   const todos = ["반복문 이해하기", "이해할겨?", "이해했음?"];

//   for (const todo of todos) {
//     console.log(todo); //"반복문 이해하기", "이해할겨?", "이해했음?"
//   }
//   return <div>App</div>;
// };

// export default App;
import React from "react";

const App = () => {
  const todos = ["반복문 이해하기", "이해할겨?", "이해했음?"];

  todos.forEach(function (todo, index) {
    console.log(`${index}번 ${todo}`);
    // 0번 반복문 이해하기 1번 이해할겨? 2번 이해했음?
  });

  return <div>App</div>;
};

export default App;
