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
    menuNewOrder() {
        return 'Bestil Ny';
    },

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
    },
    ordersOverBudgetHeader() {
        return 'Budget';
    },
    ordersOverBudgetSummary() {
        return ' ordre over budget';
    },
    ordersOverBudgetSummaryWhenZero() {
        return 'Ingen ordre over budget';
    },
    orderShowOverBudget() {
        return 'Vis for alle annoncører';
    },
    orderOverBudgetModalHeader() {
        return 'Se overbudgetterede ordre fordelt på annoncør';
    },
    orderOverBudgetModalExplainer() {
        return 'Her er et overblik over alle annoncørens overbudgetterede ordre.';
    },
    orderOverBudgetListItemAdvertiserText() {
        return 'Overbooket for ';
    },
    orderDKK() {
        return 'DKK';
    },
    orderOverBudgetSeeAdvertiser() {
        return 'Gå til annoncørens ordre';
    },

    // NewsContent
    newsLatestHeader() {
        return 'Vigtige tidsafhængige nyheder';
    },
    newsLatest() {
        return 'Vi er fuldbooket i januar, men der er ledige spots fra den 1. Februar.';
    },
    newsLatestButtonText() {
        return 'Bestil nu';
    }
};
