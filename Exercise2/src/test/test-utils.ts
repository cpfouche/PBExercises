import * as chai from 'chai';
import { prettyPrintAddress, prettyPrintAddresses, getAddressesOfType, isValidAddress, printAddressesOfType } from '../address-utils';
import { AddressDTO } from '../address.dto';
import { AddressType } from '../address-type.enum';
import * as fs from 'fs';

const expect = chai.expect;

describe('Address Tests', () => {
    it('prints right format for address with all values', () => {
        const address: AddressDTO = {
            id: "1",
            type: {
                code: "1",
                name: "Physical Address"
            },
            addressLineDetail: {
                line1: "Address 1",
                line2: "Line 2"
            },
            provinceOrState: {
                code: "5",
                name: "Eastern Cape"
            },
            cityOrTown: "City 1",
            country: {
                code: "ZA",
                name: "South Africa"
            },
            postalCode: "1234",
            lastUpdated: "2015-06-21T00:00:00.000Z"
        };

        const expected = `${address.type.name}: ${address.addressLineDetail.line1}, ${address.addressLineDetail.line2} - ${address.cityOrTown} - ${address.provinceOrState.name} - ${address.postalCode} - ${address.country.name}`;

        expect(prettyPrintAddress(address)).to.be.equal(expected);
    });

    it('prints default value for missing values', () => {
        const defaultValue = 'Unknown';
        
        const address: AddressDTO = {
            id: "1",
            type: {
                code: "1",
                name: "Physical Address"
            },
        };

        const expected = `${address.type.name}: ${defaultValue} - ${defaultValue} - ${defaultValue} - ${defaultValue} - ${defaultValue}`;

        expect(prettyPrintAddress(address)).to.be.equal(expected);
    });

    it ('prettyPrintAddresses prints all addresses', () => {
        const addresses: AddressDTO[] = [{
            id: "1",
            type: {
                code: "1",
                name: "Physical Address"
            },
        }, {
            id: "2",
            type: {
                code: "2",
                name: "Postal Address"
            },
        }];

        expect(prettyPrintAddresses(addresses).split('\n').length).to.be.equal(addresses.length);
    });

    it('getAddressesOfType works', () => {
        const addresses: AddressDTO[] = [{
            id: "1",
            type: {
                code: "1",
                name: "Physical Address"
            },
        }, {
            id: "2",
            type: {
                code: "2",
                name: "Postal Address"
            },
        }];

        expect(getAddressesOfType(addresses, AddressType.Physical).every(address => address.type.code === '1')).to.be.true;
    });

    it('printAddressesOfType works', () => {
        const addresses: AddressDTO[] = [{
            id: "1",
            type: {
                code: "1",
                name: "Physical Address"
            },
        }, {
            id: "2",
            type: {
                code: "2",
                name: "Postal Address"
            },
        }, {
            id: "1",
            type: {
                code: "1",
                name: "Physical Address"
            },
        }
        ];

        expect(printAddressesOfType(addresses, 1).split('\n').length).to.be.equal(2);
    });

    it('isValidAddress identifies valid address', () => {
        const validAddress: AddressDTO = {
            id: "1",
            type: {
                code: "1",
                name: "Physical Address"
            },
            addressLineDetail: {
                line1: "Address 1",
                line2: "Line 2"
            },
            provinceOrState: {
                code: "5",
                name: "Eastern Cape"
            },
            cityOrTown: "City 1",
            country: {
                code: "ZA",
                name: "South Africa"
            },
            postalCode: "1234",
            lastUpdated: "2015-06-21T00:00:00.000Z"
        }

        expect(isValidAddress(validAddress)).to.be.true;
    });

    it('isValidAddress returns false if non-numeric postal code', () => {
        const invalidAddress: AddressDTO = {
            id: "1",
            type: {
                code: "1",
                name: "Physical Address"
            },
            addressLineDetail: {
                line1: "Address 1",
                line2: "Line 2"
            },
            provinceOrState: {
                code: "5",
                name: "Eastern Cape"
            },
            cityOrTown: "City 1",
            country: {
                code: "ZA",
                name: "South Africa"
            },
            postalCode: "ab",
            lastUpdated: "2015-06-21T00:00:00.000Z"
        }

        expect(isValidAddress(invalidAddress)).to.be.false;
    });

    it('isValidAddress returns false if no country', () => {
        const invalidAddress: AddressDTO = {
            id: "1",
            type: {
                code: "1",
                name: "Physical Address"
            },
            addressLineDetail: {
                line1: "Address 1",
                line2: "Line 2"
            },
            provinceOrState: {
                code: "5",
                name: "Eastern Cape"
            },
            cityOrTown: "City 1",
            postalCode: "ab",
            lastUpdated: "2015-06-21T00:00:00.000Z"
        }

        expect(isValidAddress(invalidAddress)).to.be.false;
    });

    it('isValidAddress returns false if at least one address line is not falsy', () => {
        const invalidAddress: AddressDTO = {
            id: "1",
            type: {
                code: "1",
                name: "Physical Address"
            },
            addressLineDetail: {
                line1: "",
                line2: ""
            },
            provinceOrState: {
                code: "5",
                name: "Eastern Cape"
            },
            cityOrTown: "City 1",
            country: {
                code: "ZA",
                name: "South Africa"
            },
            postalCode: "ab",
            lastUpdated: "2015-06-21T00:00:00.000Z"
        }

        expect(isValidAddress(invalidAddress)).to.be.false;
    });

    it('isValidAddress returns false if country is ZA and province is missing', () => {
        const validAddress: AddressDTO = {
            id: "1",
            type: {
                code: "1",
                name: "Physical Address"
            },
            addressLineDetail: {
                line1: "Address 1",
                line2: "Line 2"
            },
            cityOrTown: "City 1",
            country: {
                code: "ZA",
                name: "South Africa"
            },
            postalCode: "1234",
            lastUpdated: "2015-06-21T00:00:00.000Z"
        }

        expect(isValidAddress(validAddress)).to.be.false;
    });

});
