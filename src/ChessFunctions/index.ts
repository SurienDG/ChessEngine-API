import bindings from 'bindings';


const chessFunctions: {
    validate_cPlus: (FEN: string) => Promise<string>,
    validateAndMakeMove_cPlus: (FEN: string) => Promise<string>
} = bindings('chessFunctions');

export const validate: (FEN: string) => Promise<string> = chessFunctions.validate_cPlus;
export const validateAndMakeMove: (FEN: string) => Promise<string> = chessFunctions.validateAndMakeMove_cPlus;





