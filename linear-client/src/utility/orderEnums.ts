export enum OrderStatus {
    created = 'created',
    confirmed = 'confirmed',
    inProgress = 'inProgress',
    finished = 'finished',
    cancelled = 'cancelled'
}

export enum OrderTypeName {
    specific = 'specific',
    exposure = 'exposure'
}

export enum OrderAdvertiserScope {
    allFavorites = 'allFavorites',
    selectedAdvertiser = 'selectedAdvertiser'
}

export enum OrderFilter {
    overBudget = 'overBudget',
    exposure = 'exposure',
    specific = 'specifics',
    none = 'none'
}
