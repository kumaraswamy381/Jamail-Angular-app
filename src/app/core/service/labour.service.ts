import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Labourer } from '../models/labourer.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LabourService{
    private baseUrl = `${environment.apiBaseUrl}/api/labourers`;

    constructor(private http: HttpClient) { }

    // Register Labourer
    registerLabourer(labourer: Labourer): Observable<Labourer> {
        return this.http.post<Labourer>(`${this.baseUrl}/register`, labourer);
    }

    // Get All Labourers
    getAllLabourers(): Observable<Labourer[]> {
        return this.http.get<Labourer[]>(`${this.baseUrl}/all/labours`);
    }

    // Get Labourer by Phone
    getLabourerByPhoneNumber(phoneNumber: string): Observable<Labourer> {
        return this.http.get<Labourer>(`${this.baseUrl}/phone/${phoneNumber}`);
    }

    // Delete by ID (matches backend: DELETE /{id})
    deleteLabourerById(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    // Delete by Phone (matches backend: DELETE /phone/{phoneNumber})
    deleteLabourerByPhoneNumber(phoneNumber: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/phone/${phoneNumber}`);
    }
}

