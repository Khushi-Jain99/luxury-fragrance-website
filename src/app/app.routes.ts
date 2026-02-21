import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { MenComponent } from './pages/men/men';
import { WomenComponent } from './pages/women/women';
import { SamplesComponent } from './pages/samples/samples';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'men', component: MenComponent },
    { path: 'women', component: WomenComponent },
    { path: 'samples', component: SamplesComponent },
    { path: '**', redirectTo: '' }
];
