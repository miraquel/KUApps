import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { CurrencyPipe } from "@angular/common";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { File } from "@ionic-native/file";
import { FileOpener } from "@ionic-native/file-opener";
import { IonicStorageModule } from '@ionic/storage';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { PernikahanServiceProvider } from '../providers/pernikahan-service/pernikahan-service';
import { LokasiServiceProvider } from '../providers/lokasi-service/lokasi-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{tabsPlacement: 'top',tabsHideOnSubPages: true}),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    InAppBrowser,
    CurrencyPipe,
    FileOpener,
    File,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    PernikahanServiceProvider,
    LokasiServiceProvider
  ]
})
export class AppModule {}
