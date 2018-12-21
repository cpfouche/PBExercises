export interface AddressDTO {
    id: string;
    type: {
        code: string,
        name: string
    };
    addressLineDetail?: {
        line1: string,
        line2: string
    };
    provinceOrState?: {
        code: string,
        name: string
    };
    cityOrTown?: string;
    country?: {
        code: string,
        name: string
    };
    postalCode?: string;
    lastUpdated?: string
}