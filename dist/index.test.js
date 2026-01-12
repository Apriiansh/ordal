"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
// Test buat simulasi jalur belakang. Santai aja, ini cuma kode.
describe('Ordal Engine Test: Jalur Belakang Simulation', () => {
    const dataPusat = [
        { name: 'Mulyono', posisi: 'BOS' },
        { name: 'Anwar', posisi: 'KETUA_MK' },
        { name: 'Budi', posisi: 'STAFF' },
    ];
    // Mock aura tambahan buat Paman
    const ordal = new index_1.Ordal(dataPusat, { customAura: { 'KETUA_MK': 1000 } });
    it('Harus lolos kalau punya Paman di MK (Bypass Skor Nol)', () => {
        const hasil = ordal.bypassATS(0, 'Anwar', 'Paman'); // Skill issue
        expect(hasil.isPassed).toBe(true);
        expect(hasil.finalScore).toBe(100);
        expect(hasil.reason).toContain('Si Paman (Anwar)');
        console.log(`Log: ${hasil.reason}`);
    });
    it('Harus lolos kalau Bapak-nya adalah BOS', () => {
        const hasil = ordal.bypassATS(20, 'Mulyono', 'Bapak');
        expect(hasil.isPassed).toBe(true);
        expect(hasil.method).toBe('Privilege-Based Bypass (+999 Aura)');
    });
    it('Gagal bypass kalau koneksinya cuma STAFF (Aura lemah)', () => {
        const hasil = ordal.bypassATS(50, 'Budi', 'Teman SD');
        expect(hasil.isPassed).toBe(false); // Karena STAFF aura-nya cuma 50
        expect(hasil.reason).toBe('Nggak ada koneksi kuat (-999 Aura). Ya udah, doa atau belajar lagi aja.');
    });
    it('Lolos jalur murni untuk rakyat jelata yang pintar (Skor >= 80)', () => {
        const hasil = ordal.bypassATS(85, 'Tidak Ada Siapa-siapa');
        expect(hasil.isPassed).toBe(true);
        expect(hasil.finalScore).toBe(85);
        expect(hasil.method).toBe('Standard ATS Evaluation');
    });
    it('Gagal total kalau sudah miskin koneksi, bodoh pula (Skor < 80)', () => {
        const hasil = ordal.bypassATS(30, 'Tanpa Bekingan');
        expect(hasil.isPassed).toBe(false);
        expect(hasil.finalScore).toBe(30);
    });
    it('Batch evaluation harus bener', () => {
        const candidates = [
            { name: 'Alice', score: 90, referenceName: 'Anwar', siapaTuh: 'Paman' },
            { name: 'Bob', score: 70, referenceName: 'Budi' },
            { name: 'Charlie', score: 85 }
        ];
        const batchResult = ordal.evaluateBatch(candidates);
        expect(batchResult.results.length).toBe(3);
        expect(batchResult.summary.total).toBe(3);
        expect(batchResult.summary.passed).toBe(2); // Alice dan Charlie
        expect(batchResult.summary.privilegeBypassed).toBe(1); // Alice
    });
    it('Export ke JSON harus bener', () => {
        const results = [ordal.bypassATS(90, 'Anwar', 'Paman')];
        const json = ordal.exportResults(results, 'json');
        expect(json).toContain('finalScore');
    });
    it('Export ke CSV harus bener', () => {
        const results = [ordal.bypassATS(90, 'Anwar', 'Paman')];
        const csv = ordal.exportResults(results, 'csv');
        expect(csv).toContain('finalScore,isPassed');
    });
});
