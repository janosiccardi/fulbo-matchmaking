import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {ListboxModule} from 'primeng/listbox';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ListboxModule,    
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
