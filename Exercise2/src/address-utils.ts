import { AddressDTO } from './address.dto';
import { AddressType } from './address-type.enum';

export const prettyPrintAddress = (address: AddressDTO): string => {
    const defaultValue = 'Unknown';
    const { type, addressLineDetail, provinceOrState, cityOrTown, country, postalCode } = address;

    let lineDetails = addressLineDetail ? [addressLineDetail.line1, addressLineDetail.line2] : [];
    lineDetails = lineDetails.filter(ld => ld);
    let prettyLineDetails = lineDetails.join(', ');

     return `${type.name}: ${prettyLineDetails || defaultValue} - ${cityOrTown || defaultValue} - ${provinceOrState ? provinceOrState.name : defaultValue} - ${postalCode || defaultValue} - ${country ? country.name : defaultValue}`;
}

export const prettyPrintAddresses = (addresses: AddressDTO[]): string => {
    const addressPrintLines = addresses.map(address => prettyPrintAddress(address));
    const printOfAddresses = addressPrintLines.join('\n');
    return printOfAddresses;
}

export const getAddressesOfType = (addresses: AddressDTO[], type: AddressType): AddressDTO[] => {
    const typeAddresses = addresses.filter(address => address.type.code === type.toString());
    return typeAddresses;
}

export const printAddressesOfType = (addresses: AddressDTO[], type: AddressType): string => {
    const typeAddresses = this.getAddressesOfType(addresses, type);
    return prettyPrintAddresses(typeAddresses);
}


export const isValidAddress = (address: AddressDTO): boolean => {
    const { postalCode, country, addressLineDetail, provinceOrState } = address;

    if (!postalCode || !country || !addressLineDetail) {
        return false;
    }

    let lineDetails = [addressLineDetail.line1, addressLineDetail.line2];
    lineDetails = lineDetails.filter(ld => ld);

    if (!lineDetails.length) {
        return false;
    }

    if (!+postalCode) {
        return false;
    }
    
    if (!country.code || !country.name) {
        return false;
    }

    if (country.code === 'ZA') {
        if (!provinceOrState) {
            return false;
        }

        if (!provinceOrState.name || !provinceOrState.code) {
            return false;
        }
    }

    return true;
}