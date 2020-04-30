import bindings from 'bindings';


const chessFunctions: {
    validate_cPlus: (FEN: string, value?: any) => void,
    validateAndMakeMove_cPlus: (FEN: string, value?: any) => void
} = bindings('chessFunctions');

export function validate(FEN: string): Promise<boolean> {
    return new Promise((resolve) => {
        chessFunctions.validate_cPlus(FEN, resolve);
    });



}
export function validateAndMakeMove(FEN: string): Promise<string> {
    return new Promise((resolve) => {
        chessFunctions.validateAndMakeMove_cPlus(FEN, resolve);

    });
}



