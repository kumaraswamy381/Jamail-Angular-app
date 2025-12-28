import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabourFormComponent } from './features/labour/labour-form/labour-form.component';
import { LabourListComponent } from './features/labour/labour-list/labour-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LabourFormComponent, LabourListComponent],
  template: `
    <h1>Jamail Labour App</h1>
    <app-labour-form></app-labour-form>
    <app-labour-list></app-labour-list>
  `
})
export class AppComponent {}