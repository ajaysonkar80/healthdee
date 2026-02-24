// lib/utils/slots.ts

export function parseTime(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function formatTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");

  const minutes = (totalMinutes % 60)
    .toString()
    .padStart(2, "0");

  return `${hours}:${minutes}`;
}

export function addMinutes(
  totalMinutes: number,
  minutesToAdd: number
): number {
  return totalMinutes + minutesToAdd;
}

export function generateSlots(
  startTime: string,
  endTime: string,
  slotDuration: number = 30
): string[] {
  const slots: string[] = [];

  let current = parseTime(startTime);
  const end = parseTime(endTime);

  while (current + slotDuration <= end) {
    slots.push(formatTime(current));
    current = addMinutes(current, slotDuration);
  }

  return slots;
}