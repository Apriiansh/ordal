import { adalahOrdal, EvaluationResult, BatchCandidate, BatchResult, OrdalConfig } from "./type";
export declare class Ordal {
    private staffDB;
    private auraOrdal;
    private config;
    constructor(dataOrdal: adalahOrdal[], config?: OrdalConfig);
    bypassATS(score: number, referenceName: string, siapaTuh?: string): EvaluationResult;
    evaluateBatch(candidates: BatchCandidate[]): BatchResult;
    saveData(): void;
    static loadFromFile(config: OrdalConfig): Ordal;
    exportResults(results: EvaluationResult[], format?: 'json' | 'csv'): string;
}
