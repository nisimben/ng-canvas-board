import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { RouterModule } from '@angular/router';
import { ChatService } from './services/chat.service';
import { HomeComponent } from './client/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    RouterModule
  
  ],
  providers: [AuthGuard,ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
