export abstract class NotFoundBase extends Error {
    constructor(errorName: string, id: string, foundBy = 'id') {
        super(`[${errorName}] ${foundBy}: ${id}`);
        Object.setPrototypeOf(this, NotFoundBase.prototype);
        if (Error.captureStackTrace) {
        Error.captureStackTrace(this, NotFoundBaseError);
        }
    }
}
  
export abstract class NotFoundBaseError extends Error {
    constructor(errorName: string, id: string, foundBy = 'id') {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(`[${errorName}] ${foundBy}: ${id}`);
        Object.setPrototypeOf(this, NotFoundBase.prototype);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
        Error.captureStackTrace(this, NotFoundBaseError);
        }
        this.name = 'NotFoundBaseError';
    }
}
  