import { TColor } from '../../interfaces';

const getAngles = (prevDeg: number, currentDeg: number) => {
    if (prevDeg) {
        return `${prevDeg}deg ${currentDeg}deg`;
    }

    return `${currentDeg}deg`;
};

export const getEventsCSSGradients = (colorValues: TColor[]): { deg: number; string: string } => {
    return colorValues.reduce(
        (acc, { color }, index, array) => {
            const angle = (360 / array.length) * (index + 1);
            acc.string = `${acc.string}, ${color} ${getAngles(acc.deg, angle)}`;
            acc.deg = angle;
            return acc;
        },
        { deg: 0, string: '' },
    );
};
