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

export function formatNowToYYYYMMDD() {
  const currentDate = new Date();
  
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}${month}${day}`;
  return formattedDate;
}

export function getClosestDate(currentDate: number, dateList: number[]): number{

  let closestDate = dateList[0];
  let closestDiff = Math.abs(dateList[0] - currentDate);

  for (let i = 1; i < dateList.length; i++) {

    const diff = Math.abs(dateList[i] - currentDate);
    if (diff < closestDiff) {
      closestDate = dateList[i]
      closestDiff = diff
    }

  } 
  return closestDate;
}
export function parseParamToInt( param: any) {
  let int_param = 0;
  if (typeof param === 'string'){
        int_param = parseInt(param);
  } else {
    console.error('Unable to parse context type: ', typeof param);
  }

  return int_param;
}

