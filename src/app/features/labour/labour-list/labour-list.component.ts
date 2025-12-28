import { Component, OnInit } from '@angular/core';
import { LabourService } from '../../../core/service/labour.service';
import { Labourer } from '../../../core/models/labourer.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-labour-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './labour-list.component.html',
  styleUrls: ['./labour-list.component.css']
})
export class LabourListComponent implements OnInit {
  labourers: Labourer[] = [];
  searchPhone = '';

  constructor(private labourService: LabourService) { }

  ngOnInit(): void {
    this.loadLabourers();
  }

  loadLabourers(): void {
    this.labourService.getAllLabourers().subscribe({
      next: (data: Labourer[]) => this.labourers = data,
      error: (err: any) => alert(err?.message || 'An error occurred while loading labourers.')
    });
  }

  deleteById(id?: number): void {
    if (id == null) return;
    if (!confirm('Are you sure you want to delete this labourer?')) return;

    this.labourService.deleteLabourerById(id).subscribe({
      next: () => this.loadLabourers(),
      error: (err: any) => alert(err?.message || 'Failed to delete labourer.')
    });
  }

  findByPhone(): void {
    if (!this.searchPhone) return;
    this.labourService.getLabourerByPhoneNumber(this.searchPhone).subscribe({
      next: (lab: Labourer) => this.labourers = [lab],
      error: (err: any) => alert(err?.message || 'Labourer not found with that phone number.')
    })
  }

  deleteByPhone(phone?: string): void {
    if (!phone) return;
    if (!confirm(`Are you sure you want to delete labourer with phone ${phone}?`)) return;

    this.labourService.deleteLabourerByPhoneNumber(phone).subscribe({
      next: () => this.loadLabourers(),
      error: (err: any) => alert(err?.message || 'Failed to delete labourer by phone.')
    });
  }
}