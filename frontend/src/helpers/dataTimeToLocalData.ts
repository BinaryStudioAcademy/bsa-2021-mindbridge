export function timeToLocal(data: string) {
  const timeToUTC = new Date(data);
  return timeToUTC.toLocaleDateString();
}
