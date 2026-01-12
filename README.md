# 🚩 Ordal (Orang Dalam Engine)

**"AIAIAIAIAIAIAI"**

`ordal` adalah library TypeScript buat bantu sistem rekrutmen yang kadang suka ngikutin aturan ketat. Library ini pakai algoritma **Nepotism-First (NF)** buat bypass ATS (Applicant Tracking System) kalau ada orang dalam yang pas.

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

## 📦 Cara Download dan Pakai

1. **Download**: Clone repo atau download zip dari GitHub.
   ```
   git clone https://github.com/username/ordal.git
   cd ordal
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Build**:
   ```
   npm run build
   ```

4. **Pakai di Kode**:
   Import dan pakai di project TypeScript/Node.js kamu:
   ```typescript
   import { Ordal } from './dist/index'; // Atau path ke src/index.ts jika belum build

   const staffData = [{ name: 'Pak Bos', posisi: 'BOS' }];
   const ordal = new Ordal(staffData);
   const result = ordal.bypassATS(85, 'Pak Bos', 'Paman');
   console.log(result); // { finalScore: 100, isPassed: true, ... }
   ```

5. **Jalankan Server API** (Opsional):
   ```
   npm start
   ```
   Akses endpoints di `http://localhost:3000`.

---

## ⚠️ Disclaimer

Hidup Jokowi!!!
