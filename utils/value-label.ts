import { BOOLEAN_OPTIONS } from '@/lib/constants';

export function mapBooleanToString(value: boolean): string | undefined {
  return BOOLEAN_OPTIONS.find(option => option.value === String(value))?.label;
}
