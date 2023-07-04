import formatDistance from 'date-fns/formatDistance'

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

export function toHumanDate(date: string) {
    return new Date(date).toDateString()
}
