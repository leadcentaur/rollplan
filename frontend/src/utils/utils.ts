import formatDistance from 'date-fns/formatDistance'
import { date } from 'yup';

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

export function toHumanDate(date: string) {

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const monthNumber = new Date(date).getMonth();
    return monthNames[monthNumber] + " " + new Date(date).getFullYear();
}

