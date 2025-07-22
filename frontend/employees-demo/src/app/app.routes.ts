import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'employee-list',
        pathMatch: 'full'
    },
    {
        path: 'employee-list',
        loadComponent: () => import('./employee-list/employee-list.component')
            .then(m => m.EmployeeListComponent)
    },
    {
        path: 'new-employee',
        loadComponent: () => import('./new-employee/new-employee.component')
            .then(m => m.NewEmployeeComponent)
    }
];