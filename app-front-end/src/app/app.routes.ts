// Imports Angular
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// Imports Components
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CarsComponent} from './pages/products/cars/cars.component';
import { CategoriesComponent } from './pages/products/categories/categories.component';

const routes: Routes = [
    { path: 'home', component:  HomeComponent},
    { path: 'about', component: AboutComponent },
    { 
        path: 'products', 
        component: ProductsComponent,
        children: [
            {path: 'cars', component: CarsComponent},
            {path: 'categories/:category', component: CategoriesComponent},
            {path: '', redirectTo: 'categories/Cars', pathMatch: 'full'},
            {path: '**', redirectTo: 'categories/Cars', pathMatch: 'full'}
        ] 
    },
    { path: 'product/:code/:category', component: ProductComponent },
    { path: '', redirectTo:'/home', pathMatch:'full' },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)], // el snippet pone forChild (rutas protegidas por contraseña), hay que cambiarlo por forRoot (publicas)
    exports: [RouterModule]
})
export class AppRoutingModule {}
