import { ConsoleLogger, Injectable } from "@nestjs/common";

@Injectable()
export class ApiLogger extends ConsoleLogger {

    constructor(context: string) {
        super(context)
    }

    error(message: string, stack?: string, context?: string) {
        super.error(message);
    }

    log(message: string, stack?: string, context?: string) {
        super.log(message);
    }
}