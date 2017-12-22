import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    NgbModule
  ],
  declarations: [HomeComponent]
})
export class PublicModule { }
