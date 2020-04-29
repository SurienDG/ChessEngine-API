import bindings from 'bindings';


const addon: { hello: (func: (value?: any) => void) => Promise<string> } = bindings('hello');

export function validate(): void {

    new Promise((resolve) => {
        addon.hello(resolve);

    }).then((test) => {

        console.log(test);

    }).catch ((err) => {
        console.error('err' + err);
    });


}
export function validateAndMakeMove(): void {
    // empty for now
}



