const sortingTypes: any = {
    "newest": {
        property: 'createdAt',
        sort: 1
    },
    "oldest": {
        property: 'createdAt',
        sort: -1
    },
    "priceDown": {
        property: 'value',
        sort: 1
    },
    "priceUp": {
        property: 'value',
        sort: -1
    },
    "rating": {
        property: 'rating',
        sort: -1
    },
}

export { sortingTypes }

