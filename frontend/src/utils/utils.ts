import formatDistance from 'date-fns/formatDistance'
import { date, number } from 'yup';

export function romanize(num: number) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop()! + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

export function capitalizeFirstLetter(string: string) {
    if (string) { return string.charAt(0).toUpperCase() + string.slice(1); }
        return "Undefined"; 
}

export function truncateString(string: string, thresh: number) {
    if (string.length > thresh) {
        return string.substring(0, thresh-3) + "...";
    }
}

export function toDateTimeLocal(date: string) {
    const d = new Date(date);
    const dateTimeLocalValue = (new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
    return dateTimeLocalValue
}

const nth = (d: number) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  };


function formatAMPM(date: Date) {
    var hours: number = date.getHours();
    var minutes: number | string = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+  minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  

export function toHumanDate(date: string) {

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const monthNumber = new Date(date).getMonth();
    const dayNumber = new Date(date).getDay();
    const time = new Date(date).getTime();

    return monthNames[monthNumber] + " " + +dayNumber+ nth(dayNumber) + " " + new Date(date).getFullYear() + " " + time.
}

