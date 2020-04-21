module.exports = {
    checkErrors: (response) => {
        if (response.data.hasOwnProperty('error')) {
            console.log(response.data.error);
            return true;
        }
        return false;
    },
    capitalize: (str) => {
        return (str.length > 0 ? str.toLowerCase().split(' ').map(word => {
            return word[0].toUpperCase() + word.substr(1);
        }).join(' ') : '');
    }
}