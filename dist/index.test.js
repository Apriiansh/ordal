"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('Ordal Engine Test: Jalur Belakang Simulation', () => {
    const dataPusat = [
        { name: 'Mulyono', posisi: 'BOS', siapaTuh: 'Bapak' },
        { name: 'Anwar', posisi: 'KETUA_MK', siapaTuh: 'Paman' },
        { name: 'Budi', posisi: 'STAFF', siapaTuh: 'Teman SD' },
    ];
    // Mock aura tambahan buat Paman
    const ordal = new index_1.Ordal(dataPusat, { 'KETUA_MK': 1000 });
    it('Harus lolos kalau punya Paman di MK (Bypass Skor Nol)', () => {
        const hasil = ordal.bypassATS(0, 'Anwar'); // Skor koding 0
        expect(hasil.isPassed).toBe(true);
        expect(hasil.finalScore).toBe(100);
        expect(hasil.reason).toContain('Si Paman (Anwar)');
        console.log(`Log Satir: ${hasil.reason}`);
    });
    it('Harus lolos kalau Bapak-nya adalah BOS', () => {
        const hasil = ordal.bypassATS(20, 'Mulyono');
        expect(hasil.isPassed).toBe(true);
        expect(hasil.method).toBe('Privilege-Based Bypass (+999 Aura)');
    });
    it('Gagal bypass kalau koneksinya cuma STAFF (Aura lemah)', () => {
        const hasil = ordal.bypassATS(50, 'Budi');
        expect(hasil.isPassed).toBe(false); // Karena STAFF aura-nya cuma 50
        expect(hasil.reason).toBe('Tidak ada koneksi kuat (-999 Aura). Harap mengandalkan jalur langit (doa) atau belajar lebih giat.');
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
});
