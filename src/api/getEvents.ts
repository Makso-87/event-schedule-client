import { gqlQuery } from '../utils/gqlQuery';
import { EventsDocument } from '../generated/graphql';
import { IEvent } from '../interfaces';

export const getEvents = async (): Promise<IEvent[]> => {
    const { data } = await gqlQuery(EventsDocument);
    return data.events as IEvent[];
};
