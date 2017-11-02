import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import Gallery from './pages/gallery/Gallery';
import CustomOrder from './pages/customOrder/CustomOrder';
import Cart from './pages/cart/Cart';
import About from './pages/about/About';
import Checkout from './pages/checkout/Checkout';
import Confirmation from './pages/confirmation/Confirmation';
import Account from './pages/account/Account';
import Admin from './pages/admin/Admin';

export default (
    <Switch>
        <Route exact path='/' component={ Home } />
        <Route path='/gallery' component={ Gallery } />
        <Route path='/custom-order' component={ CustomOrder} />
        <Route path='/cart' component={ Cart } />
        <Route path='/about' component={ About } />
        <Route path='/checkout' component={ Checkout } />
        <Route path='/confirmation' component={ Confirmation } />
        <Route path='/account' component={ Account } />
        <Route path='/admin' component={ Admin } />
    </Switch>
)