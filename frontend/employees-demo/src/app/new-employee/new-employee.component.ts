import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-new-employee',
  standalone: true,
  imports: [MatGridListModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.css'
})
export class NewEmployeeComponent {
  newEmployee!: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router,
    private employeeService: EmployeeService
  ) {
    this.newEmployee = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: [''],
    });

  }

  addEmployee() {
    console.log('New Employee Data:', this.newEmployee.value);
      this.employeeService.addEmployee(this.newEmployee.value).subscribe({
        next: (employee) => {
          console.log('Employee added successfully:', employee);
          this.router.navigate(['/employee-list']);
        },
        error: (error) => {
          console.error('Error adding employee:', error);
        }
      });

  }

  cancelAddEmployee() {
    this.router.navigate(['/employee-list']);
  }

}
