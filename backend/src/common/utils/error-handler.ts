import {
  Logger,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export function handleServiceError(
  error: unknown,
  logger: Logger,
  options?: { warnMessage?: string },
): never {
  switch (true) {
    case error instanceof NotFoundException: {
      if (options?.warnMessage) logger.warn(options.warnMessage);
      throw error as NotFoundException;
    }

    case error instanceof ConflictException: {
      logger.error(error instanceof Error ? error.message : String(error),
        error instanceof Error ? error.stack : '',
      );
      throw error as ConflictException;
    }

    default: {
      logger.error(
        `Internal server error: ${error}`,
        error instanceof Error ? error.stack : '',
      );
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
