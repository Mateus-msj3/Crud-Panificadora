import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SideNavInnerToolbarModule, SideNavOuterToolbarModule, SingleCardModule} from './layouts';
import {
  ChangePasswordFormModule,
  CreateAccountFormModule,
  FooterModule,
  LoginFormModule,
  ResetPasswordFormModule
} from './shared';
import {AppInfoService, AuthService, ScreenService} from './shared/services';
import {UnauthenticatedContentModule} from './unauthenticated-content';
import {AppRoutingModule} from './app-routing.module';
import {CidadeEstadoModule} from "./shared/components/cidade-estado/cidade-estado.component";
import {HttpClientModule} from "@angular/common/http";
import {ConsultaComponent} from "./pages/consulta/consulta.component";
import {ClienteModule} from './pages/cliente/cliente.component';
import {ProdutoModule} from './pages/produto/produto.component';
import {FirstKeysToConsoleModule} from './shared/pipe/first-keys-to-console.pipe';
import {PedidoModule} from "./pages/pedido/pedido.component";


@NgModule({
    declarations: [
        AppComponent,
        ConsultaComponent,
    ],

    imports: [
        BrowserModule,
        CidadeEstadoModule,
        ClienteModule,
        ProdutoModule,
        SideNavOuterToolbarModule,
        SideNavInnerToolbarModule,
        SingleCardModule,
        FooterModule,
        ResetPasswordFormModule,
        CreateAccountFormModule,
        ChangePasswordFormModule,
        LoginFormModule,
        UnauthenticatedContentModule,
        HttpClientModule,
        AppRoutingModule,
        PedidoModule
    ],
    providers: [AuthService, ScreenService, AppInfoService],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
