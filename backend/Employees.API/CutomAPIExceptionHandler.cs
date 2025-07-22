using Employees.Application.CustomExceptions;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;

namespace Employees.API
{
    /// <summary>
    /// custom global exception handler for catching any exception happens on the app
    /// </summary>
    public class CutomAPIExceptionHandler : IExceptionHandler
    {
        /// <summary>
        /// implement TryHandleAsync of IExceptionHandler.
        /// </summary>
        /// <param name="httpContext"></param>
        /// <param name="exception"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception,
            CancellationToken cancellationToken)
        {
            var problemDetails = exception switch
            {
                EmployeeNotFoundException e => new ProblemDetails
                {
                    Status = (int)HttpStatusCode.NotFound,
                    Title = nameof(EmployeeNotFoundException),
                    Detail = $"Employee with ID {e.EmployeeId} was not found.",
                    Instance = httpContext.Request.Path
                },
                ArgumentException or ArgumentNullException => new ProblemDetails
                {
                    Status = (int)HttpStatusCode.BadRequest,
                    Title = "Bad Request",
                    Detail = exception.Message,
                    Instance = httpContext.Request.Path
                },

                _ => new ProblemDetails
                {
                    Status = (int)HttpStatusCode.InternalServerError,
                    Title = "General Exception",
                    Detail = exception?.Message,
                    Instance = httpContext.Request.Path
                }
            };

            httpContext.Response.StatusCode = problemDetails.Status.GetValueOrDefault(StatusCodes.Status500InternalServerError);
            httpContext.Response.ContentType = "application/json";

            await httpContext.Response.WriteAsync(JsonSerializer.Serialize(problemDetails));

            return true;
        }
    }
}