export const getDateData = (date: string | number | Date = new Date()) => {
    const dateObject = date instanceof Date ? date : new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth();
    const day = dateObject.getDate();
    const weekDay = dateObject.getDay();

    return {
        year,
        month,
        day,
        weekDay,
        date: dateObject,
    };
};
