// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     const data = { name: "철수" };
//     console.log("네트워크 요청성공");
//     //resolve를 호출함으로 작업이 완료 됬다고 알려줌
//     resolve(data); //인자로는 비동기 결과물입력
//   }, 1000);
// });
// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     const data = null;

//     if (data) {
//       console.log("네트워크 요청성공");
//       resolve(data);
//     } else {
//       //비동기작업이 실패했다고 알려주는 함수
//       reject(new Error("네트워크 문제"));
//       //인자로는 왜실패했는지 알려주는 에러 객체를 넣어주는 것이 보편적
//     }
//   }, 1000);
// });

// //함수가 호출되면 promise객체가 만들어지고 {}안에 가호출됨
// function getData() {
//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const data = { name: "철수" };

//       if (data) {
//         console.log("네트워크 요청성공");
//         resolve(data);
//       } else {
//         reject(new Error("네트워크 문제"));
//       }
//     }, 1000);
//   });
//   //promise를 반환
//   return promise; //getData함수를 호출하는 입장에서 비동기 작업이 어떻게 진행되고 있는지 알아야 하기 때문
// }

// const promise = getData();

// setTimeout(() => {
//   console.log(promise);
// }, 2000);

// function getData() {
//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // const data = { name: "철수" };
//       const data = null;

//       if (data) {
//         console.log("네트워크 요청성공");
//         resolve(data);
//       } else {
//         reject(new Error("네트워크 문제"));
//       }
//     }, 1000);
//   });

//   return promise;
// }
// getData()
//   .then((data: any) => {
//     const name = data.name;
//     console.log(`${name}님 안녕하세요.`);
//   })
//   .catch((error: any) => {
//     console.log("멋지게 에러처리를 했어요.");
//   })
//   .finally(
//     //promise가 성공되든실패하든 무족건 실행해야한는 코드
//     //성공여부와 상관없이 제일 마지막에 호출됨
//     () => {
//       console.log("마무리작업");
//     }
//   );

// function getData() {
//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const data = { name: "철수" };
//       // const data = null;

//       if (data) {
//         console.log("네트워크 요청성공");
//         resolve(data);
//       } else {
//         reject(new Error("네트워크 문제"));
//       }
//     }, 1000);
//   });

//   return promise;
// }

// const promise = getData();
// //연결하는 기법을 promise chaining이라고 함
// //여러게의 비동기 작업을 순서대로 실행가능
// // promise.then().then().then()
// promise
//   .then((data) => {
//     console.log(data);
//     return getData();
//   })
//   .then((data) => {
//     //retrun된 promise가 resolve될때 까지 기다렸다가 실행
//     console.log(data);
//   });

// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error: any) => {
//     console.log("에러가 발생했습니다.");
//   })
//   .finally(() => {
//     console.log("마무리작업");
//   });

// async/await
function networkRequest() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}
async function getUser() {
  await networkRequest();
  return "별코딩";
}

async function getTodo() {
  await networkRequest();
  return ["청소하기", "밥먹기"];
}
async function getData() {
  const user = await getUser();
  // console.log(user);
  const todo = await getTodo();
  // console.log(todo);
  console.log(`${user}님 ${todo}를 하세요.`);
}
getData();
const App = () => {
  return (
    <div>
      <button>pomise</button>
    </div>
  );
};

export default App;
