import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SandboxPage } from './sandbox';

@NgModule({
  declarations: [
    SandboxPage,
  ],
  imports: [
    IonicPageModule.forChild(SandboxPage),
  ],
})
export class SandboxPageModule {}
