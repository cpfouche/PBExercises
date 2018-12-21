import * as chai from 'chai';
import { printAddresses, printInvalidAddresses } from '../index';
import { isValidAddress } from '../address-utils';
import { AddressDTO } from '../address.dto';
import { AddressType } from '../address-type.enum';
import * as fs from 'fs';

const expect = chai.expect;

describe('Address File Handling', () => {

    const fileContent = fs.readFileSync('./addresses.json', 'utf8');
    const addresses: AddressDTO[] = JSON.parse(fileContent);

    it('prints all addresses in file', () => {
        const printed = printAddresses();
        expect(printed.split('\n').length).to.be.equal(addresses.length);
    });

    it('prints invalid addresses in file', () => {
        const printed = printInvalidAddresses();
        const invalidAddresses = addresses.filter(address => !isValidAddress(address));
        const invalidIds = invalidAddresses.map(address => address.id);
        expect(printed).to.be.equal(`The following addresses are incorrect:\n${invalidIds.join('\n')}`);
    });
})