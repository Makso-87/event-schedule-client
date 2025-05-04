import { INVALID_DATE_TEXT } from '../../constants';

export const getFormattedDate = (dateString: string) => {
    const formattedDate = new Date(dateString).toLocaleDateString();
    return formattedDate === INVALID_DATE_TEXT ? '' : formattedDate;
};
