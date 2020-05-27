import { FeatureCollection, Point } from '@turf/helpers';

export default function gridToMatrix(
    points: FeatureCollection<Point>,
    optiosn?: {
        property?: string,
        flip?: boolean,
        flags?: boolean
    }
): number[][];
