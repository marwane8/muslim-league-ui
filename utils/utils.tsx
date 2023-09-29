import { BBallStat } from "./basketball-types";
import { PlayerGameStats } from "./league-types";
import { SoccerStat } from "./soccer-types";

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


export function getSportStats(sport: string) {
  switch(sport) {
    case "basketball":
      return BBallStat; 
    case "soccer":
      return SoccerStat; 
  }
}

export function getSportSchema(sport: string) {
  const schema = {
        type1: "NA",
        type2: "NA",
        type3: "NA",
  }; 
 
  switch(sport) {
    case "basketball":
      schema.type1 = "PTS";
      schema.type2 = "REB";
      schema.type3 = "FLS";
      break; 
    case "soccer":
      schema.type1 = "GLS";
      schema.type2 = "AST";
      break; 
  }

  return schema;
}

export function addBballTypes(playerStat: PlayerGameStats) {
  playerStat.type1 = "points";
  playerStat.stat1 = 0;
  playerStat.type2 = "rebounds";
  playerStat.stat2 = 0;
  playerStat.type3 = "fouls";
  playerStat.stat3 = 0;
}

export function addSoccerTypes(playerStat: PlayerGameStats) {
  playerStat.type1 = "goals";
  playerStat.stat1 = 0;
  playerStat.type2 = "assists";
  playerStat.stat2 = 0;
  playerStat.type3 = "";
  playerStat.stat3 = 0;
}

export function capFirstLetter(word: string): string {
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

export function getNextGameDate(currentDate: number, dateList: number[]): {index: number, date: number} {

  let nextDate ={ index: 0, date: 0 };

  for (let i = 0; i < dateList.length; i++) {
    nextDate.index = i;
    nextDate.date = dateList[i];
    if (nextDate.date >= currentDate) {
      return nextDate;
    }

  } 
  return nextDate;
}


export function getValueByKey(key: number, options: {key: number, value: string}[]) {
  for (let i=0;i<options.length;i++){
      if (options[i].key === key) {
        return options[i].value;
      }
  }

  return "";
}