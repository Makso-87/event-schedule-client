import { IEvent, TEventCategoryColors } from '../../interfaces';

export const getEventCategoryColors = (events: IEvent[]): TEventCategoryColors => {
    const eventCategoryColors: TEventCategoryColors = {};

    events.forEach((eventItem) => {
        if (!eventCategoryColors[eventItem.category.id]) {
            eventCategoryColors[eventItem.category.id] = {
                color: eventItem.category.color,
            };
        }
    });

    return eventCategoryColors;
};
