import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { MatDialog } from '@angular/material/dialog';
import { ResultMessageDialogComponent } from '../dialogs/result-message-dialog/result-message-dialog.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-new-employee',
  standalone: true,
  imports: [MatGridListModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, LoadingSpinnerComponent],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.css'
})
export class NewEmployeeComponent {
  newEmployee!: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private employeeService: EmployeeService,
    private dialog: MatDialog

  ) {
    this.newEmployee = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: [''],
    });

  }

  addEmployee() {
    if (this.newEmployee.valid) {
      this.isLoading = true;
      console.log('New Employee Data:', this.newEmployee.value);
      this.employeeService.addEmployee(this.newEmployee.value).subscribe({
        next: (employee) => {
          console.log('Employee added successfully:', employee);
          this.dialog.open(ResultMessageDialogComponent, {
            data: {
              title: 'Operation Successful',
              message: 'Your data has been saved successfully!',
              isSuccess: true,
              buttonText: 'Great!'
            }
          }).afterClosed().subscribe(() => {
            this.isLoading = false;
            this.router.navigate(['/employee-list']);
          });          
        },
        error: (error) => {
          console.error('Error adding employee:', error.message);
          this.dialog.open(ResultMessageDialogComponent, {
            data: {
              title: 'Operation Failed, Unable to save data.',
              message: error.message + ', Please try again.',
              isSuccess: false
            }
          }).afterClosed().subscribe(() => {
            this.isLoading = false;
            this.router.navigate(['/employee-list']);
          });;
        }
      });
    }

  }

  cancelAddEmployee() {
    this.router.navigate(['/employee-list']);
  }

}
