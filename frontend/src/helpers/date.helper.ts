import moment from 'moment/moment';

export function getHowLong(date: string) {
  const starts = moment(date);
  const ends = moment();

  const duration = moment.duration(ends.diff(starts));

  const years = duration.years();
  const months = duration.months();
  const days = duration.days();

  let message = 'on the MindBridge ';

  switch (years) {
    case 0:
      break;
    case 1:
      message += `${years} year `;
      break;
    default:
      message += `${years} years `;
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

  switch (days) {
    case 0:
      if (months === 0 && years === 0) {
        message += 'less than 1 day ';
      }
      break;
    case 1:
      message += `${days} day `;
      break;
    default:
      message += `${days} days `;
  }

  return message;
}
