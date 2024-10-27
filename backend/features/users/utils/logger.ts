// Importerer pino for logging
import pino from "pino";

// Definerer en type for applikasjonskonfigurasjon
type ApplicationConfig = {
  // Tillater kun disse tre miljøene
  env: "development" | "production" | "test";
  // Tillater kun disse fire loggnivåene
  logLevel: "debug" | "info" | "warn" | "error";
};

// Definerer en type for loggmetoder
type LogMethod = (message: { [key: string]: unknown } | string) => void;

// Definerer et grensesnitt for Logger som inneholder ulike loggmetoder
export interface Logger {
  debug: LogMethod;
  info: LogMethod;
  warn: LogMethod;
  error: LogMethod;
  fatal: LogMethod;
}
// Funksjon for å opprette en logger basert på konfigurasjonen
export function makeLogger(config?: ApplicationConfig): Logger {
  // Standard miljø er "development"
  const env = config?.env ?? "development";
  return pino({
    // Standard loggnivå er "info"
    level: config?.logLevel ?? "info",
    // Logger er deaktivert i "test" miljøet
    enabled: env !== "test",
  });
}
