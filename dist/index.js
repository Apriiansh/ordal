"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ordal = void 0;
const fs = __importStar(require("fs"));
class Ordal {
    constructor(dataOrdal, config) {
        this.staffDB = dataOrdal;
        this.config = config || {};
        this.auraOrdal = Object.assign({ BOS: 100, CEO: 90, HRD: 90, MANAGER: 90, SUPERVISOR: 75, STAFF: 50, KEPALA_DINAS: 100, SEKRETARIS_DINAS: 80, KEPALA_BIDANG: 70 }, this.config.customAura);
    }
    bypassATS(score, referenceName, siapaTuh) {
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
                    reason: `${panggilansatir} ${con.posisi} memiliki aura (${aura}). GACOR KANG.`
                };
            }
        }
        // Jalur Langit
        return {
            finalScore: score,
            isPassed: score >= 80,
            method: "Standard ATS Evaluation",
            reason: `ga ada koneksi kuat bjirr (-999 Aura)`
        };
    }
    // Evaluasi batch kandidat sekaligus. Buat perusahaan yang punya banyak pelamar.
    evaluateBatch(candidates) {
        const results = candidates.map(candidate => this.bypassATS(candidate.score, candidate.referenceName || '', candidate.siapaTuh));
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
    saveData() {
        if (!this.config.dataFile)
            throw new Error('Data file path not configured');
        const data = { staffDB: this.staffDB, auraOrdal: this.auraOrdal };
        fs.writeFileSync(this.config.dataFile, JSON.stringify(data, null, 2));
    }
    // Load data dari file JSON.
    static loadFromFile(config) {
        if (!config.dataFile || !fs.existsSync(config.dataFile)) {
            throw new Error('Data file not found');
        }
        const data = JSON.parse(fs.readFileSync(config.dataFile, 'utf-8'));
        return new Ordal(data.staffDB, Object.assign(Object.assign({}, config), { customAura: data.auraOrdal }));
    }
    // Export hasil evaluasi ke JSON atau CSV. Buat laporan.
    exportResults(results, format = 'json') {
        if (format === 'csv') {
            const header = 'finalScore,isPassed,method,reason\n';
            const rows = results.map(r => `${r.finalScore},${r.isPassed},${r.method},"${r.reason}"`).join('\n');
            return header + rows;
        }
        return JSON.stringify(results, null, 2);
    }
}
exports.Ordal = Ordal;
