import AppRouter from "./AppRouter";
import RouteTitleSync from "./routes/RouteTitleSysc"
import { useRouteTitle } from "./routes/useRouteTitle";

function Header() {
  const title = useRouteTitle();
  return (
    <header style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
      <h1 style={{ margin: 0 }}>{title || "（タイトル未設定）"}</h1>
    </header>
  );
}

export default function App() {
  return (
    <>
      <RouteTitleSync />
      <Header />
      <main style={{ padding: 12 }}>
        <AppRouter />
      </main>
    </>
  );
}
