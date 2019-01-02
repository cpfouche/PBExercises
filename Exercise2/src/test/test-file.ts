import * as chai from 'chai';
import { printAddresses, printAddressesValidity } from '../index';
import { AddressDTO } from '../address.dto';
import * as fs from 'fs';

const expect = chai.expect;

describe('Address File Handling', () => {

    const fileContent = fs.readFileSync('./addresses.json', 'utf8');
    const addresses: AddressDTO[] = JSON.parse(fileContent);

    it('prints all addresses in file', () => {
        const printed = printAddresses();
        expect(printed.split('\n').length).to.be.equal(addresses.length);
    });

    it('prints validation of addresses in file', () => {
        const printValidation = printAddressesValidity();
        expect(printValidation.split('\n').length).to.be.equal(addresses.length+1);
    });
})