import { LogLevel } from '@nestjs/common/services/logger.service';

export default function getLogLevels(isProduction: boolean): LogLevel[] {
    if (isProduction)
        return ['log', 'warn', 'error'];
    return ['debug'];
}