import { LabourService } from '../../../core/service/labour.service';
import { Labourer } from '../../../core/models/labourer.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-labour-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labour-form.component.html',
  styleUrls: ['./labour-form.component.css']
})

export class LabourFormComponent implements OnInit {
    form!: FormGroup;

    constructor(private labourService: LabourService, private fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(100)]],
            village: ['', [Validators.required, Validators.maxLength(100)]],
            phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
        });
    }

    submit(): void {
        if (this.form.invalid) return;

        const payload: Labourer = this.form.value;
        this.labourService.registerLabourer(payload).subscribe({
            next: (res: Labourer) => {
                alert(`Labourer registered with ID ${res.id}`);
                this.form.reset();
            },
            error: (err: any) => {
                // The interceptor returns { status, message }
                alert(err?.message || 'An error occurred while registering the labourer.');
            }
        });
    }
    
    get name() { return this.form.get('name'); }
    get village() { return this.form.get('village'); }
    get phoneNumber() { return this.form.get('phoneNumber'); }
}