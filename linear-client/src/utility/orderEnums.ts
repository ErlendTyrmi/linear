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

export enum OrderFilter {
    overBudget = 'overBudget',
    allFavorites = 'allFavorites',
    selectedAdvertiser = 'selectedAdvertiser',
    exposure = 'exposure',
    specifics = 'specifics'
}
