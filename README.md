# 🚩 Ordal (Orang Dalam Engine)

**"Kenapa harus kompeten kalau punya paman? Kenapa harus belajar koding kalau punya aura?"**

`ordal-js` adalah library TypeScript buat bantu sistem rekrutmen yang kadang suka ngikutin aturan ketat. Library ini pakai algoritma **Nepotism-First (NF)** buat bypass ATS (Applicant Tracking System) kalau ada koneksi yang pas.

---

## 🚀 Fitur Utama

* **Aura Detection**: Deteksi otomatis kandidat yang punya aura tinggi dari jabatan referensinya.
* **ATS Bypass**: Kasih skor 100 instan buat yang punya koneksi "dalam".
* **SiapaTuh Logic**: Validasi hubungan keluarga (Paman, Bapak, dll) buat tentuin jalur belakang.
* **Penyesuaian Etika**: Kalau perlu, sistem otomatis "sesuaiin" aturan.
* **Custom Aura**: Tambah jabatan sakti sendiri kayak `KETUA_MK` atau `PAMAN_REKTOR`.
* **Batch Evaluation**: Evaluasi banyak kandidat sekaligus buat perusahaan besar.
* **Data Persistence**: Simpan dan load data staff dari file JSON.
* **Export Reports**: Export hasil evaluasi ke JSON atau CSV buat laporan.
* **API Server**: Server Express buat integrasi web, bisa dipanggil dari frontend.

---

## 📦 Instalasi

Install via NPM buat mulai pakai:

```bash
npm install ordal-js

## 🚀 API Server

Jalankan server buat integrasi web:

```bash
npm start
```

Endpoints:
- `POST /evaluate`: Evaluasi single kandidat. Body: `{ score: number, referenceName?: string }`
- `POST /evaluate-batch`: Evaluasi batch. Body: `{ candidates: BatchCandidate[] }`
- `POST /export`: Export hasil. Body: `{ results: EvaluationResult[], format: "json" | "csv" }`

---
---

## ⚠️ Catatan

Ini cuma satire ya, buat ngetawain sistem rekrutmen yang kadang nggak fair. Jangan beneran dipake buat nyogok atau apa. Kalau mau pakai, tanggung sendiri risikonya. 😅
