import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter} from "react-router-dom";
import { CartProvider } from './CartContext.jsx';
import { WishlistProvider } from './WishlistContext.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import { SearchProvider } from './components/SearchContext';



createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <SearchProvider>
    <BrowserRouter>
     <ScrollToTop />
    <CartProvider>
     <WishlistProvider>  
    <App />
   </WishlistProvider>
    </CartProvider>
   
    </BrowserRouter>
    </SearchProvider>
    
  </StrictMode>
)
