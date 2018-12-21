
export const highestCommonFactor = (a: number, b: number): number => {
    if (a  == 0)
        return b;
    return highestCommonFactor(b % a, a);
}

export const findHighestCommonFactor = (numbers: number[]): number => {
    let result = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
        result = highestCommonFactor(result, numbers[i]);
    }

    return result;
}