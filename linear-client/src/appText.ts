export const language = process.env.REACT_APP_LOCALE ?? 'DA';

export const appText = {
    login() {
        return 'Log ind';
    },
    loginName() {
        return 'Brugernavn';
    },
    loginPassword() {
        return 'Adgangskode';
    },
    error() {
        return 'Der er sket en fejl.';
    },
    errorLogin() {
        return 'Login mislykkedes.';
    },
    errorNetwork() {
        return 'Der er et problem med netværksforbindelsen.';
    },
    noUserName() {
        return 'Intet Brugernavn';
    },
    advertiserLabel() {
        return 'anoncør';
    },
    advertiserMissing() {
        return 'Ingen annoncør';
    }
};
