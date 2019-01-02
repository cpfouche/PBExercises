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

type ValidationFunction = () => boolean;
type ValidationResult = { valid: boolean, errorMessage: string };

const validate = (condition: boolean | ValidationFunction, errorMsg: string): ValidationResult => {
    const valid = typeof condition === 'function' ? condition() : condition;

    return {
        valid,
        errorMessage: !valid ? errorMsg : null
    }
}

export const validateAddress = (address: AddressDTO): { valid: boolean, errorMessages: string[] } => {
    const { postalCode, country, addressLineDetail, provinceOrState } = address;

    const addressValidationFn = () => {
        if (!addressLineDetail) {
            return false;
        }

        let lineDetails = [addressLineDetail.line1, addressLineDetail.line2];
        lineDetails = lineDetails.filter(ld => !!ld);
        return lineDetails.length > 0;
    };

    let result: {
        hasPostalCode: ValidationResult,
        numericPostalCode?: ValidationResult,
        hasCountry: ValidationResult,
        hasAddressLine: ValidationResult,
        provinceOrState?: ValidationResult
    } = {
        hasPostalCode: validate(!!postalCode, 'Postal code is required'),
        numericPostalCode: postalCode && validate(!!+postalCode, 'Postal code must be numeric'),
        hasCountry: validate(!(!country || (!country.code || !country.name)), 'Country is required'),
        hasAddressLine: validate(addressValidationFn, 'An address line is required'),
        provinceOrState: country && country.code === 'ZA' && validate(!(!provinceOrState || (!provinceOrState.name || !provinceOrState.code)), 'Province is required for South Africa')
    }

    let validations = Object.keys(result).map(key => {
        return result[key];
    }).filter(val => !!val);

    return {
        valid: validations.every(val => val.valid),
        errorMessages: validations.map(val => val.errorMessage).filter(msg => !!msg)
    };
}

export const isValidAddress = (address: AddressDTO): boolean => {
    return this.validateAddress(address).valid;
}