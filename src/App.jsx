import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageHome } from "./pages/Home";
import { PageHex } from "./pages/Hex";
import { PageSteps } from "./pages/Steps";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/hex2rgb" element={<PageHex />} />
        <Route path="/steps" element={<PageSteps />} />
      </Routes>
    </BrowserRouter>
  );
};

export { App };
