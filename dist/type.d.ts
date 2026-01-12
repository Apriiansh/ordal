export type PosisiOrdalDefault = 'BOS' | 'CEO' | 'HRD' | 'MANAGER' | 'SUPERVISOR' | 'STAFF' | 'KEPALA_DINAS' | 'SEKRETARIS_DINAS' | 'KEPALA_BIDANG' | 'KEPALA_SEKSI' | 'KEPALA_SUB_BAGIAN';
export interface adalahOrdal {
    name: string;
    posisi: PosisiOrdalDefault | string;
}
export interface EvaluationResult {
    finalScore: number;
    isPassed: boolean;
    method: string;
    reason: string;
}
export interface BatchCandidate {
    name: string;
    score: number;
    referenceName?: string;
    siapaTuh?: string;
}
export interface BatchResult {
    results: EvaluationResult[];
    summary: {
        total: number;
        passed: number;
        failed: number;
        privilegeBypassed: number;
    };
}
export interface OrdalConfig {
    dataFile?: string;
    customAura?: Record<string, number>;
}
