export function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function convertIntToRoman(intToBeConverted) {
    const romanNumDict = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    };
  
    let intForCalc = intToBeConverted;
    let result = "";
  
    for (let numeral in romanNumDict) {
      while (intForCalc >= romanNumDict[numeral]) {
        result += numeral;
        intForCalc -= romanNumDict[numeral];
      }
    }
  
    return result;
}

export async function makeFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    return await response.json();
  } catch (error) {
    return false;
  }
}

export function monthIntToString(month) {
  switch (month) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      return 'Invalid month';
  }
}

export function firstLetterUpper(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}