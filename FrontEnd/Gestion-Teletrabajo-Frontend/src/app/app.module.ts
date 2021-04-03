import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LogInModule } from './log-in/log-in.module';
import { SharedModule } from './shared/shared-module.module';
import { ReunionesModule } from './reuniones/reuniones.module';
import { BusquedaUsuariosComponent } from './usuarios/pages/busqueda-usuarios/busqueda-usuarios.component';
import { UsuariosModule } from './usuarios/usuarios.module';

@NgModule({
  declarations: [
    AppComponent
     ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LogInModule,
    ReunionesModule,
    SharedModule,
    UsuariosModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
