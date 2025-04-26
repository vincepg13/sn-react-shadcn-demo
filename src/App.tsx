import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Tailwind from "./pages/Tailwind";
import Shadcn from "./pages/Shadcn";
import Servicenow from "./pages/Servicenow";
import { ThemeProvider } from "./components/theme-provider";

//import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HashRouter, Route, Routes } from "react-router-dom";

//const isProd = import.meta.env.MODE === "production";
//const basename = isProd ? "/api/x_bskyb_react/react/test_app" : "/";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {/* <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="tailwind" element={<Tailwind />} />
            <Route path="shadcn" element={<Shadcn />} />
            <Route path="snow" element={<Servicenow />} />
          </Route>
        </Routes>
      </BrowserRouter> */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="tailwind" element={<Tailwind />} />
            <Route path="shadcn" element={<Shadcn />} />
            <Route path="snow" element={<Servicenow />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
