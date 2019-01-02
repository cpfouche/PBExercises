import { prettyPrintAddress, prettyPrintAddresses, getAddressesOfType, isValidAddress, validateAddress } from './address-utils';
import { AddressDTO } from './address.dto';
import * as fs from 'fs';
const fileContent = fs.readFileSync('./addresses.json', 'utf8');
const addresses: AddressDTO[] = JSON.parse(fileContent);

export const printAddresses = () => {
    return prettyPrintAddresses(addresses);
}

export const printAddressesValidity = () => {
    const addressResults = addresses.map(address => {
        const validation = validateAddress(address);

        return `${address.id}|${validation.valid}|${validation.errorMessages.join(',')}`;
    });

    return `Address Id|Valid|Error Message\n${addressResults.join('\n')}`;
}

console.log(printAddresses());
console.log(printAddressesValidity());