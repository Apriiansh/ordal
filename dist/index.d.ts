import { adalahOrdal, EvaluationResult } from "./type";
export declare class Ordal {
    private staffDB;
    private auraOrdal;
    constructor(dataOrdal: adalahOrdal[], customAuraMap?: Record<string, number>);
    bypassATS(score: number, referenceName: string): EvaluationResult;
}
