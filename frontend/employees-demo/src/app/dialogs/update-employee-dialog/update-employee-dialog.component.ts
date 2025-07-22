import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../employee';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-update-employee-dialog',
  templateUrl: './update-employee-dialog.component.html',
  styleUrl: './update-employee-dialog.component.css',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule]

})
export class UpdateEmployeeDialogComponent {

  employeeToUpdate: Employee = ({} as Employee);

  updateEmployeeForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private employeeService: EmployeeService
  ) {
    this.updateEmployeeForm = this.formBuilder.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      position: [data.position || '']
    });
  }
  updateEmployee() {
    const updatedData: Employee = {
      ...this.data,
      ...this.updateEmployeeForm.value
    };

    this.employeeService.editEmployee(updatedData).subscribe({
      next: () => {
        alert('Employee updated successfully!');
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error updating employee:', error);
      }
    });
  }

  cancelUpdate() {
    this.dialogRef.close(false);
  }


}
