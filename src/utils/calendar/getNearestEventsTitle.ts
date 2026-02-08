import { IEvent } from '../../interfaces';
import { NEAREST_EVENT_TITLE_TEXT, NEAREST_EVENTS_TITLE_TEXT } from '../../constants';

export const getNearestEventsTitle = (events: IEvent[], showNearestEvents: boolean) => {
    if (showNearestEvents) {
        return events.length > 1 ? NEAREST_EVENTS_TITLE_TEXT : NEAREST_EVENT_TITLE_TEXT;
    }

    return '';
};
