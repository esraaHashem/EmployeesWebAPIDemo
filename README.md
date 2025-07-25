# Employees CRUD Demo API
A RESTful web API for performing CRUD (Create, Read, Update, Delete) operations on employee data.


# CRUD Operations:
- Create new employee.
- Get employee by Id.
- Get all employees.
- Update existing employee if found
- Delete employee if found.

# Installation and Setup
1. Clone the repository:
   * git clone https://github.com/esraaHashem/EmployeesDemo.git
   
2. Run the backend service:
    * Navigate to backend and open Employees.sln.
    * Simply hit the Run button (F5) to start the API service
    * The backend will run at https://localhost:7294
  
 3. Run the frontend service:
    * Navigate to frontend and cd employees-demo
    * open a terminal (like bash) and run npm install then start the app with ng serve.
    * Open your browser and visit http://localhost:4200
   
## Technologies Used

### Backend (.NET API)
- .NET 8.0
- ASP.NET Core Web API
- Entity Framework Core With In Memory Data

### Frontend
- Angular 19
- TypeScript
- Angular Material 19
- Bootstrap 5

### Development Tools
- Visual Studio 2022 
- Postman for API testing.

## Prerequisites
Before installation, ensure you have:
- .NET 8.0 SDK
- Node.js v18 or later
- Angular CLI : npm install -g @angular/cli@19.0.6
- Visual Studio 2022
- Postman If Needed

## API Endpoints

| Method            | Endpoint             | Description              |
| :---------------- | :--------------------| -----------------------  |
| GET               | /api/employees       | Get all employees        |
| GET               | /api/employees/{id}  | Get employee by ID       |
| POST              | /api/employees       | Create new employee      |
| PUT               | /api/employees/{id}  | Update existing employee |
| DELETE            | /api/employees/{id}  | Delete existing employee |
