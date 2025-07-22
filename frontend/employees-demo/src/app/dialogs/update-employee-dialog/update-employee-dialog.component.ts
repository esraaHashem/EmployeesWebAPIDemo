import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../employee';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ResultMessageDialogComponent } from '../result-message-dialog/result-message-dialog.component';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';


@Component({
  selector: 'app-update-employee-dialog',
  templateUrl: './update-employee-dialog.component.html',
  styleUrl: './update-employee-dialog.component.css',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, LoadingSpinnerComponent]

})
export class UpdateEmployeeDialogComponent {
  isLoading = false;

  employeeToUpdate: Employee = ({} as Employee);

  updateEmployeeForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {
    this.updateEmployeeForm = this.formBuilder.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      position: [data.position || '']
    });
  }
  updateEmployee() {
    this.isLoading = true;
    const updatedData: Employee = {
      ...this.data,
      ...this.updateEmployeeForm.value
    };

    this.employeeService.editEmployee(updatedData).subscribe({
      next: () => {
        this.dialog.open(ResultMessageDialogComponent,
          {
            data:
            {
              title: 'Operation Successful',
              message: 'Employee updated successfully',
              isSuccess: true,
              buttonText: 'Good Job!'
            }
          }).afterClosed().subscribe(() => {
            this.isLoading = false;
            this.dialogRef.close(true);
          });
      },
      error: (error) => {
        this.dialog.open(ResultMessageDialogComponent, {
          data: {
            title: 'Operation Failed, Unable to update employee.',
            message: error.message + ', Please try again.',
            isSuccess: false
          }
        }).afterClosed().subscribe(() => {
          this.isLoading = false;
        });
      }
    });
  }

  cancelUpdate() {
    this.dialogRef.close(false);
  }
}
