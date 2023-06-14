export function formatDate(date: number): string {
    const year = Math.floor(date / 10000);
    const month = Math.floor((date % 10000) / 100) - 1;
    const day = date % 100;

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const formattedDate = new Date(year, month, day);
    const dayOfWeek = daysOfWeek[formattedDate.getDay()];
    const monthName = months[formattedDate.getMonth()];

    const daySuffix = getDaySuffix(day);

    return `${dayOfWeek}, ${monthName} ${day}${daySuffix}`;
  }

  function getDaySuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return 'th';
    }

    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

export function capitalizeFirstLetter(word: string): string {
  if (typeof word !== 'string' || word.length === 0) {
    // Return the input as it is if it's not a string or empty
    return word;
  }

  const firstLetter = word.charAt(0).toUpperCase();
  const restOfWord = word.slice(1);

  return firstLetter + restOfWord;
}