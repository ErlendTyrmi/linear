import AdvertiserSelectMenu from './menu/AdvertiserSelectMenu';

export const language = process.env.REACT_APP_LOCALE ?? 'DA';

export const appText = {
    // Login & general errors

    login() {
        return 'Log ind';
    },
    logout() {
        return 'Log ud';
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
        return 'Ingen Bruger';
    },

    // Lists and collections

    edit() {
        return 'Redigèr';
    },
    add() {
        return 'Tilføj';
    },
    filter() {
        return 'Filtrér';
    },

    // Actions
    close() {
        return 'Luk';
    },
    save() {
        return 'Gem';
    },
    ok() {
        return 'OK';
    },

    // Menu

    menuOverview() {
        return 'Overblik';
    },
    menuOrder() {
        return 'Ordre';
    },
    menuStatus() {
        return 'Status';
    },
    menuAdvertiser() {
        return 'Annoncør';
    },

    // Advertiser

    advertiserLabel() {
        return 'Annoncør';
    },
    advertiserMissing() {
        return 'Ingen annoncør';
    },
    advertiserFavorites() {
        return 'Dine annoncører';
    },
    advertiserSelect() {
        return 'Vælg annoncører';
    },
    advertiserSelectExplainer() {
        return 'Her kan du vælge hvilke annoncører, der skal vises i menuen.';
    },

    // Order
    orderNoneFound() {
        return 'Ingen ordre fundet';
    }
};
