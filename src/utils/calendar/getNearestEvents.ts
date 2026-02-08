export const getNearestEvents = <T extends { startDate: string }>(events: T[]): T[] => {
    if (events.length === 0) return [];

    const currentDate = new Date();

    const futureEvents = events
        .filter((event) => new Date(event.startDate) > currentDate)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    if (futureEvents.length === 0) return [];

    const nearestDate = new Date(futureEvents[0].startDate).getTime();

    return futureEvents.filter((event) => new Date(event.startDate).getTime() === nearestDate);
};
