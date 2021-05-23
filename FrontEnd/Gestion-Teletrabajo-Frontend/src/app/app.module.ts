import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LogInModule } from './log-in/log-in.module';
import { SharedModule } from './shared/shared-module.module';
import { ReunionesModule } from './reuniones/reuniones.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdministradorModule } from './administrador/administrador.module';
import { CoworkingModuleModule } from './coworkingMaps/coworking-module/coworking-module.module';
import { GraficasModule } from './graficas/graficas.module';


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
    UsuariosModule,
    NgbModule,
    AdministradorModule,
    CoworkingModuleModule,
    GraficasModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
