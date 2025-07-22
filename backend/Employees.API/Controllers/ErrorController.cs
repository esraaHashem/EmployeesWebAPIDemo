using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace EmployeesAPI.Controllers
{
    /// <summary>
    ///
    /// </summary>
    [ApiController]
    [Route("/error")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorController : ControllerBase
    {
        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        public IActionResult Error()
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
            var exception = context?.Error;

            // Customize response based on the exception type
            var statusCode = exception is ArgumentException
                ? StatusCodes.Status400BadRequest
                : StatusCodes.Status500InternalServerError;

            var problemDetails = new ProblemDetails
            {
                Status = statusCode,
                Title = statusCode == StatusCodes.Status400BadRequest ? "Bad Request" : "Internal Server Error",
                Detail = exception?.Message,
                Instance = HttpContext.Request.Path
            };

            return StatusCode(problemDetails.Status.Value, problemDetails);
        }
    }
}