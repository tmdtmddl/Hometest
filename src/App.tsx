import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react"; //반드시 같이 써야함 (lazy가 비동기라서컴포넌트라서)
import { AuthProvider } from "./provider/AuthProvider";

const Siginin = lazy(() => import("./Siginin"));
const Home = lazy(() => import("./Home"));
const Calendar = lazy(() => import("./Calendar")); //lazy = 사용자가 방문하면 끄때 컴포넌트코드불러옴 (한 번에 한 페이지만 보임,나머지 페이지는 나중에 필요)

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div>로딩중...</div>}>
          <Routes>
            <Route path="/">
              <Route index Component={Siginin} />
              <Route path="home" Component={Home} />
              <Route path="calendar" Component={Calendar} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
