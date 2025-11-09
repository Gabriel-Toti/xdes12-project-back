import pino from "pino";

export const logger = pino(
    {
        ...(process.env.NODE_ENV === "development" && { transport: { target: 'pino-pretty', options: { colorize: true } } }),
        formatters: {
            bindings: (_) => {
                return {}
            },
            level: (label) => {
                return { level: label.toLocaleUpperCase() }
            }
        },
        serializers: {
            err: (error: Error) => {
                return {
                    type: error.constructor.name,
                    message: error.message,
                    stack: error.stack
                };
            }
        },
    }
);