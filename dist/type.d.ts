export type PosisiOrdalDefault = 'BOS' | 'CEO' | 'HRD' | 'MANAGER' | 'SUPERVISOR' | 'STAFF' | 'KEPALA_DINAS' | 'SEKRETARIS_DINAS' | 'KEPALA_BIDANG' | 'KEPALA_SEKSI' | 'KEPALA_SUB_BAGIAN';
export interface adalahOrdal {
    name: string;
    siapaTuh?: string;
    posisi: PosisiOrdalDefault | string;
}
export interface EvaluationResult {
    finalScore: number;
    isPassed: boolean;
    method: string;
    reason: string;
}
