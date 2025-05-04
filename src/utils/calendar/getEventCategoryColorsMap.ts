import { ICategory } from '../../interfaces';

export const getEventCategoryColorsMap = (category: ICategory[]): Record<string, string> => {
    const eventCategoryColors: Record<string, string> = {};

    category.forEach((category) => {
        if (!eventCategoryColors[category.id]) {
            eventCategoryColors[category.id] = category.color;
        }
    });

    return eventCategoryColors;
};
