import { Routes, Route } from "react-router";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";

import { ThemeProvider } from "./context/ThemeContext";
import { ProductProvider } from "./context/ProductContext";

function App() {
return ( <ThemeProvider> <ProductProvider> <Navbar />


    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  </ProductProvider>
</ThemeProvider>


);
}

export default App;
