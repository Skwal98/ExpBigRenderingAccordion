import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccordionItemComponent } from './accordion/accordion-item/accordion-item.component';
import { AccordionComponent } from './accordion/accordion.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BigRenderComponent } from './big-render/big-render.component';
import { AccordionItemContentDirective } from './accordion/accordion-item/accordion-item-content.directive';

@NgModule({
  declarations: [
    AppComponent,
    AccordionComponent,
    AccordionItemComponent,
    BigRenderComponent,
    AccordionItemContentDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
