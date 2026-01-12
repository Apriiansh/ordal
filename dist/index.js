"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ordal = void 0;
class Ordal {
    constructor(dataOrdal, customAuraMap) {
        this.staffDB = dataOrdal;
        this.auraOrdal = Object.assign({ BOS: 100, CEO: 90, HRD: 90, MANAGER: 90, SUPERVISOR: 75, STAFF: 50, KEPALA_DINAS: 100, SEKRETARIS_DINAS: 80, KEPALA_BIDANG: 70 }, customAuraMap);
    }
    bypassATS(score, referenceName) {
        const con = this.staffDB.find(s => s.name.toLowerCase() === referenceName.toLowerCase());
        if (con) {
            const posisiKey = con.posisi.toUpperCase();
            const aura = this.auraOrdal[posisiKey] || 10;
            if (aura >= 70) {
                const panggilansatir = con.siapaTuh ? `Si ${con.siapaTuh} (${con.name})` : con.name;
                return {
                    finalScore: 100,
                    isPassed: true,
                    method: "Privilege-Based Bypass (+999 Aura)",
                    reason: `${panggilansatir} yang menjabat sebagai ${con.posisi} memiliki aura terlalu tinggi (${aura}). ATS tidak berani menolak.`
                };
            }
        }
        return {
            finalScore: score,
            isPassed: score >= 80,
            method: "Standard ATS Evaluation",
            reason: `Tidak ada koneksi kuat (-999 Aura). Harap mengandalkan jalur langit (doa) atau belajar lebih giat.`
        };
    }
}
exports.Ordal = Ordal;
