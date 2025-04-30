import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Tailwind from "./pages/Tailwind";
import Shadcn from "./pages/Shadcn";
import Servicenow from "./pages/Servicenow-table";
import ServicenowUI from "./pages/Servicenow-ui";
import { ThemeProvider } from "./components/theme-provider";
import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="tailwind" element={<Tailwind />} />
            <Route path="shadcn" element={<Shadcn />} />
            <Route path="snow" element={<Servicenow />} />
            <Route path="snow_ui" element={<ServicenowUI />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
