import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './Components/Products/Product';
import Cart from './Components/Cart/Cart';
import CheckOut from './Components/Checkout/CheckOut';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<CheckOut />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
