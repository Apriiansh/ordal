# 🚩 Ordal (Orang Dalam Engine)

**"AIAIAIAIAIAIAI"**

`ordal` adalah library TypeScript untuk membantu sistem rekrutmen yang terlalu kaku. Library ini menggunakan algoritma **Nepotism-First (NF)** untuk memastikan "kelancaran" administrasi jika terdeteksi adanya aura orang dalam.

---

## 🚀 Fitur Utama

* **Aura Detection**: Menghitung bobot "kesaktian" referensi (Ketua MK > HRD).
* **ATS Bypass**: Otomatis skor 100 bagi yang memiliki privilese.
* **SiapaTuh Logic**: Validasi hubungan (Paman, Bapak, Mertua) untuk bypass etika.
* **Hilirisasi Batch**: Evaluasi masal pelamar dalam satu kali proses.
* **Cyber Export**: Export laporan hasil seleksi ke format CSV/JSON.

---

## 📦 Cara Pakai

```typescript
import { Ordal } from 'ordal';

const staff = [{ name: 'Mulyono', posisi: 'Presiden' }];
const engine = new Ordal(staff);

// Evaluasi Batch (Hilirisasi Seleksi)
const candidates = [
  { name: 'Fufufafa', score: 20, referenceName: 'Mulyono', siapaTuh: 'Bapak' },
  { name: 'Agus', score: 90 } // Jalur langit
];

const report = engine.evaluateBatch(candidates);
console.log(report.summary); 
// Output: { total: 2, passed: 2, privilegeBypassed: 1 }

// Export ke CSV (Format Cyber)
console.log(engine.exportResults(report.results, 'csv'));
```

---

## 🌐 API Endpoints

Jika ingin pakai sebagai server API, jalankan `npm run server` (atau `npx ts-node src/server.ts`).

### POST /evaluate
Evaluasi kandidat tunggal.

**Request Body:**
```json
{
  "score": 20,
  "referenceName": "Mulyono",
  "siapaTuh": "Bapak"
}
```

**Response:**
```json
{
  "finalScore": 100,
  "isPassed": true,
  "method": "Privilege-Based Bypass (+999 Aura)",
  "reason": "Si Bapak (Mulyono) Presiden memiliki aura (100). GACOR KANG."
}
```

### POST /evaluate-batch
Evaluasi batch kandidat.

**Request Body:**
```json
{
  "candidates": [
    {
      "name": "Fufufafa",
      "score": 20,
      "referenceName": "Mulyono",
      "siapaTuh": "Bapak"
    }
  ]
}
```

**Response:**
```json
{
  "results": [
    {
      "finalScore": 100,
      "isPassed": true,
      "method": "Privilege-Based Bypass (+999 Aura)",
      "reason": "Si Bapak (Mulyono) Presiden memiliki aura (100). GACOR KANG."
    }
  ],
  "summary": {
    "total": 1,
    "passed": 1,
    "failed": 0,
    "privilegeBypassed": 1
  }
}
```

### POST /export
Export hasil evaluasi.

**Request Body:**
```json
{
  "results": [
    {
      "finalScore": 100,
      "isPassed": true,
      "method": "Privilege-Based Bypass (+999 Aura)",
      "reason": "Si Bapak (Mulyono) Presiden memiliki aura (100). GACOR KANG."
    }
  ],
  "format": "csv"
}
```

**Response:** (CSV)
```
finalScore,isPassed,method,reason
100,true,Privilege-Based Bypass (+999 Aura),"Si Bapak (Mulyono) Presiden memiliki aura (100). GACOR KANG."
```

Contoh curl:
```bash
curl -X POST http://localhost:3000/evaluate -H "Content-Type: application/json" -d '{"score": 20, "referenceName": "Mulyono"}'
```

## ⚠️ Disclaimer

Hidup Jokowi!!!
