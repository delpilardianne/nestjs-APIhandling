import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch(WsException)
export class WsExceptionFilter implements ExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = 400; // or another appropriate status code

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}


// @Catch(WsException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = exception.getStatus();

//     const errorResponse = exception.getResponse() as any;
//     let message = exception.message;

//     if (status === HttpStatus.BAD_REQUEST) {
//       message = Array.isArray(errorResponse.message)
//         ? errorResponse.message.join(', ')
//         : errorResponse.message;
//     }

//     response.status(status).json({
//       statusCode: status,
//       message,
//     });
//   }
// }