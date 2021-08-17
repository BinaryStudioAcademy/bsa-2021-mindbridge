export function getHowLong(date: string) {
  const currentDate = new Date().getTime();
  const timeOfAccountCreation = new Date(date);

  const diff = Math.floor(currentDate - timeOfAccountCreation.getTime());

  const day = 1000 * 60 * 60 * 24;

  const days = Math.floor(diff / day);
  const months = Math.floor(days / 31);
  const years = Math.floor(months / 12);

  let message = 'on the MindBridge ';
  switch (days) {
    case 0:
      break;
    case 1:
      message += `${days} day `;
      break;
    default:
      message += `${days} days `;
  }

  switch (months) {
    case 0:
      break;
    case 1:
      message += `${months} month `;
      break;
    default:
      message += `${months} months `;
  }

  switch (years) {
    case 0:
      break;
    case 1:
      message += `${years} year `;
      break;
    default:
      message += `${years} years `;
  }

  return message;
}
