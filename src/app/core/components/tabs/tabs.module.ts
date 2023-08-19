// Modules
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Component
import { TabsComponent } from './tabs.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  exports: [TabsComponent],
  declarations: [TabsComponent]
})

export class TabsModule { }
