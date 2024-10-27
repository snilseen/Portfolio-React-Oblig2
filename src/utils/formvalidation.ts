export type ValidationProps = {
  name: string;
  value: string;
};

export function validateFields(fields: ValidationProps[]): string | null {
  const missingFields = fields.filter((field) => field.value.trim() === "");

  if (missingFields.length > 0) {
    const fieldNames = missingFields.map((field) => field.name).join(", ");
    return `${fieldNames} kan ikke være tom, vennligst fyll inn ${fieldNames.toLowerCase()}.`;
  }

  return null;
}
