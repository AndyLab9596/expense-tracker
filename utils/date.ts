const getFormatterDate = (date: Date) => {
    // getMonth() will yield 0 for January and so on
    // So we need to add 1 to getMonth()
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export {
    getFormatterDate
}