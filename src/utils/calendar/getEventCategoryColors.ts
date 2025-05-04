import { IEvent, TEventCategoryColors } from '../../interfaces';

export const getEventCategoryColors = (events: IEvent[], categoryMap: Record<string, string>): TEventCategoryColors => {
    const eventCategoryColors: TEventCategoryColors = {};

    events.forEach((eventItem) => {
        if (!eventCategoryColors[eventItem.categoryId]) {
            eventCategoryColors[eventItem.categoryId] = {
                color: categoryMap[eventItem.categoryId],
            };
        }
    });

    return eventCategoryColors;
};
