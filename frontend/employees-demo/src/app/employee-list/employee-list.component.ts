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
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ResultMessageDialogComponent } from '../dialogs/result-message-dialog/result-message-dialog.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, LoadingSpinnerComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  employees: Employee[] = [];
  isLoading = false;

  dataSource = new MatTableDataSource<Employee>()

  displayedColumns: string[] = ['firstName', 'lastName', 'position', 'email', 'delete', 'edit'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.dataSource = new MatTableDataSource<Employee>(this.employees);

      },
      error: (error) => {
        this.dialog.open(ResultMessageDialogComponent, {
          data: {
            title: 'Operation Failed, Unable to load data.',
            message: error.message + ', Please try again.',
            isSuccess: false
          }
        }).afterClosed().subscribe(() => {
          this.isLoading = false;
        });
      },
      complete: () => {
        this.isLoading = false;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editEmployee(element: Employee): void {
    this.dialog.open(UpdateEmployeeDialogComponent, { data: element })
      .afterClosed().subscribe(result => {
        if (result) {
          this.loadData();
        }
      });

  }

  deleteEmpolyee(element: Employee): void {
    this.isLoading = true;
    this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.deleteEmployee(element.id).subscribe({
          next: (data) => {
            if (data) {
              this.dialog.open(ResultMessageDialogComponent,
                {
                  data:
                  {
                    title: 'Operation Successful',
                    message: 'Employee deleted successfully',
                    isSuccess: true,
                    buttonText: 'Great!'
                  }
                }).afterClosed().subscribe(() => {
                  this.isLoading = false;
                  this.loadData();
                });

            }
          },
          error: (error) => {
            this.dialog.open(ResultMessageDialogComponent, {
              data: {
                title: 'Operation Failed, Unable to delete employee.',
                message: error.message + ', Please try again.',
                isSuccess: false
              }
            }).afterClosed().subscribe(() => {
              this.isLoading = false;
            });

          }
        });
      }
    });
  }
}
