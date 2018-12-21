import { prettyPrintAddress, prettyPrintAddresses, getAddressesOfType, isValidAddress } from './address-utils';
import { AddressDTO } from './address.dto';
import * as fs from 'fs';
const fileContent = fs.readFileSync('./addresses.json', 'utf8');
const addresses: AddressDTO[] = JSON.parse(fileContent);

export const printAddresses = () => {
    return prettyPrintAddresses(addresses);
}

export const printInvalidAddresses = () => {
    const invalidAddresses = addresses.filter(address => !isValidAddress(address));
    const invalidIds = invalidAddresses.map(address => address.id);
    return `The following addresses are incorrect:\n${invalidIds.join('\n')}`;
}

console.log(printAddresses());
console.log(printInvalidAddresses);