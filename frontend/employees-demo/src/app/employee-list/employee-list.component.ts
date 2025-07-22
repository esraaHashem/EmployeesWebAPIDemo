import { Component, signal, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { UpdateEmployeeDialogComponent } from '../dialogs/update-employee-dialog/update-employee-dialog.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  employees: Employee[] = [];

  dataSource = new MatTableDataSource<Employee>()

  displayedColumns: string[] = ['firstName', 'lastName', 'position', 'email', 'delete', 'edit'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {
    this.loadData();
  }

  loadData(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.dataSource = new MatTableDataSource<Employee>(this.employees);
      },
      error: (error) => {
        alert(error.message);
      },
      complete: () => {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editEmployee(element: Employee): void {
    const dialogRef = this.dialog.open(UpdateEmployeeDialogComponent, { data:element});

  }

  deleteEmpolyee(element: Employee): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.deleteEmployee(element.id).subscribe({
          next: (data) => {
            if (data) {
              alert('Employee deleted successfully, plx refresh data');
              delete this.employees[this.employees.indexOf(element)];
              this.dataSource = new MatTableDataSource<Employee>(this.employees);
            }
          },
          error: (error) => {
            alert('Error deleting employee: ' + error.message);
          },
          complete: () => {
            this.dataSource.paginator = this.paginator;
          }
        });
      }
    });
  }
}
