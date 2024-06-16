import { HttpException, HttpStatus } from "@nestjs/common";

export const TryCatch = (customCatchFunction?: (error: any) => any) => {
    return function (
      _target: any,
      _propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      const fn = descriptor.value;
  
      descriptor.value = async function (...args: any[]) {
        let _exec: any = (function () {
          return { message: "Something went wrong" };
        })();
  
        try {
          _exec = fn.call(this, ...args);
  
          if ((await _exec) instanceof Error) {
            throw await _exec;
          }
          return _exec;
        } catch (e) {
          console.log(`[ ErrorCatcher ] ${e.message}`, e.message ? "" : e);
          if (customCatchFunction) {
            return customCatchFunction(e);
          }
          if (e instanceof HttpException) throw e;
          throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      };
    };
  };