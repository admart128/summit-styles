import React from 'react';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import Sale from './Sale';
import NewFeatured from './NewFeatured';
import Womens from './Womens';
import Mens from './Mens';
import Kids from './Kids';
import BagsGear from './BagsGear';
import ProductDescription from './ProductDescription';

const Redirect = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
    navigate('/shop/sale');
    }, [navigate]);
    return null;
}

const Shop = () => {
    return(
        <div>
            <h1>Shop</h1>
            <nav>
                <Link to="/shop/sale">Sale</Link>
                <Link to="/shop/new-featured">New & Featured</Link>
                <Link to="/shop/womens">Women's</Link>
                <Link to="/shop/mens">Men's</Link>
                <Link to="/shop/kids">Kids</Link>
                <Link to="/shop/bags-gear">Bags & Gear</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Redirect to="sale" />} />
                <Route path="sale" element={<Sale />} />
                <Route path="new-featured" element={<NewFeatured />} />
                <Route path="womens" element={<Womens />} />
                <Route path="mens" element={<Mens />} />
                <Route path="kids" element={<Kids />} />
                <Route path="bags-gear" element={<BagsGear />} />
            </Routes>
            <Outlet />
        </div>
    )
}

export default Shop;