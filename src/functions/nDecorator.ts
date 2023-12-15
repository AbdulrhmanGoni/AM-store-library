import isNumber from "./isNumber";

type nmOrSt = number | string
type lands = "ar" | "en"
type nDecoratorType = (number: nmOrSt, title?: boolean, language?: lands, decoreWith?: string) => string | number


const nDecorator: nDecoratorType = (number, title = false, language = "en", decoreWith = ",") => {
    if (isNumber(String(number))) {
        number = number.toString();
        let dot = number.indexOf(".");
        let floatingNums = ""
        if (dot !== -1) {
            floatingNums = number.slice(dot);
            number = number.slice(0, dot);
        }
        let numsArr = number.split("").reverse();
        if (numsArr.length > 3) {
            for (let i = 3; i < numsArr.length; i += 3) {
                numsArr[i] += decoreWith;
            }
            numsArr.reverse();
            let lang = { "en": 0, "ar": 1 };
            let theTitle: string | string[] = "";
            if (title === true) {
                switch (true) {
                    case numsArr.length < 4: theTitle = ""; break;
                    case numsArr.length < 7: theTitle = ["k", " ألف"]; break;
                    case numsArr.length < 10: theTitle = ["m", " مليون"]; break;
                    case numsArr.length < 13: theTitle = ["b", " مليار"]; break;
                    case numsArr.length < 16: theTitle = ["t", " تريليون"]; break;
                    case numsArr.length < 19: theTitle = ["q", " كوادريليون"]; break;
                    default: theTitle = ""; break;
                }
                let joinedNums = numsArr.join("");
                return joinedNums.slice(0, joinedNums.indexOf(",")) + theTitle[lang[language]] ?? "";
            }
            else { return numsArr.join("") + floatingNums; }
        }
        else { return numsArr.reverse().join("") + floatingNums; }
    } else return number;
}

export default nDecorator;