import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizeWordsPipe } from '../capitalize-words.pipe';



@NgModule({
  declarations: [
    CapitalizeWordsPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CapitalizeWordsPipe
  ]
})
export class SharedModule { }
