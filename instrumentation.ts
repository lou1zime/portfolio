import { SeverityNumber } from '@opentelemetry/api-logs';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import {
  BatchLogRecordProcessor,
  LoggerProvider,
} from '@opentelemetry/sdk-logs';

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

export const loggerProvider =
  projectToken && host
    ? new LoggerProvider({
        resource: resourceFromAttributes({
          'service.name': 'portfolio',
          'deployment.environment': process.env.NODE_ENV ?? 'development',
        }),
        processors: [
          new BatchLogRecordProcessor({
            exporter: new OTLPLogExporter({
              url: `${host}/i/v1/logs`,
              headers: {
                Authorization: `Bearer ${projectToken}`,
                'Content-Type': 'application/json',
              },
            }),
          }),
        ],
      })
    : null;

export const posthogLogger = loggerProvider?.getLogger('portfolio.posthog');

export function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  if (!loggerProvider && process.env.NODE_ENV !== 'production') {
    const missingVariable = projectToken
      ? 'NEXT_PUBLIC_POSTHOG_HOST'
      : 'NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN';

    console.warn(
      `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`
    );
    return;
  }

  posthogLogger?.emit({
    body: 'PostHog log exporter initialized',
    severityNumber: SeverityNumber.INFO,
    attributes: {
      event: 'posthog_logs_exporter_initialized',
      runtime: 'nodejs',
    },
  });
}
