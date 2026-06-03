export const formatScore  = (score) => `${score}` // Tidak pakai % lagi, hanya angka Indeks
export const formatHours  = (hours) => `${hours} jam`
export const formatLevel  = (level) => {
  const map = { low: 'Rendah', medium: 'Sedang', high: 'Tinggi' }
  return map[level?.toLowerCase()] || level
}

export const formatBurnout = (val) => {
  if (!val) return '-';
  const l = val.toLowerCase();
  if (l === 'high' || l === 'tinggi') return 'Tinggi';
  if (l === 'medium' || l === 'sedang') return 'Sedang';
  if (l === 'low' || l === 'rendah') return 'Rendah';
  return val;
};

export const formatMental = (val) => {
  if (!val) return '-';
  const l = val.toLowerCase();
  if (l === 'baik' || l === 'good') return 'Baik';
  if (l === 'sedang' || l === 'medium') return 'Sedang';
  if (l === 'buruk' || l === 'bad') return 'Buruk';
  return val;
};

export const getBurnoutColor = (level) => {
  const l = (level || '').toLowerCase();
  if (l === 'high' || l === 'tinggi') return { text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' };
  if (l === 'medium' || l === 'sedang') return { text: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', dot: 'bg-orange-500' };
  if (l === 'low' || l === 'rendah') return { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-500' };
  return { text: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200', dot: 'bg-slate-500' };
};

export const getMentalColor = (status) => {
  const s = (status || '').toLowerCase();
  if (s === 'baik' || s === 'good') return { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-500' };
  if (s === 'sedang' || s === 'medium') return { text: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', dot: 'bg-orange-500' };
  if (s === 'buruk' || s === 'bad') return { text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' };
  return { text: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200', dot: 'bg-slate-500' };
};