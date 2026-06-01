import { useState, useEffect } from 'react'
import { getTodos, toggleTodo, createTodo, deleteTodo } from '../services/todoService'
import {
  Sparkles, Plus, Trash2, ArrowLeft,
  Coffee, Moon, BookOpen, Activity,
  Heart, Sun, Globe, Smile, ListChecks
} from 'lucide-react'
import { classNames } from '../utils/helpers'
import ProgressBar from '../components/ui/ProgressBar'
import LoadingScreen from '../components/common/LoadingScreen'

const ICONS = {
  coffee: <Coffee size={16} />,
  moon: <Moon size={16} />,
  book: <BookOpen size={16} />,
  activity: <Activity size={16} />,
  heart: <Heart size={16} />,
  sun: <Sun size={16} />,
  globe: <Globe size={16} />,
  smile: <Smile size={16} />,
  list: <ListChecks size={16} />,
  sparkles: <Sparkles size={16} />,
}

const ICON_OPTIONS = [
  { key: 'coffee', el: <Coffee size={18} /> },
  { key: 'moon', el: <Moon size={18} /> },
  { key: 'book', el: <BookOpen size={18} /> },
  { key: 'activity', el: <Activity size={18} /> },
  { key: 'heart', el: <Heart size={18} /> },
  { key: 'sun', el: <Sun size={18} /> },
  { key: 'globe', el: <Globe size={18} /> },
  { key: 'smile', el: <Smile size={18} /> },
  { key: 'list', el: <ListChecks size={18} /> },
]

const CATEGORIES = ['Mental', 'Tidur', 'Aktivitas', 'Akademik']
const PRIORITIES = ['Tinggi', 'Sedang', 'Rendah']
const QUICK_SUGGESTIONS = [
  'Minum air putih 2 liter',
  'Matikan notifikasi 1 jam',
  'Journaling 10 menit sebelum tidur',
  'Stretching ringan 5 menit',
]

const priorityConfig = {
  Tinggi: { color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
  Sedang: { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  Rendah: { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
}

const INITIAL_TODOS = [
  { id: 1, title: 'Istirahat minimal 30 menit', desc: 'Ambil jeda panjang dari layar dan tugas.', category: 'Mental', priority: 'Tinggi', icon: 'coffee', done: false },
  { id: 2, title: 'Kurangi beban tugas hari ini', desc: 'Pilih 2 tugas terpenting saja, sisanya tunda.', category: 'Akademik', priority: 'Tinggi', icon: 'book', done: true },
  { id: 3, title: 'Tidur sebelum jam 23.00', desc: 'Targetkan minimal 7 jam tidur malam ini.', category: 'Tidur', priority: 'Tinggi', icon: 'moon', done: false },
  { id: 4, title: 'Jalan santai 15 menit', desc: 'Aktivitas fisik ringan untuk menyegarkan pikiran.', category: 'Aktivitas', priority: 'Sedang', icon: 'activity', done: false },
  { id: 5, title: 'Latihan pernapasan 5 menit', desc: 'Tarik napas dalam untuk menurunkan kecemasan.', category: 'Mental', priority: 'Sedang', icon: 'heart', done: false },
  { id: 6, title: 'Paparan sinar matahari pagi', desc: '10–15 menit di pagi hari membantu ritme sirkadian.', category: 'Aktivitas', priority: 'Rendah', icon: 'sun', done: false },
]

// ── Komponen AddTodo ──────────────────────────────────────────
function AddTodo({ onBack, onSave }) {
  const [form, setForm] = useState({
    title: '', desc: '', category: 'Mental',
    priority: 'Sedang', icon: 'coffee',
  })

  const previewPriority = priorityConfig[form.priority]

  const handleQuickSuggest = (text) => setForm(p => ({ ...p, title: text }))

  return (
    <div className="p-4 pb-24 md:p-6 md:pb-6 max-w-3xl mx-auto">

      {/* Kembali */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-[#6A7282] hover:text-[#0a0a0a] mb-4 transition-colors"
      >
        <ArrowLeft size={16} /> Kembali ke daftar
      </button>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-4 md:p-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center">
            <Plus size={18} className="text-primary-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0a0a0a]">Tambah Tugas Baru</h2>
            <p className="text-xs text-[#6A7282]">Buat tugas pribadi untuk membantu kamu tetap seimbang.</p>
          </div>
        </div>

        {/* Preview */}
        <div className="flex items-start gap-3 p-3 md:p-4 bg-slate-50 rounded-xl border border-slate-100 mb-4 md:mb-6">
          <div className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0">
            {ICONS[form.icon]}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <p className="text-sm font-medium text-[#0a0a0a]">
                {form.title || 'Nama tugas akan tampil di sini'}
              </p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${previewPriority.color} ${previewPriority.bg}`}>
                {form.priority}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                {form.category}
              </span>
            </div>
            <p className="text-xs text-[#6A7282]">{form.desc || 'Deskripsi singkat (opsional)'}</p>
          </div>
        </div>

        {/* Nama Tugas */}
        <div className="mb-4 md:mb-5">
          <label className="text-sm font-medium text-[#0a0a0a] block mb-1.5">
            Nama Tugas <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            maxLength={80}
            placeholder="Contoh: Tidur sebelum jam 23.00"
            value={form.title}
            onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
            className="w-full h-11 px-4 text-sm rounded-xl border border-[#E5E7EB] bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-600 placeholder:text-slate-400"
          />
          <p className="text-xs text-slate-400 text-right mt-1">{form.title.length}/80</p>
        </div>

        {/* Deskripsi */}
        <div className="mb-4 md:mb-5">
          <label className="text-sm font-medium text-[#0a0a0a] block mb-1.5">
            Deskripsi (opsional)
          </label>
          <textarea
            maxLength={200}
            rows={3}
            placeholder="Tambahkan catatan singkat agar lebih mudah diingat."
            value={form.desc}
            onChange={e => setForm(p => ({ ...p, desc: e.target.value }))}
            className="w-full px-4 py-3 text-sm rounded-xl border border-[#E5E7EB] bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-600 placeholder:text-slate-400 resize-none"
          />
          <p className="text-xs text-slate-400 text-right mt-1">{form.desc.length}/200</p>
        </div>

        {/* Kategori */}
        <div className="mb-4 md:mb-5">
          <label className="text-sm font-medium text-[#0a0a0a] block mb-2">Kategori</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setForm(p => ({ ...p, category: cat }))}
                className={classNames(
                  'h-9 md:h-10 rounded-xl text-xs md:text-sm font-medium border-2 transition-all',
                  form.category === cat
                    ? 'bg-primary-50 border-primary-600 text-primary-700'
                    : 'bg-white border-[#E5E7EB] text-[#6A7282] hover:border-primary-300'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Prioritas */}
        <div className="mb-4 md:mb-5">
          <label className="text-sm font-medium text-[#0a0a0a] block mb-2">Prioritas</label>
          <div className="grid grid-cols-3 gap-2">
            {PRIORITIES.map(p => {
              const cfg = priorityConfig[p]
              const isActive = form.priority === p
              return (
                <button
                  key={p}
                  onClick={() => setForm(prev => ({ ...prev, priority: p }))}
                  className={classNames(
                    'h-9 md:h-10 rounded-xl text-xs md:text-sm font-medium border-2 transition-all',
                    isActive
                      ? `${cfg.bg} ${cfg.border} ${cfg.color}`
                      : 'bg-white border-[#E5E7EB] text-[#6A7282] hover:border-slate-300'
                  )}
                >
                  {p}
                </button>
              )
            })}
          </div>
        </div>

        {/* Ikon */}
        <div className="mb-4 md:mb-5">
          <label className="text-sm font-medium text-[#0a0a0a] block mb-2">Ikon</label>
          <div className="flex gap-2 flex-wrap">
            {ICON_OPTIONS.map(({ key, el }) => (
              <button
                key={key}
                onClick={() => setForm(p => ({ ...p, icon: key }))}
                className={classNames(
                  'w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all',
                  form.icon === key
                    ? 'bg-primary-50 border-primary-600 text-primary-600'
                    : 'bg-white border-[#E5E7EB] text-slate-400 hover:border-primary-300'
                )}
              >
                {el}
              </button>
            ))}
          </div>
        </div>

        {/* Saran Cepat */}
        <div className="mb-4 md:mb-6">
          <label className="text-sm font-medium text-[#0a0a0a] block mb-2">Saran cepat</label>
          <div className="flex flex-wrap gap-2">
            {QUICK_SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => handleQuickSuggest(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-[#E5E7EB] text-[#6A7282] hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={onBack}
            className="h-10 px-5 text-sm text-[#6A7282] hover:text-[#0a0a0a] hover:bg-slate-100 rounded-xl transition-all"
          >
            Batal
          </button>
          <button
            onClick={() => form.title.trim() && onSave(form)}
            disabled={!form.title.trim()}
            className="inline-flex items-center gap-2 h-10 px-5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Plus size={15} />
            Simpan Tugas
          </button>
        </div>

      </div>
    </div>
  )
}

// ── Komponen TodoItem ─────────────────────────────────────────
function TodoItem({ todo, onToggle, onDelete }) {
  const cfg = priorityConfig[todo.priority]

  return (
    <div className={classNames(
      'flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-2xl border border-slate-100',
      'hover:border-slate-200 hover:shadow-sm transition-all',
      todo.done && 'opacity-60'
    )}>

      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={classNames(
          'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
          todo.done
            ? 'bg-primary-600 border-primary-600'
            : 'border-slate-300 hover:border-primary-400'
        )}
      >
        {todo.done && (
          <svg viewBox="0 0 12 12" className="w-3 h-3">
            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Icon */}
      <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0">
        {ICONS[todo.icon] || <Coffee size={16} />}
      </div>

      {/* Konten */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 md:gap-2 flex-wrap mb-0.5">
          <p className={classNames(
            'text-[13px] md:text-sm font-medium text-[#0a0a0a] truncate',
            todo.done && 'line-through text-slate-400'
          )}>
            {todo.title}
          </p>
          <span className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full font-medium leading-none flex items-center ${cfg.color} ${cfg.bg}`}>
            {todo.priority}
          </span>
          <span className={classNames(
            'text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded-full font-bold uppercase tracking-wider leading-none flex items-center',
            todo.category.startsWith('AI')
              ? 'bg-indigo-50 text-indigo-600 border border-indigo-100'
              : 'bg-slate-100 text-slate-500 border border-slate-200'
          )}>
            {todo.category}
          </span>
        </div>
        <p className="text-xs text-[#6A7282] truncate">{todo.desc}</p>
      </div>

      {/* Delete */}
      <button
        onClick={() => onDelete(todo.id)}
        className="p-2 rounded-xl text-slate-300 hover:text-red-400 hover:bg-red-50 transition-all flex-shrink-0"
      >
        <Trash2 size={16} />
      </button>

    </div>
  )
}

// ── Halaman Utama Todo ────────────────────────────────────────
function Todo() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('Semua')
  const [showAdd, setShowAdd] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      const mapPriority = { high: 'Tinggi', medium: 'Sedang', low: 'Rendah' };
      const formatted = data.map(t => {
        let categoryName = 'Personal';
        if (t.generated_by_ai) {
          categoryName = t.source === 'gemini' ? 'AI (Gemini)' : 
                         t.source === 'fallback' ? 'AI (Fallback)' : 'AI Suggestion';
        }
        
        return {
          id: t.id,
          title: t.title,
          desc: t.description,
          priority: mapPriority[t.priority] || 'Sedang',
          category: categoryName,
          icon: t.generated_by_ai ? 'sparkles' : 'coffee',
          done: t.status === 'completed',
          source: t.source
        };
      });
      setTodos(formatted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const done = todos.filter(t => t.done).length
  const total = todos.length

  const filtered = todos.filter(t => {
    if (filter === 'Belum') return !t.done
    if (filter === 'Selesai') return t.done
    return true
  })

  const handleToggle = async (id) => {
    try {
      // Optimistic update
      setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
      await toggleTodo(id);
      loadTodos();
    } catch (error) {
      console.error(error);
      loadTodos(); // Revert on failure
    }
  }

  const handleDelete = async (id) => {
    try {
      // Optimistic update
      setTodos(prev => prev.filter(t => t.id !== id))
      await deleteTodo(id);
      loadTodos();
    } catch (error) {
      console.error(error);
      loadTodos(); // Revert on failure
    }
  }

  const handleSave = async (form) => {
    try {
      await createTodo({
        title: form.title,
        description: form.desc,
        category: form.category,
        priority: form.priority.toLowerCase(),
        icon: form.icon
      });

      await loadTodos();
      setShowAdd(false);
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan tugas");
    }
  }

  if (showAdd) {
    return <AddTodo onBack={() => setShowAdd(false)} onSave={handleSave} />
  }

  if (loading && todos.length === 0) {
    return <LoadingScreen text="Memuat to-do list..." />
  }

  return (
    <div className="p-4 pb-24 md:p-6 md:pb-6 max-w-3xl mx-auto">

      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-4 md:p-5 mb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-primary-600" />
            <span className="text-sm font-semibold text-primary-600">Rekomendasi AI</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#6A7282]">Progress</p>
            <p className="text-lg font-bold text-[#0a0a0a] leading-none">
              {done} <span className="text-sm font-normal text-[#6A7282]">/ {total}</span>
            </p>
          </div>
        </div>

        <h2 className="text-lg font-bold text-[#0a0a0a] mb-1">To-Do Hari Ini</h2>
        <p className="text-xs text-[#6A7282] mb-4">
          Daftar tindakan yang dipersonalisasi berdasarkan kondisi mental kamu. Selesaikan satu per satu untuk membantu menurunkan risiko burnout.
        </p>

        <ProgressBar value={done} max={total} color="primary" size="md" />
      </div>

      {/* Filter + Tambah */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center bg-white rounded-xl border border-slate-100 p-1 gap-0.5">
          {['Semua', 'Belum', 'Selesai'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={classNames(
                'px-3 md:px-4 py-1 md:py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all',
                filter === f
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-[#6A7282] hover:text-[#0a0a0a]'
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-1 md:gap-2 h-9 md:h-10 px-3 md:px-4 bg-primary-600 text-white text-xs md:text-sm font-semibold rounded-xl hover:bg-primary-700 active:scale-95 transition-all"
        >
          <Plus size={16} />
          Tambah Tugas
        </button>
      </div>

      {/* List Todo */}
      <div className="flex flex-col gap-2">
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-100 py-16 flex flex-col items-center justify-center text-center">
            <Sparkles size={32} className="text-primary-400 mb-3 animate-pulse" />
            <p className="text-sm font-medium text-slate-500">
              Sedang mengambil To-Do List...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 py-16 flex flex-col items-center justify-center text-center">
            <ListChecks size={32} className="text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-500">
              {filter === 'Selesai' ? 'Belum ada tugas yang selesai' : 'Tidak ada tugas'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {filter === 'Semua' && 'Tambah tugas baru untuk memulai'}
            </p>
          </div>
        ) : (
          filtered.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

    </div>
  )
}

export default Todo