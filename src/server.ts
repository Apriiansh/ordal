import express, { Request, Response } from 'express';
import { Ordal } from './index';
import { adalahOrdal, BatchCandidate, OrdalConfig } from './type';

const app = express();
app.use(express.json());

let ordalInstance: Ordal | null = null;

const defaultData: adalahOrdal[] = [
  { name: 'Mulyono', posisi: 'BOS' },
  { name: 'Anwar', posisi: 'KETUA_MK' },
];

ordalInstance = new Ordal(defaultData, { customAura: { 'KETUA_MK': 1000 } });

// Endpoint buat evaluasi single
app.post('/evaluate', (req: Request, res: Response) => {
  const { score, referenceName } = (req as any).body;
  if (!ordalInstance) return (res as any).status(500).json({ error: 'Ordal not initialized' });
  const result = ordalInstance.bypassATS(score, referenceName || '');
  (res as any).json(result);
});

// Endpoint buat batch evaluation
app.post('/evaluate-batch', (req: Request, res: Response) => {
  const { candidates }: { candidates: BatchCandidate[] } = (req as any).body;
  if (!ordalInstance) return (res as any).status(500).json({ error: 'Ordal not initialized' });
  const result = ordalInstance.evaluateBatch(candidates);
  (res as any).json(result);
});

// Endpoint buat export hasil
app.post('/export', (req: Request, res: Response) => {
  const { results, format }: { results: any[], format: 'json' | 'csv' } = (req as any).body;
  if (!ordalInstance) return (res as any).status(500).json({ error: 'Ordal not initialized' });
  const exported = ordalInstance.exportResults(results, format);
  (res as any).setHeader('Content-Type', format === 'csv' ? 'text/csv' : 'application/json');
  (res as any).send(exported);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Ordal server running on port ${PORT}`);
});