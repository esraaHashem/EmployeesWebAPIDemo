import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }


  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('https://localhost:7294/api/employees');
  }


  deleteEmployee(id: number): Observable<boolean> {
    return this.http.delete<boolean>('https://localhost:7294/api/employees/' + id);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>('https://localhost:7294/api/employees', employee);
  }


  editEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>('https://localhost:7294/api/employees/' + employee.id, employee);
  }


}
