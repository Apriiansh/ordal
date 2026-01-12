import { adalahOrdal, EvaluationResult, BatchCandidate, BatchResult, OrdalConfig } from "./type";
import * as fs from 'fs';
import * as path from 'path';

export class Ordal {
  private staffDB: adalahOrdal[];
  private auraOrdal: Record<string, number>;
  private config: OrdalConfig;

  constructor(dataOrdal: adalahOrdal[], config?: OrdalConfig) {
    this.staffDB = dataOrdal;
    this.config = config || {};
    this.auraOrdal = {
      BOS: 100, CEO: 90, HRD: 90, MANAGER: 90, SUPERVISOR: 75, STAFF: 50,
      KEPALA_DINAS: 100, SEKRETARIS_DINAS: 80, KEPALA_BIDANG: 70,
      ...this.config.customAura
    };
  }

  public bypassATS(score: number, referenceName: string, siapaTuh?: string): EvaluationResult {
    const con = this.staffDB.find(s => s.name.toLowerCase() === referenceName.toLowerCase());

    if (con) {
      const posisiKey = con.posisi.toUpperCase();
      const aura = this.auraOrdal[posisiKey] || 10;

      if (aura >= 70) {
        const panggilansatir = siapaTuh ? `Si ${siapaTuh} (${con.name})` : con.name;
        return {
          finalScore: 100,
          isPassed: true,
          method: "Privilege-Based Bypass (+999 Aura)",
          reason: `${panggilansatir} ${con.posisi} memiliki aura (${aura}). Mamahhh takutt.`
        };
      }
    }

    // Jalur Langit
    return {
      finalScore: score,
      isPassed: score >= 80,
      method: "Standard ATS Evaluation",
      reason: `Nggak ada koneksi kuat (-999 Aura). Ya udah, doa atau belajar lagi aja.`
    };
  }

  // Evaluasi batch kandidat sekaligus. Buat perusahaan yang punya banyak pelamar.
  public evaluateBatch(candidates: BatchCandidate[]): BatchResult {
    const results: EvaluationResult[] = candidates.map(candidate =>
      this.bypassATS(candidate.score, candidate.referenceName || '', candidate.siapaTuh)
    );

    const passed = results.filter(r => r.isPassed).length;
    const privilegeBypassed = results.filter(r => r.method === "Privilege-Based Bypass (+999 Aura)").length;

    return {
      results,
      summary: {
        total: candidates.length,
        passed,
        failed: candidates.length - passed,
        privilegeBypassed
      }
    };
  }

  // Simpan data staff ke file JSON. Biar bisa dipake lagi nanti.
  public saveData(): void {
    if (!this.config.dataFile) throw new Error('Data file path not configured');
    const data = { staffDB: this.staffDB, auraOrdal: this.auraOrdal };
    fs.writeFileSync(this.config.dataFile, JSON.stringify(data, null, 2));
  }

  // Load data dari file JSON.
  public static loadFromFile(config: OrdalConfig): Ordal {
    if (!config.dataFile || !fs.existsSync(config.dataFile)) {
      throw new Error('Data file not found');
    }
    const data = JSON.parse(fs.readFileSync(config.dataFile, 'utf-8'));
    return new Ordal(data.staffDB, { ...config, customAura: data.auraOrdal });
  }

  // Export hasil evaluasi ke JSON atau CSV. Buat laporan.
  public exportResults(results: EvaluationResult[], format: 'json' | 'csv' = 'json'): string {
    if (format === 'csv') {
      const header = 'finalScore,isPassed,method,reason\n';
      const rows = results.map(r => `${r.finalScore},${r.isPassed},${r.method},"${r.reason}"`).join('\n');
      return header + rows;
    }
    return JSON.stringify(results, null, 2);
  }
}