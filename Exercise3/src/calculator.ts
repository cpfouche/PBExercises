export class Calculator {
    add(numbers: string) {
        if (!numbers) {
            return 0;
        }

        let delimeterRegex = /[,\n]/;
        const customDelimeterRegex = /\/\/.+\n/;

        if (numbers.search(customDelimeterRegex) === 0) {
            const delimeter = numbers.substring(2, numbers.indexOf('\n'));
            
            const bracketDelimeterRegex = /\[.+\]/g;
            let bracketDelimiters = delimeter.match(bracketDelimeterRegex);

            if (bracketDelimiters) {
                bracketDelimiters = bracketDelimiters.map(bd => bd.replace(/\[|\]/g, ''));
                delimeterRegex = new RegExp(`[\\${bracketDelimiters.join('\\')}]`);
            } else {
                delimeterRegex = new RegExp(delimeter);
            }

            numbers = numbers.split(customDelimeterRegex)[1];
        }

        const numbersArr = numbers.split(delimeterRegex).map(number => Number(number)).filter(number => number <= 1000);
        const negativeNumbers = numbersArr.filter(number => number < 0);

        if (negativeNumbers.length) {
            throw `negatives not allowed: ${negativeNumbers.join(', ')}`;
        }

        const sum = numbersArr.reduce((a, b) => a + b, 0);
        return sum;
    }
}