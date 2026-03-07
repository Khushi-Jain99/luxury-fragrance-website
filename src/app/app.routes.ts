import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { MenComponent } from './pages/men/men';
import { WomenComponent } from './pages/women/women';
import { SamplesComponent } from './pages/samples/samples';
import { ProductDetailsComponent } from './pages/product-details/product-details';
import { CollectionComponent } from './pages/collection/collection';
import { BestSellersComponent } from './pages/best-sellers/best-sellers';
import { ContactComponent } from './pages/contact/contact';
import { WishlistComponent } from './pages/wishlist/wishlist';
import { CartComponent } from './pages/cart/cart';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'collection', component: CollectionComponent },
    { path: 'best-sellers', component: BestSellersComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'wishlist', component: WishlistComponent },
    { path: 'cart', component: CartComponent },
    { path: 'men', component: MenComponent },
    { path: 'women', component: WomenComponent },
    { path: 'samples', component: SamplesComponent },
    { path: 'product/:id', component: ProductDetailsComponent },
    { path: '**', redirectTo: '' }
];
