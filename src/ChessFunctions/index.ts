import bindings from 'bindings';


const chessFunctions: {
    validate_cPlus: (FEN: string, resolve: any, reject: any) => void,
    validateAndMakeMove_cPlus: (FEN: string, resolve: any, reject: any) => void
} = bindings('chessFunctions');

export function validate(FEN: string): Promise<string> {

    return new Promise((resolve, reject) => {
        chessFunctions.validate_cPlus(FEN, resolve, reject);
    });
}

export function validateAndMakeMove(FEN: string): Promise<string> {
    return new Promise((resolve, reject) => {
        chessFunctions.validateAndMakeMove_cPlus(FEN, resolve, reject);

    });
}



