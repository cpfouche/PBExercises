import * as chai from 'chai';
const expect = chai.expect;
import { findHighestCommonFactor, highestCommonFactor } from '../utils';

describe('Highest Common Factor', () => {
    it('highestCommonFactor function works', () => {
        expect(highestCommonFactor(8, 12)).to.be.equal(4);
        expect(highestCommonFactor(54, 24)).to.be.equal(6);
    });

    it('findHighestCommonFactor function works', () => {
        expect(findHighestCommonFactor([39, 65,91,117])).to.be.equal(13);
        expect(findHighestCommonFactor([364, 637, 819])).to.be.equal(91);
        expect(findHighestCommonFactor([8, 12])).to.be.equal(4);
    });
});