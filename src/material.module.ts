import { NgModule } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';


@NgModule({
    exports:[
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatTableModule,
        MatSelectModule,
        MatTabsModule,
        MatIconModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatButtonModule,
        MatInputModule

    ]
})
export class MaterialModule{}
