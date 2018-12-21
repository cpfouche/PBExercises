export class Calculator {
    add(numbers: string) {
        if (!numbers) {
            return 0;
        }

        let delimeterRegex = /[,\n]/;
        const customDelimeterRegex = new RegExp('//.+\\n');

        if (numbers.search(customDelimeterRegex) == 0) {
            const delimeter = numbers.substring(2, numbers.indexOf('\n'));
            delimeterRegex = new RegExp(delimeter);
            numbers = numbers.split(customDelimeterRegex)[1];
        }

        const numbersArr = numbers.split(delimeterRegex).map(number => parseInt(number));

        const negativeNumbers = numbersArr.filter(number => number < 0);

        if (negativeNumbers.length) {
            throw `negatives not allowed: ${negativeNumbers.join(', ')}`;
        }

        const sum = numbersArr.reduce((a, b) => a + b, 0);
        return sum;
    }
}