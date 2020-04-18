export function checkErrors(response) {
    if (response.data.hasOwnProperty('error')) {
        console.log(response.data.error);
        return true;
    }
    return false;
}

export function HelloTester() {

}