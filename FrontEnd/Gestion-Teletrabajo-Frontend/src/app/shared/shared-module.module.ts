import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './pages/footer/footer.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';


@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FooterComponent,
    SidebarComponent
  ],
})
export class SharedModule { }
