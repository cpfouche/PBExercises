import * as chai from 'chai';
import { Calculator } from '../calculator';
const expect = chai.expect;

describe('String Calculator', () => {
    it('returns 0 if empty string', () => {
        const calc = new Calculator();
        expect(calc.add('')).to.be.equal(0);
    });

    it('can sum with only one number', () => {
        const calc = new Calculator();
        expect(calc.add('1')).to.be.equal(1);
    });

    it('can sum with two numbers', () => {
        const calc = new Calculator();
        expect(calc.add('1,2')).to.be.equal(3);
    });

    it('can sum more than two numbers', () => {
        const calc = new Calculator();
        expect(calc.add('1,2,3')).to.be.equal(6);
    });

    it('can sum with newline separator', () => {
        const calc = new Calculator();
        expect(calc.add('1\n2')).to.be.equal(3);
    });

    it('can sum with combination of newline and comma separators', () => {
        const calc = new Calculator();
        expect(calc.add('1\n2,3')).to.be.equal(6);
    });

    it('can sum with custom delimeter', () => {
        const calc = new Calculator();
        expect(calc.add('//;\n1;2')).to.be.equal(3);
    });
  
    it('can sum with custom delimeter of two characters', () => {
        const calc = new Calculator();
        expect(calc.add('//>>\n1>>2')).to.be.equal(3);
    });

    it('negative number throws exception with it', () => {
        const calc = new Calculator();

        try {
            calc.add('1\n-2');
            chai.assert(false);
        } catch (error) {
            expect(error).to.be.equal('negatives not allowed: -2');
        }
    });

    it('negative numbers throws exception with them', () => {
        const calc = new Calculator();

        try {
            calc.add('-1\n-2');
            chai.assert(false);
        } catch (error) {
            expect(error).to.be.equal('negatives not allowed: -1, -2');
        }
    });
});
