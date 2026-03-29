import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { 
  Users, 
  BookOpen, 
  Settings, 
  BarChart3, 
  Plus, 
  Trash2, 
  RotateCcw, 
  History,
  Edit3,
  ThumbsUp,
  ThumbsDown, 
  Search, 
  LayoutGrid, 
  LayoutList, 
  ArrowUpAZ, 
  ArrowDownWideNarrow, 
  ArrowUpWideNarrow,
  CheckCircle2,
  XCircle,
  Download,
  Printer,
  FileJson,
  ShieldCheck,
  Cake,
  Filter,
  ChevronRight,
  Save,
  Bell,
  MessageSquare,
  Smile,
  Frown,
  Calendar,
  Clock,
  X,
  Check,
  User as UserIcon,
  BarChart2,
  Play,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Music2,
  Pin,
  ShieldAlert,
  Phone,
  AlertTriangle,
  FolderKanban,
  GraduationCap,
  AlertCircle,
  LogOut,
  Heart,
  FileText,
  Upload,
  Eye,
  EyeOff,
  Lock,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format, isWithinInterval, parseISO, startOfWeek, endOfWeek, isSameDay, eachWeekOfInterval, differenceInDays, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { 
  Turma, 
  Disciplina, 
  Aluno, 
  Ocorrencia, 
  ModeloOcorrencia, 
  Config, 
  Unidade, 
  ViewMode, 
  SortMode,
  Musica,
  Professor,
  User,
  HorarioProfessor,
  TarefaCasa,
  LimiteOcorrencia,
  AcaoCoordenacao,
  ModeloEscrita,
  Projeto,
  ProjetoTurma,
  ProjetoAluno,
  ProjetoExperiencia,
  ProjetoAtividade,
  AlunoCondicaoEspecial,
  EventoInstitucional,
  EventoPessoal,
  Responsavel,
  Nota,
  Notificacao,
  TeacherSchedule,
  Homework
} from './types';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// DiceBear Fun Emoji Collection
const getAvatarUrl = (seed: string, set: string = 'fun-emoji') => `https://api.dicebear.com/7.x/${set}/svg?seed=${seed}`;

const EMOJI_STAMPS = ['⭐', '🔥', '🏆', '💎', '🎯', '🚀', '🌈', '🎨', '📚', '💡'];

const AVATAR_OPTIONS = [
  'Grin', 'Smile', 'Wink', 'HeartEyes', 'Kissing', 'Tongue', 'Sunglasses', 'Flushed', 'Relieved',
  'Sleeping', 'Dizzy', 'Cool', 'Devil', 'Angel', 'Robot', 'Alien', 'Cat', 'Dog', 'Panda', 'Bear',
  'Lion', 'Tiger', 'Rabbit', 'Fox', 'Wolf', 'Frog', 'Dragon', 'Unicorn', 'Star', 'Moon', 'Sun',
  'Pizza', 'Burger', 'IceCream', 'Cookie', 'Soccer', 'Basketball', 'Guitar', 'VideoGame'
];

const Login = ({ onLogin, error }: { onLogin: (data: any) => void; error: string }) => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ login, senha });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-200"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
            <GraduationCap className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">EduPoint</h1>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-2">Sistema de Gestão Escolar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Usuário / E-mail</label>
            <div className="relative group">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input
                type="text"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none font-bold text-slate-700"
                placeholder="Digite seu usuário"
                autoComplete="username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Senha</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none font-bold text-slate-700"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-rose-50 text-rose-600 p-4 rounded-2xl text-sm font-bold flex items-center gap-3 border border-rose-100"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95"
          >
            Entrar no Sistema
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const ProfessorModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  professorForm, 
  disciplinas = [],
  turmas = []
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (data: any) => void; 
  professorForm: Partial<Professor>; 
  disciplinas: Disciplina[];
  turmas: Turma[];
}) => {
  const [localForm, setLocalForm] = useState<Partial<Professor>>(professorForm || {});
  const [confirmSenha, setConfirmSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen && professorForm) {
      try {
        setLocalForm({
          ...professorForm,
          disciplinas_ids: typeof professorForm.disciplinas_ids === 'string' 
            ? JSON.parse(professorForm.disciplinas_ids) 
            : (Array.isArray(professorForm.disciplinas_ids) ? professorForm.disciplinas_ids : []),
          turmas_ids: typeof professorForm.turmas_ids === 'string'
            ? JSON.parse(professorForm.turmas_ids)
            : (Array.isArray(professorForm.turmas_ids) ? professorForm.turmas_ids : [])
        });
      } catch (e) {
        setLocalForm({
          ...professorForm,
          disciplinas_ids: [],
          turmas_ids: []
        });
      }
      setConfirmSenha('');
      setShowPassword(false);
    }
  }, [isOpen, professorForm]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!localForm.id && localForm.senha !== confirmSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    if (localForm.id && localForm.senha && localForm.senha !== confirmSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    onSave(localForm);
  };

  const safeTurmas = Array.isArray(turmas) ? turmas : [];
  const safeDisciplinas = Array.isArray(disciplinas) ? disciplinas : [];
  const safeTurmasIds = Array.isArray(localForm.turmas_ids) ? localForm.turmas_ids : [];
  const safeDisciplinasIds = Array.isArray(localForm.disciplinas_ids) ? localForm.disciplinas_ids : [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="bg-indigo-600 p-6 text-white flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Users /> {localForm.id ? 'Editar Professor' : 'Novo Professor'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-all">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input 
                  type="text" 
                  value={localForm.nome || ''}
                  onChange={(e) => setLocalForm({ ...localForm, nome: e.target.value })}
                  placeholder="Nome do professor..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-bold text-slate-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Login</label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input 
                    type="text" 
                    value={localForm.login || ''}
                    onChange={(e) => setLocalForm({ ...localForm, login: e.target.value })}
                    placeholder="Login de acesso..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-bold text-slate-700"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Senha</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={localForm.senha || ''}
                    onChange={(e) => setLocalForm({ ...localForm, senha: e.target.value })}
                    placeholder={localForm.id ? "Nova senha (opcional)" : "Senha de acesso..."}
                    className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-bold text-slate-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Confirmar Senha</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={confirmSenha}
                  onChange={(e) => setConfirmSenha(e.target.value)}
                  placeholder="Confirme a senha..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-bold text-slate-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Turmas</label>
                <div className="max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  {safeTurmas.map(t => (
                    <label key={t.id} className="flex items-center gap-2 p-2 hover:bg-white rounded-lg transition-all cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={safeTurmasIds.includes(t.id)}
                        onChange={(e) => {
                          const ids = safeTurmasIds;
                          if (e.target.checked) {
                            setLocalForm({ ...localForm, turmas_ids: [...ids, t.id] });
                          } else {
                            setLocalForm({ ...localForm, turmas_ids: ids.filter(id => id !== t.id) });
                          }
                        }}
                        className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <span className="text-xs font-bold text-slate-700">{t.nome}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Disciplinas</label>
                <div className="max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  {safeDisciplinas.map(d => (
                    <label key={d.id} className="flex items-center gap-2 p-2 hover:bg-white rounded-lg transition-all cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={safeDisciplinasIds.includes(d.id)}
                        onChange={(e) => {
                          const ids = safeDisciplinasIds;
                          if (e.target.checked) {
                            setLocalForm({ ...localForm, disciplinas_ids: [...ids, d.id] });
                          } else {
                            setLocalForm({ ...localForm, disciplinas_ids: ids.filter(id => id !== d.id) });
                          }
                        }}
                        className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <span className="text-xs font-bold text-slate-700">{d.nome}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all uppercase tracking-widest text-xs"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSave}
              className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 uppercase tracking-widest text-xs"
            >
              {localForm.id ? 'Salvar Alterações' : 'Cadastrar Professor'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SecurityModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  pergunta, 
  respostaCorreta 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: (answer: string) => void; 
  pergunta: string; 
  respostaCorreta: string;
}) => {
  const [answer, setAnswer] = useState('');
  const [forgotCount, setForgotCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnswer('');
      setForgotCount(0);
      setShowAnswer(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onConfirm(answer);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="bg-indigo-600 p-6 text-white text-center">
          <ShieldCheck size={48} className="mx-auto mb-4" />
          <h3 className="text-xl font-bold">Ação Crítica</h3>
          <p className="text-indigo-100 text-sm mt-1">Esta ação exige confirmação de segurança</p>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pergunta</label>
            <p className="font-bold text-slate-800 text-lg">{pergunta}</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sua Resposta</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-bold"
              placeholder="Digite a resposta..."
              autoFocus
            />
          </div>
          {showAnswer && (
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-800 text-center font-bold animate-pulse">
              A resposta é: {respostaCorreta}
            </div>
          )}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
            >
              CONFIRMAR AÇÃO
            </button>
            <button
              onClick={() => {
                setForgotCount(prev => prev + 1);
                if (forgotCount >= 4) setShowAnswer(true);
              }}
              className="text-sm font-bold text-slate-400 hover:text-indigo-600 transition-all"
            >
              Esqueci a resposta ({Math.max(0, 5 - forgotCount)} tentativas restantes)
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  // State
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [modelos, setModelos] = useState<ModeloOcorrencia[]>([]);
  const [config, setConfig] = useState<Config | null>(null);
  const [musicas, setMusicas] = useState<Musica[]>([]);
  const [horarios, setHorarios] = useState<HorarioProfessor[]>([]);
  const [tarefas, setTarefas] = useState<TarefaCasa[]>([]);
  const [limitesOcorrencias, setLimitesOcorrencias] = useState<LimiteOcorrencia[]>([]);
  const [acoesCoordenacao, setAcoesCoordenacao] = useState<AcaoCoordenacao[]>([]);
  
  const [ocorrenciasLimit, setOcorrenciasLimit] = useState(10);
  const [selectedOcorrencias, setSelectedOcorrencias] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'alunos' | 'turmas' | 'disciplinas' | 'ocorrencias' | 'ranking' | 'config' | 'musicas' | 'horario' | 'relatorios' | 'projetos' | 'laudados' | 'agenda' | 'coordenacao' | 'professor' | 'ocorrencias_old' | 'musica_old' | 'horario_escolar_old' | 'cadastro' | 'ruido' | 'acoes_coordenacao' | 'alunos_especiais' | 'dashboard' | 'calendario' | 'responsaveis' | 'notificacoes'>('turmas');
  const [coordenacaoSubTab, setCoordenacaoSubTab] = useState<'alunos' | 'professores' | 'agenda' | 'acoes' | 'responsaveis'>('alunos');
  const [selectedTurmaId, setSelectedTurmaId] = useState<number>(0);
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<Aluno | null>(null);
  const [occurrenceFilter, setOccurrenceFilter] = useState<'all' | 'positive' | 'negative'>('all');
  const [scheduleFilterTurmaId, setScheduleFilterTurmaId] = useState<number | 'all'>('all');
  const [scheduleFilterDisciplineIds, setScheduleFilterDisciplineIds] = useState<number[]>([]);
  const [scheduleFilterProfessorId, setScheduleFilterProfessorId] = useState<number | 'all'>(() => {
    const pinned = localStorage.getItem('pinnedProfessorId');
    return pinned ? (pinned === 'all' ? 'all' : Number(pinned)) : 'all';
  });
  const [isProfessorPinned, setIsProfessorPinned] = useState(() => !!localStorage.getItem('pinnedProfessorId'));
  const [scheduleView, setScheduleView] = useState<'individual' | 'geral'>('individual');
  const [scheduleDisciplineId, setScheduleDisciplineId] = useState<number>(0);
  const [newScheduleEntry, setNewScheduleEntry] = useState<Partial<HorarioProfessor>>({
    dia_semana: 1,
    aula_numero: 1,
    turma_id: 0,
    disciplina_id: 0,
    professor_id: 0
  });
  const [isSavingSchedule, setIsSavingSchedule] = useState(false);
  const [showAllClasses, setShowAllClasses] = useState(false);
  const [draftHorario, setDraftHorario] = useState<{[key: string]: {turma_id: number, disciplina_id: number, professor_id: number, inicio: string, fim: string}}>({});
  const [newProfessorName, setNewProfessorName] = useState('');
  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(null);
  const [professorForm, setProfessorForm] = useState<Partial<Professor>>({
    nome: '',
    login: '',
    senha: '',
    disciplinas_ids: [] as any,
    turmas_ids: [] as any
  });
  const [showProfessorModal, setShowProfessorModal] = useState(false);
  const [dashboardFilter, setDashboardFilter] = useState<'all' | 'positive' | 'negative'>('all');
  const [showActionModal, setShowActionModal] = useState(false);
  const [lastAddedScheduleId, setLastAddedScheduleId] = useState<number | null>(null);
  const [currentNoiseLevel, setCurrentNoiseLevel] = useState(0);
  const [isFixingConfig, setIsFixingConfig] = useState(false);
  
  // Reset Parcial State
  const [resetOptions, setResetOptions] = useState({
    ocorrencias: false,
    disciplinas: false,
    professores: false,
    turmas: false
  });
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  const [resetConfirmationText, setResetConfirmationText] = useState('');
  
  const ALARM_SOUNDS = useMemo(() => {
    const baseSounds = [
      { name: 'Escolar (Campainha)', url: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3' },
      { name: 'Sirene Policial', url: 'https://assets.mixkit.co/active_storage/sfx/2567/2567-preview.mp3' },
      { name: 'Apito Juiz', url: 'https://assets.mixkit.co/active_storage/sfx/2566/2566-preview.mp3' },
      { name: 'Alarme Digital', url: 'https://assets.mixkit.co/active_storage/sfx/2565/2565-preview.mp3' },
      { name: 'Som Divertido 1', url: 'https://assets.mixkit.co/active_storage/sfx/2564/2564-preview.mp3' },
      { name: 'Som Divertido 2', url: 'https://assets.mixkit.co/active_storage/sfx/2563/2563-preview.mp3' },
      { name: 'Buzina Ar', url: 'https://assets.mixkit.co/active_storage/sfx/2562/2562-preview.mp3' },
      { name: 'Sino Igreja', url: 'https://assets.mixkit.co/active_storage/sfx/2561/2561-preview.mp3' },
      { name: 'Alarme Emergência', url: 'https://assets.mixkit.co/active_storage/sfx/2560/2560-preview.mp3' },
      { name: 'Som Espacial', url: 'https://assets.mixkit.co/active_storage/sfx/2559/2559-preview.mp3' }
    ];
    
    const sounds = [];
    for (let i = 0; i < 100; i++) {
      const base = baseSounds[i % baseSounds.length];
      sounds.push({
        id: String(i + 1),
        name: `${base.name} ${Math.floor(i / baseSounds.length) + 1}`,
        url: base.url
      });
    }
    return sounds;
  }, []);
  const [selectedStudentForAction, setSelectedStudentForAction] = useState<Aluno | null>(null);
  const [actionDescription, setActionDescription] = useState('');
  const [actionType, setActionType] = useState<'coordenacao' | 'familia'>('coordenacao');
  const [newSchedule, setNewSchedule] = useState({
    dia_semana: 1,
    turma_id: 0,
    disciplina_id: 0,
    professor_id: 0,
    inicio: '',
    fim: ''
  });
  const musicFileInputRef = useRef<HTMLInputElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid-md');
  const [sortMode, setSortMode] = useState<SortMode>('az');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnidadeId, setSelectedUnidadeId] = useState<number>(1);
  const [alertDisciplineIds, setAlertDisciplineIds] = useState<number[]>([]);
  const [selectedBonusWeek, setSelectedBonusWeek] = useState<{start: string, end: string} | null>(null);
  const [currentMusica, setCurrentMusica] = useState<Musica | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [occurrenceTypeFilter, setOccurrenceTypeFilter] = useState<'all' | 'positive' | 'negative'>('all');
  const [cadastroTurmaFilter, setCadastroTurmaFilter] = useState<number>(0);
  const [eventosInstitucionais, setEventosInstitucionais] = useState<EventoInstitucional[]>([]);
  const [eventosPessoais, setEventosPessoais] = useState<EventoPessoal[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [professorLogadoId, setProfessorLogadoId] = useState<number | null>(null);
  const [lembretesOcultos, setLembretesOcultos] = useState<number[]>([]);
  const [professorSubTab, setProfessorSubTab] = useState<'horario' | 'agenda'>('horario');
  const [showEventModal, setShowEventModal] = useState(false);
  const [showOccurrenceViewModal, setShowOccurrenceViewModal] = useState(false);
  const [selectedStudentForOccurrenceView, setSelectedStudentForOccurrenceView] = useState<Aluno | null>(null);
  const [editingExperiencia, setEditingExperiencia] = useState<ProjetoExperiencia | null>(null);
  const [eventType, setEventType] = useState<'institucional' | 'pessoal'>('institucional');
  const [newEvent, setNewEvent] = useState<Partial<EventoInstitucional | EventoPessoal>>({
    titulo: '',
    descricao: '',
    data: format(new Date(), 'yyyy-MM-dd'),
    tipo: 'evento'
  });

  // Noise Meter State
  const [noiseMeterActive, setNoiseMeterActive] = useState(false);
  const [noiseThreshold, setNoiseThreshold] = useState(70);
  const [noiseAlertSound, setNoiseAlertSound] = useState('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'); // Siren
  const noiseAudioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const noiseIntervalRef = useRef<number | null>(null);
  
  // Occurrence Form State
  const [formAlunoId, setFormAlunoId] = useState<number>(0);
  const [formDisciplinaId, setFormDisciplinaId] = useState<number>(0);
  const [formTipo, setFormTipo] = useState<number>(1);
  const [formPontos, setFormPontos] = useState<number>(1);
  const [formDescricao, setFormDescricao] = useState<string>('');
  const [sendSms, setSendSms] = useState<boolean>(false);

  // Report Filter State
  const [reportStartDate, setReportStartDate] = useState<string>('');
  const [reportEndDate, setReportEndDate] = useState<string>('');
  
  // Projetos State
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [projetoTurmas, setProjetoTurmas] = useState<ProjetoTurma[]>([]);
  const [projetoAlunos, setProjetoAlunos] = useState<ProjetoAluno[]>([]);
  const [projetoExperiencias, setProjetoExperiencias] = useState<ProjetoExperiencia[]>([]);
  const [selectedProjetoId, setSelectedProjetoId] = useState<number | null>(null);
  const [projetoAccessCode, setProjetoAccessCode] = useState('');
  const [isProjetoUnlocked, setIsProjetoUnlocked] = useState(false);
  const [showCreateProjetoModal, setShowCreateProjetoModal] = useState(false);
  const [showCreateProjetoTurmaModal, setShowCreateProjetoTurmaModal] = useState(false);
  const [showImportTurmaModal, setShowImportTurmaModal] = useState(false);
  const [showAddProjetoAlunoModal, setShowAddProjetoAlunoModal] = useState(false);
  const [showRegistrarExperienciaModal, setShowRegistrarExperienciaModal] = useState(false);
  const [projetoAtividades, setProjetoAtividades] = useState<ProjetoAtividade[]>([]);
  const [showCreateProjetoAtividadeModal, setShowCreateProjetoAtividadeModal] = useState(false);
  const [newProjetoAtividade, setNewProjetoAtividade] = useState<Partial<ProjetoAtividade>>({
    titulo: '',
    descricao: '',
    data_execucao: format(new Date(), 'yyyy-MM-dd')
  });

  // Alunos Laudados State
  const [alunosEspeciais, setAlunosEspeciais] = useState<AlunoCondicaoEspecial[]>([]);
  const [teacherSchedules, setTeacherSchedules] = useState<TeacherSchedule[]>([]);
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedProfessorForSchedule, setSelectedProfessorForSchedule] = useState<Professor | null>(null);
  const [showHomeworkModal, setShowHomeworkModal] = useState(false);
  const [selectedScheduleForHomework, setSelectedScheduleForHomework] = useState<TeacherSchedule | null>(null);
  const [showCadastrarAlunoEspecialModal, setShowCadastrarAlunoEspecialModal] = useState(false);
  const [selectedAlunoEspecial, setSelectedAlunoEspecial] = useState<AlunoCondicaoEspecial | null>(null);
  const [showPlanoAcompanhamentoModal, setShowPlanoAcompanhamentoModal] = useState(false);
  const [reportTurmaId, setReportTurmaId] = useState<string>('all');
  const [reportDisciplineId, setReportDisciplineId] = useState<string>('all');
  const [reportStudentId, setReportStudentId] = useState<string>('all');
  const [reportOccurrenceType, setReportOccurrenceType] = useState<'all' | 'positive' | 'negative'>('all');
  const [reportChartType, setReportChartType] = useState<'bar' | 'pie' | 'line' | 'area'>('bar');
  const [reportSortOrder, setReportSortOrder] = useState<'alphabetical' | 'turma' | 'occurrences-desc' | 'occurrences-asc'>('alphabetical');
  const [reportGroupByTurma, setReportGroupByTurma] = useState(false);
  const [reportSortAlphabetical, setReportSortAlphabetical] = useState(true);
  const [reportSortMostOccurrences, setReportSortMostOccurrences] = useState(false);
  const [reportSortLeastOccurrences, setReportSortLeastOccurrences] = useState(false);
  const [reportFontSize, setReportFontSize] = useState(12);
  const [reportView, setReportView] = useState<'occurrences' | 'homework'>('occurrences');
  
  const [modelosEscrita, setModelosEscrita] = useState<ModeloEscrita[]>([]);
  const [showStudentOccurrencesModal, setShowStudentOccurrencesModal] = useState(false);
  const [studentOccurrencesFilter, setStudentOccurrencesFilter] = useState<'all' | 'positive' | 'negative'>('all');
  const [showManualActionModal, setShowManualActionModal] = useState(false);
  const [manualActionSearch, setManualActionSearch] = useState('');
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const [selectedActionForResolution, setSelectedActionForResolution] = useState<AcaoCoordenacao | null>(null);
  const [resolutionText, setResolutionText] = useState('');
  const [showOriginalTextModal, setShowOriginalTextModal] = useState(false);
  const [resolvedSearchTerm, setResolvedSearchTerm] = useState('');
  const [notas, setNotas] = useState<Nota[]>([]);
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([]);
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [showNotaModal, setShowNotaModal] = useState(false);
  const [selectedStudentForNota, setSelectedStudentForNota] = useState<Aluno | null>(null);
  const [newNota, setNewNota] = useState({ valor: 0, disciplina_id: 0, projeto_id: 0, data: format(new Date(), 'yyyy-MM-dd'), descricao: '' });
  const [showModeloEscritaModal, setShowModeloEscritaModal] = useState(false);
  const [newModeloEscrita, setNewModeloEscrita] = useState({ titulo: '', texto: '' });
  const [originalText, setOriginalText] = useState('');
  
  // Undo/Redo State
  const [history, setHistory] = useState<Ocorrencia[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Memoized Report Data
  const reportData = useMemo(() => {
    const filtered = ocorrencias.filter(o => {
      const aluno = alunos.find(a => a.id === o.aluno_id);
      if (!aluno) return false;
      
      const inTurma = reportTurmaId === 'all' || aluno.turma_id === Number(reportTurmaId);
      const inStudent = reportStudentId === 'all' || aluno.id === Number(reportStudentId);
      const inDiscipline = reportDisciplineId === 'all' || o.disciplina_id === Number(reportDisciplineId);
      const inDateRange = (!reportStartDate || o.data >= reportStartDate) && 
                         (!reportEndDate || o.data <= reportEndDate);
      
      const matchesType = reportOccurrenceType === 'all' || 
                         (reportOccurrenceType === 'positive' && o.tipo === 1) ||
                         (reportOccurrenceType === 'negative' && o.tipo === -1);
      
      return inTurma && inStudent && inDiscipline && inDateRange && matchesType;
    });

    // Group by student
    const grouped: { [key: number]: { aluno: Aluno, occurrences: Ocorrencia[] } } = {};
    filtered.forEach(o => {
      if (!grouped[o.aluno_id]) {
        const aluno = alunos.find(a => a.id === o.aluno_id);
        if (aluno) {
          grouped[o.aluno_id] = { aluno, occurrences: [] };
        }
      }
      if (grouped[o.aluno_id]) {
        grouped[o.aluno_id].occurrences.push(o);
      }
    });

    let result = Object.values(grouped);

    // Apply sorting
    result.sort((a, b) => {
      // 1. Group by Turma if active
      if (reportGroupByTurma) {
        const turmaA = turmas.find(t => t.id === a.aluno.turma_id)?.nome || '';
        const turmaB = turmas.find(t => t.id === b.aluno.turma_id)?.nome || '';
        const turmaComp = turmaA.localeCompare(turmaB);
        if (turmaComp !== 0) return turmaComp;
      }

      // 2. Sort by Occurrences if active
      if (reportSortMostOccurrences) {
        const diff = b.occurrences.length - a.occurrences.length;
        if (diff !== 0) return diff;
      }
      if (reportSortLeastOccurrences) {
        const diff = a.occurrences.length - b.occurrences.length;
        if (diff !== 0) return diff;
      }

      // 3. Alphabetical if active (or as fallback)
      if (reportSortAlphabetical) {
        return a.aluno.nome.localeCompare(b.aluno.nome);
      }

      return 0;
    });

    return result;
  }, [ocorrencias, alunos, turmas, reportTurmaId, reportStudentId, reportDisciplineId, reportStartDate, reportEndDate, reportOccurrenceType, reportGroupByTurma, reportSortAlphabetical, reportSortMostOccurrences, reportSortLeastOccurrences]);

  const filteredTimeSlots = useMemo(() => {
    const isFiltering = scheduleFilterTurmaId !== 'all' || scheduleFilterDisciplineIds.length > 0 || (scheduleFilterProfessorId !== 'all' && scheduleFilterProfessorId !== 0);
    
    let slots = new Set<string>();
    
    // Always include slots that have at least one matching record
    horarios.forEach(h => {
      const matchesProfessor = scheduleFilterProfessorId === 'all' || h.professor_id === scheduleFilterProfessorId;
      const matchesTurma = scheduleFilterTurmaId === 'all' || h.turma_id === scheduleFilterTurmaId;
      const matchesDisciplina = scheduleFilterDisciplineIds.length === 0 || scheduleFilterDisciplineIds.includes(h.disciplina_id);
      
      if (matchesProfessor && matchesTurma && matchesDisciplina) {
        slots.add(`${h.horario_inicio} - ${h.horario_fim}`);
      }
    });

    // If not filtering, also include all other existing slots
    if (!isFiltering) {
      horarios.forEach(h => slots.add(`${h.horario_inicio} - ${h.horario_fim}`));
    }

    // Always include slots from draftHorario
    Object.keys(draftHorario).forEach(k => {
      const slot = k.split('|')[1];
      slots.add(slot);
    });

    return Array.from(slots).filter(t => t && t !== ' - ').sort((a, b) => {
      if (a.startsWith('new-') && !b.startsWith('new-')) return 1;
      if (!a.startsWith('new-') && b.startsWith('new-')) return -1;
      return a.localeCompare(b);
    });
  }, [horarios, scheduleFilterTurmaId, scheduleFilterDisciplineIds, scheduleFilterProfessorId, draftHorario]);

  const updateTimeSlot = async (oldTime: string, newStart: string, newEnd: string) => {
    const isNewRow = oldTime.startsWith('new-');
    if (isNewRow) {
      setDraftHorario(prev => {
        const next = { ...prev };
        [1, 2, 3, 4, 5].forEach(day => {
          const key = `${day}|${oldTime}`;
          next[key] = { 
            ...(next[key] || {}),
            inicio: newStart, 
            fim: newEnd,
            professor_id: next[key]?.professor_id || (scheduleFilterProfessorId === 'all' ? 0 : scheduleFilterProfessorId)
          };
        });
        return next;
      });
      return;
    }

    const [oldStart, oldEnd] = oldTime.split(' - ');
    try {
      await fetch('/api/horario/time-slot', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          old_inicio: oldStart,
          old_fim: oldEnd,
          new_inicio: newStart,
          new_fim: newEnd,
          professor_id: scheduleFilterProfessorId === 'all' ? null : scheduleFilterProfessorId
        })
      });
      fetchData();
    } catch (error) {
      console.error("Error updating time slot", error);
    }
  };

  const handleAutoSaveHorario = async (day: number, aulaNum: number, field: string, value: any, forcedTurmaId?: number, forcedProfessorId?: number) => {
    const h = horarios.find(hor => 
      hor.dia_semana === day && 
      hor.aula_numero === aulaNum && 
      (forcedTurmaId ? hor.turma_id === forcedTurmaId : (scheduleFilterProfessorId === 'all' ? true : hor.professor_id === scheduleFilterProfessorId))
    );
    const draft = draftHorario[`${day}|${aulaNum}`];
    
    // Get time from another entry with same aulaNum if available
    const sameAulaEntry = horarios.find(hor => hor.aula_numero === aulaNum);
    const defaultStart = sameAulaEntry?.horario_inicio || '07:00';
    const defaultEnd = sameAulaEntry?.horario_fim || '07:50';

    const current = {
      turma_id: forcedTurmaId || h?.turma_id || draft?.turma_id || 0,
      disciplina_id: h?.disciplina_id || draft?.disciplina_id || 0,
      professor_id: forcedProfessorId || h?.professor_id || draft?.professor_id || (scheduleFilterProfessorId === 'all' ? 0 : scheduleFilterProfessorId),
      inicio: h?.horario_inicio || draft?.inicio || defaultStart,
      fim: h?.horario_fim || draft?.fim || defaultEnd,
      aula_numero: aulaNum,
      ...draft,
      [field]: value
    };

    if (current.turma_id && current.disciplina_id && current.professor_id && current.inicio && current.fim) {
      const entry = {
        dia_semana: day,
        horario_inicio: current.inicio,
        horario_fim: current.fim,
        turma_id: current.turma_id,
        disciplina_id: current.disciplina_id,
        professor_id: current.professor_id,
        aula_numero: aulaNum
      };

      try {
        await fetch('/api/horario/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entries: [entry] })
        });
        
        setDraftHorario(prev => {
          const next = { ...prev };
          delete next[`${day}|${aulaNum}`];
          return next;
        });
        fetchData();
      } catch (error) {
        console.error("Auto-save failed", error);
      }
    } else {
      setDraftHorario(prev => ({
        ...prev,
        [`${day}|${aulaNum}`]: current
      }));
    }
  };
  
  // Noise Meter Logic
  useEffect(() => {
    if (noiseMeterActive) {
      const startMic = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const analyser = audioContext.createAnalyser();
          const microphone = audioContext.createMediaStreamSource(stream);
          
          analyser.fftSize = 256;
          microphone.connect(analyser);
          
          audioContextRef.current = audioContext;
          analyserRef.current = analyser;
          microphoneRef.current = microphone;
          
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          
          noiseIntervalRef.current = window.setInterval(() => {
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
              sum += dataArray[i];
            }
            const average = sum / bufferLength;
            const level = Math.min(100, Math.round((average / 128) * 100));
            setCurrentNoiseLevel(level);
            
            if (level > noiseThreshold) {
              if (noiseAudioRef.current && noiseAudioRef.current.paused) {
                noiseAudioRef.current.play().catch(e => console.error("Audio play failed", e));
              }
            }
          }, 100);
        } catch (err) {
          console.error("Microphone access denied", err);
          setNoiseMeterActive(false);
          setToast({ message: "Acesso ao microfone negado!", type: 'error' });
          setTimeout(() => setToast(null), 3000);
        }
      };
      startMic();
    } else {
      if (noiseIntervalRef.current) clearInterval(noiseIntervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
      if (microphoneRef.current) microphoneRef.current.mediaStream.getTracks().forEach(t => t.stop());
      setCurrentNoiseLevel(0);
    }
    
    return () => {
      if (noiseIntervalRef.current) clearInterval(noiseIntervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [noiseMeterActive, noiseThreshold]);
  const [selectionState, setSelectionState] = useState<'inactive' | 'active' | 'all'>('inactive');
  const [selectedAlunos, setSelectedAlunos] = useState<Set<number>>(new Set());
  
  // Security State
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isOccurrenceModalOpen, setIsOccurrenceModalOpen] = useState(false);
  const [isCreateStudentModalOpen, setIsCreateStudentModalOpen] = useState(false);
  const [isEditStudentModalOpen, setIsEditStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Aluno | null>(null);
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [newStudentData, setNewStudentData] = useState({
    nome: '',
    turma_id: 0,
    data_nascimento: '2012-01-01'
  });
  const [securityAction, setSecurityAction] = useState<{ type: 'delete-aluno' | 'reset-aluno' | 'delete-turma' | 'reset-horario', id: number } | null>(null);
  const [showDeveloperInfo, setShowDeveloperInfo] = useState(false);
  const [showTarefaModal, setShowTarefaModal] = useState(false);
  const [selectedHorarioForTarefa, setSelectedHorarioForTarefa] = useState<HorarioProfessor | null>(null);
  const [tarefaDescricao, setTarefaDescricao] = useState('');
  const [duplicateConfirmData, setDuplicateConfirmData] = useState<{
    ids: number[];
    data: any;
    isQuick?: boolean;
  } | null>(null);
  
  // Backup State
  const [directoryHandle, setDirectoryHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const lastChangeRef = useRef<number>(Date.now());

  // Fetch Data
  useEffect(() => {
    if (config?.unidades) {
      const today = new Date().toISOString().split('T')[0];
      const currentUnidade = config.unidades.find(u => today >= u.inicio && today <= u.fim);
      if (currentUnidade) {
        setSelectedUnidadeId(currentUnidade.id);
      }
    }
  }, [config]);

  const [cadastroAlunos, setCadastroAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    if (activeTab === 'cadastro') {
      setCadastroAlunos([...alunos]);
    }
  }, [activeTab, alunos]);

  const handleUpdateCadastroAluno = (id: number, field: keyof Aluno, value: any) => {
    setCadastroAlunos(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const handleSaveSchedule = async (scheduleData: Omit<TeacherSchedule, 'id'>) => {
    try {
      const res = await fetch('/api/teacher_schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scheduleData)
      });
      if (res.ok) {
        const newSchedule = await res.json();
        const scheduleWithId = { ...scheduleData, id: newSchedule.id };
        setTeacherSchedules([...teacherSchedules, scheduleWithId]);
        setLastAddedScheduleId(newSchedule.id);
        setTimeout(() => setLastAddedScheduleId(null), 3000);
        setToast({ message: "Horário cadastrado com sucesso!", type: 'success' });
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error("Error saving schedule:", err);
    }
  };

  const handleDeleteSchedule = async (id: number) => {
    try {
      const res = await fetch(`/api/teacher_schedule/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTeacherSchedules(teacherSchedules.filter(s => s.id !== id));
        setToast({ message: "Horário removido!", type: 'success' });
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error("Error deleting schedule:", err);
    }
  };

  const handleSaveHomework = async (homeworkData: Omit<Homework, 'id'>) => {
    try {
      const res = await fetch('/api/homework', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(homeworkData)
      });
      if (res.ok) {
        const newHomework = await res.json();
        setHomeworks([...homeworks, { ...homeworkData, id: newHomework.id }]);
        
        // Generate reminders for students in the class group
        const targetTurma = turmas.find(t => t.nome === homeworkData.class_group);
        if (targetTurma) {
          const studentsInTurma = alunos.filter(a => a.turma_id === targetTurma.id);
          for (const student of studentsInTurma) {
            await fetch('/api/notificacoes', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                tipo: 'tarefa',
                data: homeworkData.date_created,
                conteudo: `Tarefa de Casa: ${homeworkData.subject} - ${homeworkData.class_group}: ${homeworkData.description}`,
                aluno_id: student.id
              })
            });
          }
        }
        
        setToast({ message: "Tarefa salva e lembretes gerados!", type: 'success' });
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error("Error saving homework:", err);
    }
  };

  const handleDeleteHomework = async (id: number) => {
    try {
      const res = await fetch(`/api/homework/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setHomeworks(homeworks.filter(h => h.id !== id));
        setToast({ message: "Tarefa removida!", type: 'success' });
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error("Error deleting homework:", err);
    }
  };
  const handleSaveProfessor = async (data: any) => {
    if (!data || !data.nome || !data.login) {
      setToast({ message: "Nome e Login são obrigatórios!", type: 'error' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    const method = data.id ? 'PUT' : 'POST';
    const url = data.id ? `/api/professores/${data.id}` : '/api/professores';
    
    // Stringify IDs for the API
    const payload = {
      ...data,
      disciplinas_ids: JSON.stringify(data.disciplinas_ids || []),
      turmas_ids: JSON.stringify(data.turmas_ids || [])
    };

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      fetchData();
      setShowProfessorModal(false);
      setEditingProfessor(null);
      setProfessorForm({ nome: '', login: '', senha: '', disciplinas_ids: [] as any, turmas_ids: [] as any });
      setToast({ message: data.id ? "Professor atualizado!" : "Professor cadastrado!", type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Failed to save professor", err);
      setToast({ message: "Erro ao salvar professor.", type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleDeleteProfessor = async (id: number) => {
    if (!confirm("Deseja excluir este professor?")) return;
    try {
      await fetch(`/api/professores/${id}`, { method: 'DELETE' });
      fetchData();
      setToast({ message: "Professor excluído!", type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Failed to delete professor", err);
    }
  };

  const handleSaveCadastro = async () => {
    try {
      const changed = cadastroAlunos.filter(ca => {
        const original = alunos.find(a => a.id === ca.id);
        return JSON.stringify(original) !== JSON.stringify(ca);
      });

      if (changed.length === 0) {
        setToast({ message: "Nenhuma alteração detectada.", type: 'success' });
        setTimeout(() => setToast(null), 3000);
        return;
      }

      await Promise.all(changed.map(a => 
        fetch(`/api/alunos/${a.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(a)
        })
      ));

      await fetchData();
      setToast({ message: "Alterações salvas com sucesso!", type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Save failed", err);
      setToast({ message: "Falha ao salvar alterações.", type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleUpdateConfig = async (newConfig: Config) => {
    try {
      await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig)
      });
      setConfig(newConfig);
      fetchData();
    } catch (err) {
      console.error("Failed to update config", err);
    }
  };

  const handleSaveLimite = async (tipo: 'coordenacao' | 'familia', limite: number, turmaIds: number[]) => {
    try {
      const existing = limitesOcorrencias.find(l => l.tipo === tipo);
      const method = existing ? 'PUT' : 'POST';
      const url = existing ? `/api/limites-ocorrencias/${existing.id}` : '/api/limites-ocorrencias';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo, limite, turmas_ids: JSON.stringify(turmaIds) })
      });
      fetchData();
      setToast({ message: "Configuração salva!", type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Failed to save limit", err);
    }
  };

  const handleSaveAction = async () => {
    if (!selectedStudentForAction || !actionDescription) return;
    try {
      await fetch('/api/acoes-coordenacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aluno_id: selectedStudentForAction.id,
          tipo: actionType,
          descricao: actionDescription,
          data: new Date().toISOString().split('T')[0],
          resolvido: 0,
          texto_original: actionDescription
        })
      });
      setShowActionModal(false);
      setActionDescription('');
      fetchData();
      setToast({ message: "Ação registrada!", type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Failed to save action", err);
    }
  };

  const handleResolveAction = async () => {
    if (!selectedActionForResolution || !resolutionText) return;
    try {
      await fetch(`/api/acoes-coordenacao/${selectedActionForResolution.id}/resolve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data_resolvido: new Date().toISOString().split('T')[0],
          resolucao_coordenacao: resolutionText
        })
      });
      setShowResolutionModal(false);
      setResolutionText('');
      setSelectedActionForResolution(null);
      fetchData();
      setToast({ message: "Ação marcada como resolvida!", type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Failed to resolve action", err);
    }
  };

  const handleReopenAction = async (id: number) => {
    try {
      await fetch(`/api/acoes-coordenacao/${id}/reopen`, { method: 'PUT' });
      fetchData();
      setToast({ message: "Ação reaberta!", type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Failed to reopen action", err);
    }
  };

  const handleToggleActionResolved = async (action: AcaoCoordenacao) => {
    try {
      if (action.resolvido) {
        await handleReopenAction(action.id);
      } else {
        setSelectedActionForResolution(action);
        setShowResolutionModal(true);
      }
    } catch (err) {
      console.error("Failed to toggle action resolution", err);
    }
  };

  const handleSaveModeloEscrita = async () => {
    if (!newModeloEscrita.titulo || !newModeloEscrita.texto) return;
    try {
      await fetch('/api/modelos-escrita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newModeloEscrita)
      });
      setNewModeloEscrita({ titulo: '', texto: '' });
      setShowModeloEscritaModal(false);
      fetchData();
    } catch (err) {
      console.error("Failed to save model", err);
    }
  };

  const handleDeleteModeloEscrita = async (id: number) => {
    try {
      await fetch(`/api/modelos-escrita/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error("Failed to delete model", err);
    }
  };

  const handleDeleteAction = async (id: number) => {
    if (!confirm("Excluir este registro de ação?")) return;
    try {
      await fetch(`/api/acoes-coordenacao/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error("Failed to delete action", err);
    }
  };

  const handleToggleActionResolution = async (id: number, resolved: boolean) => {
    try {
      const response = await fetch(`/api/acoes-coordenacao/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resolvido: resolved ? 1 : 0 })
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error toggling action resolution:', error);
    }
  };

  const handleCreateEvent = async () => {
    if (!newEvent.titulo || !newEvent.data) return;
    
    const endpoint = eventType === 'institucional' ? '/api/eventos-institucionais' : '/api/eventos-pessoais';
    const body = eventType === 'institucional' ? newEvent : { ...newEvent, professor_id: professorLogadoId };

    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      setNewEvent({ titulo: '', descricao: '', data: format(new Date(), 'yyyy-MM-dd'), tipo: 'evento' });
      setShowEventModal(false);
      fetchData();
    } catch (err) {
      console.error("Failed to create event", err);
    }
  };

  const handleDeleteEvent = async (id: number, type: 'institucional' | 'pessoal') => {
    if (!confirm("Excluir este evento?")) return;
    const endpoint = type === 'institucional' ? `/api/eventos-institucionais/${id}` : `/api/eventos-pessoais/${id}`;
    try {
      await fetch(endpoint, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error("Failed to delete event", err);
    }
  };

  const handleCreateNota = async () => {
    if (!selectedStudentForNota || !newNota.valor || !newNota.disciplina_id) return;
    try {
      await fetch('/api/notas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newNota,
          aluno_id: selectedStudentForNota.id,
          professor_id: professorLogadoId || 1 // Fallback for coordinator
        })
      });
      setNewNota({ valor: 0, disciplina_id: 0, data: format(new Date(), 'yyyy-MM-dd'), bimestre: 1, tipo: 'prova' });
      setShowNotaModal(false);
      fetchData();
    } catch (err) {
      console.error("Failed to create nota", err);
    }
  };

  const handleCreateProjetoAtividade = async () => {
    if (!newProjetoAtividade.titulo || !newProjetoAtividade.data_execucao || !selectedProjetoId) return;
    try {
      await fetch('/api/projeto-atividades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProjetoAtividade, projeto_id: selectedProjetoId })
      });
      setNewProjetoAtividade({ titulo: '', descricao: '', data_execucao: format(new Date(), 'yyyy-MM-dd') });
      setShowCreateProjetoAtividadeModal(false);
      fetchData();
    } catch (err) {
      console.error("Failed to create project activity", err);
    }
  };

  const handleDeleteProjetoAtividade = async (id: number) => {
    if (!confirm("Excluir esta atividade do cronograma?")) return;
    try {
      await fetch(`/api/projeto-atividades/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error("Failed to delete project activity", err);
    }
  };

  const fetchData = async () => {
    if (!user) return;

    const safeFetch = async (url: string, isObject = false) => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          if (res.status === 401) {
            setUser(null);
          }
          return isObject ? null : [];
        }
        const data = await res.json();
        if (isObject) return data;
        return Array.isArray(data) ? data : [];
      } catch (err) {
        console.error(`Error fetching ${url}:`, err);
        return isObject ? null : [];
      }
    };

      try {
        const [t, d, p, a, o, m, c, mus, hor, tar, lim, aco, esc, proj, projT, projA, projE, aluE, ei, ep, projAtiv, n, r, notif, sch, hom] = await Promise.all([
          safeFetch('/api/turmas'),
          safeFetch('/api/disciplinas'),
          safeFetch('/api/professores'),
          safeFetch('/api/alunos'),
          safeFetch('/api/ocorrencias'),
          safeFetch('/api/modelos'),
          safeFetch('/api/config', true),
          safeFetch('/api/musicas'),
          safeFetch('/api/horario'),
          safeFetch('/api/tarefas'),
          safeFetch('/api/limites-ocorrencias'),
          safeFetch('/api/acoes-coordenacao'),
          safeFetch('/api/modelos-escrita'),
          safeFetch('/api/projetos'),
          safeFetch('/api/projeto-turmas'),
          safeFetch('/api/projeto-alunos'),
          safeFetch('/api/projeto-experiencias'),
          safeFetch('/api/alunos-especiais'),
          safeFetch('/api/eventos-institucionais'),
          safeFetch('/api/eventos-pessoais' + (user.role === 'professor' ? `?professor_id=${user.professor_id}` : '')),
          safeFetch('/api/projeto-atividades'),
          safeFetch('/api/notas'),
          safeFetch('/api/responsaveis'),
          safeFetch('/api/notificacoes'),
          safeFetch('/api/teacher_schedule'),
          safeFetch('/api/homework')
        ]);
        
        setTurmas(t);
        setDisciplinas(d);
        setProfessores(p.map((prof: any) => {
          let dIds = [];
          let tIds = [];
          try {
            dIds = typeof prof.disciplinas_ids === 'string' ? JSON.parse(prof.disciplinas_ids) : (prof.disciplinas_ids || []);
          } catch (e) { dIds = []; }
          try {
            tIds = typeof prof.turmas_ids === 'string' ? JSON.parse(prof.turmas_ids) : (prof.turmas_ids || []);
          } catch (e) { tIds = []; }
          
          return {
            ...prof,
            disciplinas_ids: dIds,
            turmas_ids: tIds
          };
        }));
        setAlunos(a);
        setOcorrencias(o);
        setModelos(m);
        setConfig(c);
        setMusicas(mus);
        setHorarios(hor);
        setTarefas(tar);
        setLimitesOcorrencias(lim);
        setAcoesCoordenacao(aco);
        setModelosEscrita(esc);
        setProjetos(proj);
        setProjetoTurmas(projT);
        setProjetoAlunos(projA);
        setProjetoExperiencias(projE);
        setAlunosEspeciais(aluE);
        setEventosInstitucionais(ei);
        setEventosPessoais(ep);
        setProjetoAtividades(projAtiv);
        setNotas(n);
        setResponsaveis(r);
        setNotificacoes(notif);
        setTeacherSchedules(sch);
        setHomeworks(hom);
      
      if (c) {
        let parsedUnidades = [];
        try {
          parsedUnidades = typeof c.unidades === 'string' ? JSON.parse(c.unidades) : (c.unidades || []);
        } catch (e) {
          console.error("Error parsing unidades", e);
          parsedUnidades = [];
        }

        let parsedAlertDisciplines = [];
        try {
          parsedAlertDisciplines = typeof c.alerta_disciplinas_ids === 'string' ? JSON.parse(c.alerta_disciplinas_ids) : (c.alerta_disciplinas_ids || []);
        } catch (e) {
          console.error("Error parsing alert disciplines", e);
          parsedAlertDisciplines = [];
        }

        setConfig({ ...c, unidades: parsedUnidades, alerta_disciplinas_ids: JSON.stringify(parsedAlertDisciplines) });
        setAlertDisciplineIds(parsedAlertDisciplines);
        setSelectedUnidadeId(c.unidade_ativa_id || 1);
      }

      setMusicas(mus || []);
      setHorarios(hor || []);
      setTarefas(tar || []);
      
      if (t && t.length > 0 && !selectedTurmaId) {
        setSelectedTurmaId(t[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  // Auth Check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          if (userData.role === 'professor') {
            setProfessorLogadoId(userData.professor_id);
            setActiveTab('professor');
          } else {
            setActiveTab('alunos');
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsAuthLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const handleLogin = async (data: { login: string; senha: string }) => {
    setLoginError('');
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        if (userData.role === 'professor') {
          setProfessorLogadoId(userData.professor_id);
          setActiveTab('professor');
        } else if (userData.role === 'responsavel') {
          setActiveTab('alunos');
        } else if (userData.role === 'developer') {
          setActiveTab('dashboard');
        } else {
          setActiveTab('alunos');
        }
      } else {
        const err = await response.json();
        setLoginError(err.error || 'Erro ao entrar');
      }
    } catch (error) {
      setLoginError('Erro de conexão');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    setUser(null);
    setProfessorLogadoId(null);
    setActiveTab('alunos');
  };

  // Real-time Backup Logic
  useEffect(() => {
    if (!directoryHandle) return;

    const saveBackup = async () => {
      try {
        const data = {
          turmas,
          disciplinas,
          alunos,
          ocorrencias,
          modelos,
          config,
          musicas,
          horarios,
          tarefas,
          timestamp: new Date().toISOString()
        };
        
        const fileName = `point_power_backup_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
        const fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(JSON.stringify(data, null, 2));
        await writable.close();
        console.log("Backup saved to local folder");
      } catch (err) {
        console.error("Backup failed", err);
      }
    };

    const timer = setTimeout(() => {
      if (Date.now() - lastChangeRef.current >= 1000) {
        saveBackup();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [turmas, disciplinas, alunos, ocorrencias, modelos, config, musicas, horarios, tarefas, directoryHandle]);

  const triggerChange = () => {
    lastChangeRef.current = Date.now();
    // Add to history for undo/redo
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...ocorrencias]);
    if (newHistory.length > 20) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setOcorrencias(prev);
      setHistoryIndex(historyIndex - 1);
      // In a real app, you'd sync this with the server
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setOcorrencias(next);
      setHistoryIndex(historyIndex + 1);
    }
  };

  // Selection Cycle Logic
  const handleSelectionCycle = () => {
    if (selectionState === 'inactive') {
      setSelectionState('active');
      setSelectedAlunos(new Set());
    } else if (selectionState === 'active') {
      setSelectionState('all');
      const allIds = filteredAlunos.map(a => a.id);
      setSelectedAlunos(new Set(allIds));
    } else {
      setSelectionState('inactive');
      setSelectedAlunos(new Set());
    }
  };

  const toggleAlunoSelection = (id: number) => {
    if (selectionState === 'inactive') return;
    const newSet = new Set(selectedAlunos);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedAlunos(newSet);
    if (newSet.size === 0) setSelectionState('active');
    else if (newSet.size === filteredAlunos.length) setSelectionState('all');
    else setSelectionState('active');
  };

  // Filtered & Sorted Alunos
  const filteredAlunos = useMemo(() => {
    let result = selectedTurmaId === 0 
      ? [...alunos] 
      : alunos.filter(a => Number(a.turma_id) === Number(selectedTurmaId));
    
    // Recalculate points based on occurrences for the current view
    result = result.map(aluno => {
      const relevantOcorrencias = ocorrencias.filter(o => {
        const matchesAluno = Number(o.aluno_id) === Number(aluno.id);
        const matchesDiscipline = selectedDisciplineId === 0 || Number(o.disciplina_id) === Number(selectedDisciplineId);
        const matchesUnidade = selectedUnidadeId === 0 || Number(o.unidade_id) === Number(selectedUnidadeId);
        const matchesType = occurrenceTypeFilter === 'all' || 
                           (occurrenceTypeFilter === 'positive' && o.tipo === 1) ||
                           (occurrenceTypeFilter === 'negative' && o.tipo === -1);
        return matchesAluno && matchesDiscipline && matchesUnidade && matchesType;
      });
      
      const totalPoints = relevantOcorrencias.reduce((acc, curr) => acc + (curr.tipo * curr.pontos), 0);
      return { ...aluno, pontos: totalPoints, ocorrenciasCount: relevantOcorrencias.length };
    });

    if (searchTerm) {
      result = result.filter(a => a.nome.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    result.sort((a, b) => {
      if (sortMode === 'az') return a.nome.localeCompare(b.nome);
      if (sortMode === 'max') return b.pontos - a.pontos;
      if (sortMode === 'min') return a.pontos - b.pontos;
      return 0;
    });
    
    return result;
  }, [alunos, selectedTurmaId, selectedDisciplineId, selectedUnidadeId, ocorrencias, searchTerm, sortMode]);

  // Birthday logic
  const weeklyBirthdays = useMemo(() => {
    const today = new Date();
    const start = startOfWeek(today);
    const end = endOfWeek(today);
    
    return alunos.filter(a => {
      if (!a.data_nascimento) return false;
      const bday = parseISO(a.data_nascimento);
      // Check if birthday (month and day) falls within this week
      const bdayThisYear = new Date(today.getFullYear(), bday.getMonth(), bday.getDate());
      return isWithinInterval(bdayThisYear, { start, end });
    });
  }, [alunos]);

  // Security Handlers
  const requestSecurity = (type: any, id: number) => {
    setSecurityAction({ type, id });
    setIsSecurityModalOpen(true);
  };

  const confirmSecurity = async (answer: string) => {
    if (answer.toLowerCase() === config?.resposta_seguranca.toLowerCase()) {
      if (securityAction?.type === 'delete-aluno') {
        await fetch(`/api/alunos/${securityAction.id}`, { method: 'DELETE' });
      } else if (securityAction?.type === 'reset-aluno') {
        await fetch(`/api/alunos/${securityAction.id}/reset`, { method: 'POST' });
      } else if (securityAction?.type === 'delete-turma') {
        await fetch(`/api/turmas/${securityAction.id}`, { method: 'DELETE' });
      } else if (securityAction?.type === 'reset-horario') {
        await fetch('/api/horario/reset', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ professorId: securityAction.id === 0 ? 'all' : securityAction.id })
        });
      }
      fetchData();
      setIsSecurityModalOpen(false);
      triggerChange();
      setToast({ message: "Ação realizada com sucesso!", type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } else {
      setToast({ message: "Resposta incorreta!", type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleQuickOccurrence = async (alunoId: number, tipo: number, points: number = 1) => {
    const data = {
      aluno_id: alunoId,
      tipo,
      type: tipo === 1 ? 'positive' : 'negative',
      descricao: tipo === 1 ? "Participação Positiva" : "Comportamento Inadequado",
      pontos: points,
      data: currentDate,
      unidade_id: selectedUnidadeId,
      disciplina_id: selectedDisciplineId || (disciplinas.length > 0 ? disciplinas[0].id : 0)
    };

    // Check for duplicate
    const isDuplicate = ocorrencias.some(o => 
      o.aluno_id === data.aluno_id && 
      o.data === data.data && 
      o.descricao === data.descricao && 
      o.disciplina_id === data.disciplina_id
    );

    if (isDuplicate) {
      setDuplicateConfirmData({ ids: [alunoId], data, isQuick: true });
      return;
    }
    
    await executeSaveOccurrence([alunoId], data);
  };

  const executeSaveOccurrence = async (ids: number[], baseData: any) => {
    for (const id of ids) {
      const data = { ...baseData, aluno_id: id };
      await fetch('/api/ocorrencias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }

    if (baseData.tipo === 1 || baseData.type === 'positive') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }

    setFormDescricao('');
    setFormPontos(1);
    setIsOccurrenceModalOpen(false);
    setSelectedAlunos(new Set());
    setSelectionState('inactive');
    setDuplicateConfirmData(null);
    fetchData();
    triggerChange();
    
    setToast({ message: `${ids.length} ocorrência(s) registrada(s) com sucesso!`, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveOccurrence = async () => {
    const ids = selectedAlunos.size > 0 ? Array.from(selectedAlunos) : [formAlunoId];
    
    if (ids.length === 0 || !formDisciplinaId) {
      alert("Selecione pelo menos um aluno e uma disciplina.");
      return;
    }

    const data = {
      disciplina_id: formDisciplinaId,
      tipo: formTipo,
      type: formTipo === 1 ? 'positive' : 'negative',
      descricao: formDescricao,
      pontos: formPontos,
      data: currentDate,
      unidade_id: selectedUnidadeId
    };

    // Check for duplicate (only for the first student if multiple selected, or for the single student)
    const duplicates = ids.filter(id => 
      ocorrencias.some(o => 
        o.aluno_id === id && 
        o.data === data.data && 
        o.descricao === data.descricao && 
        o.disciplina_id === data.disciplina_id
      )
    );

    if (duplicates.length > 0) {
      setDuplicateConfirmData({ ids, data });
      return;
    }

    await executeSaveOccurrence(ids, data);

    if (sendSms) {
      alert(`SMS enviado para os responsáveis.`);
    }
  };

  const handleApplyModel = (m: ModeloOcorrencia) => {
    setFormTipo(m.tipo);
    setFormDescricao(m.descricao);
    setFormPontos(m.pontos);
  };

  const handleCreateTurma = async () => {
    const nome = prompt("Nome da nova turma:");
    if (!nome) return;
    await fetch('/api/turmas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome })
    });
    fetchData();
    triggerChange();
  };

  const handleCreateDisciplina = async () => {
    const nome = prompt("Nome da nova disciplina:");
    if (!nome) return;
    await fetch('/api/disciplinas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome })
    });
    fetchData();
    triggerChange();
  };

  const handleCreateAluno = () => {
    setNewStudentData({
      nome: '',
      turma_id: selectedTurmaId !== 0 ? selectedTurmaId : (turmas.length > 0 ? turmas[0].id : 0),
      data_nascimento: '2012-01-01'
    });
    setIsCreateStudentModalOpen(true);
  };

  const handleSaveNewStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentData.nome || !newStudentData.turma_id) {
      alert("Por favor, preencha o nome e selecione uma turma.");
      return;
    }
    
    await fetch('/api/alunos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...newStudentData, 
        avatar: newStudentData.nome 
      })
    });
    
    setIsCreateStudentModalOpen(false);
    await fetchData();
    triggerChange();
    
    // Switch to the tab and turma where the student was added
    setActiveTab('turmas');
    setSelectedTurmaId(newStudentData.turma_id);
    
    // Clear search and filters to ensure the new student is visible
    setSearchTerm('');
    setOccurrenceTypeFilter('all');
  };

  const handleEditAluno = (aluno: Aluno) => {
    setEditingStudent(aluno);
    setIsEditStudentModalOpen(true);
  };

  const handleUpdateAluno = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    
    await fetch(`/api/alunos/${editingStudent.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingStudent)
    });
    
    setIsEditStudentModalOpen(false);
    setEditingStudent(null);
    fetchData();
    triggerChange();
  };

  const handleCreateModelo = async () => {
    const descricao = prompt("Descrição do modelo:");
    if (!descricao) return;
    const tipo = confirm("É positivo? (OK para Positivo, Cancelar para Negativo)") ? 1 : -1;
    const pontos = parseInt(prompt("Pontuação (1-10):") || "1");
    
    await fetch('/api/modelos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo, descricao, pontos })
    });
    fetchData();
    triggerChange();
  };

  const handleUpdateSecurity = async () => {
    if (!config) return;
    await fetch('/api/config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    setToast({ message: "Configurações de segurança atualizadas!", type: 'success' });
    setTimeout(() => setToast(null), 3000);
    triggerChange();
  };

  const handlePartialReset = async () => {
    if (resetConfirmationText !== 'RESETAR') return;
    
    try {
      const res = await fetch('/api/reset-parcial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resetOptions)
      });
      
      if (res.ok) {
        fetchData();
        setShowResetConfirmation(false);
        setResetStep(1);
        setResetConfirmationText('');
        setResetOptions({
          ocorrencias: false,
          disciplinas: false,
          professores: false,
          turmas: false
        });
        setToast({ message: "Dados resetados com sucesso!", type: 'success' });
        setTimeout(() => setToast(null), 3000);
      } else {
        const data = await res.json();
        setToast({ message: data.error || "Erro ao resetar dados.", type: 'error' });
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error("Reset failed", err);
      setToast({ message: "Falha na conexão com o servidor.", type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleExportJson = () => {
    const data = { turmas, disciplinas, professores, alunos, ocorrencias, modelos, config, musicas, horarios, tarefas };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `point_power_export_${new Date().toISOString()}.json`;
    a.click();
  };

  const handleDeleteOcorrencias = async (ids: number[]) => {
    // Using a simpler confirmation approach for now to avoid iframe issues
    // In a real app, we'd use a custom modal.
    try {
      for (const id of ids) {
        await fetch(`/api/ocorrencias/${id}`, { method: 'DELETE' });
      }
      setToast({ message: `${ids.length} registro(s) excluído(s) com sucesso!`, type: 'success' });
      setTimeout(() => setToast(null), 3000);
      setSelectedOcorrencias([]);
      fetchData();
      triggerChange();
    } catch (error) {
      console.error("Failed to delete occurrences", error);
      setToast({ message: "Erro ao excluir registros.", type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleBulkAction = async (action: 'like' | 'dislike' | 'delete' | 'message') => {
    const ids = Array.from(selectedAlunos);
    if (ids.length === 0) return;

    if (action === 'delete') {
      if (!confirm(`Deseja realmente excluir ${ids.length} alunos? Esta ação é irreversível.`)) return;
      for (const id of ids) {
        await fetch(`/api/alunos/${id}`, { method: 'DELETE' });
      }
      setToast({ message: `${ids.length} alunos excluídos com sucesso!`, type: 'success' });
      setTimeout(() => setToast(null), 3000);
      setSelectedAlunos(new Set());
      setSelectionState('inactive');
      fetchData();
      triggerChange();
    } else if (action === 'message') {
      setToast({ message: `Simulando envio de mensagem para os responsáveis de ${ids.length} alunos.`, type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } else {
      // Open modal for bulk registration
      setFormTipo(action === 'like' ? 1 : -1);
      setFormDisciplinaId(selectedDisciplineId || (disciplinas.length > 0 ? disciplinas[0].id : 0));
      setFormDescricao('');
      setFormPontos(1);
      setIsOccurrenceModalOpen(true);
    }
  };

  const handleStamp = async (alunoId: number, emoji: string) => {
    const data = {
      aluno_id: alunoId,
      disciplina_id: selectedDisciplineId || (disciplinas.length > 0 ? disciplinas[0].id : 0),
      tipo: 1,
      descricao: `Carimbo: ${emoji}`,
      pontos: 1,
      data: currentDate,
      unidade_id: selectedUnidadeId
    };

    await fetch('/api/ocorrencias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    confetti({ particleCount: 50, spread: 50, origin: { y: 0.8 } });
    fetchData();
    triggerChange();
    setToast({ message: `Carimbo aplicado com sucesso!`, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeleteOccurrence = async (id: number) => {
    if (!confirm("Deseja realmente apagar esta ocorrência?")) return;
    await fetch(`/api/ocorrencias/${id}`, { method: 'DELETE' });
    fetchData();
    triggerChange();
    setToast({ message: "Ocorrência apagada!", type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const handleEditOccurrence = async (o: Ocorrencia) => {
    const newDesc = prompt("Nova descrição:", o.descricao);
    if (newDesc === null) return;
    const newPoints = parseInt(prompt("Nova pontuação:", o.pontos.toString()) || "1");
    
    const updated = { ...o, descricao: newDesc, pontos: newPoints };
    await fetch(`/api/ocorrencias/${o.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
    fetchData();
    triggerChange();
  };

  const handleTriggerBonus = async () => {
    if (!config?.bonus_automatico_modelo_id) {
      alert("Configure o modelo de bônus nas configurações primeiro.");
      return;
    }
    
    if (!selectedBonusWeek) {
      alert("Selecione primeiro a semana antes de fazer a bonificação.");
      return;
    }

    const pass = prompt("Digite a senha de segurança para disparar o bônus:");
    if (pass !== config?.resposta_seguranca) {
      alert("Senha incorreta.");
      return;
    }

    const res = await fetch('/api/trigger-bonus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startDate: selectedBonusWeek.start,
        endDate: selectedBonusWeek.end,
        modeloId: config.bonus_automatico_modelo_id,
        disciplinaId: disciplinas[0]?.id || 0,
        unidadeId: selectedUnidadeId,
        maxNegativas: config.bonus_max_negativas || 0,
        disciplineIdsToCount: JSON.parse(config.bonus_disciplinas_ids || '[]')
      })
    });
    const result = await res.json();
    if (result.success) {
      setToast({ 
        message: `Bônus aplicado a ${result.awardedTo.length} alunos!`, 
        type: 'success' 
      });
      setTimeout(() => setToast(null), 3000);
      fetchData();
    }
  };

  const handleAddScheduleEntry = async () => {
    if (!newScheduleEntry.professor_id || !newScheduleEntry.turma_id || !newScheduleEntry.disciplina_id || !newScheduleEntry.dia_semana || !newScheduleEntry.aula_numero) {
      alert("Preencha todos os campos!");
      return;
    }

    const professorConflict = horarios.find(h => 
      h.professor_id === Number(newScheduleEntry.professor_id) && 
      h.dia_semana === newScheduleEntry.dia_semana && 
      h.aula_numero === Number(newScheduleEntry.aula_numero)
    );

    if (professorConflict) {
      alert(`Conflito: O professor já tem aula na ${professorConflict.dia_semana}, aula ${professorConflict.aula_numero} com a turma ${turmas.find(t => t.id === professorConflict.turma_id)?.nome}.`);
      return;
    }

    const turmaConflict = horarios.find(h => 
      h.turma_id === Number(newScheduleEntry.turma_id) && 
      h.dia_semana === newScheduleEntry.dia_semana && 
      h.aula_numero === Number(newScheduleEntry.aula_numero)
    );

    if (turmaConflict) {
      alert(`Conflito: A turma já tem aula na ${turmaConflict.dia_semana}, aula ${turmaConflict.aula_numero} com o professor ${professores.find(p => p.id === turmaConflict.professor_id)?.nome}.`);
      return;
    }

    await fetch('/api/horario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newScheduleEntry)
    });

    fetchData();
    triggerChange();
  };

  const handleDeleteScheduleEntry = async (id: number) => {
    if (confirm("Deseja excluir este horário?")) {
      await fetch(`/api/horario/${id}`, { method: 'DELETE' });
      fetchData();
      triggerChange();
    }
  };

  const diasSemana = ['SEG', 'TER', 'QUA', 'QUI', 'SEX'];
  const aulasNumeros = [1, 2, 3, 4, 5, 6];

  const filteredHorarios = useMemo(() => {
    return horarios.filter(h => {
      const matchesProfessor = scheduleFilterProfessorId === 'all' || h.professor_id === scheduleFilterProfessorId;
      const matchesDiscipline = !scheduleDisciplineId || h.disciplina_id === scheduleDisciplineId;
      const matchesTurma = scheduleFilterTurmaId === 'all' || h.turma_id === scheduleFilterTurmaId;
      return matchesProfessor && matchesDiscipline && matchesTurma;
    });
  }, [horarios, scheduleFilterProfessorId, scheduleDisciplineId, scheduleFilterTurmaId]);

  const printHorario = () => {
    const doc = new jsPDF('l', 'mm', 'a4');
    const title = scheduleView === 'geral' ? 'Horário Geral das Turmas' : 'Horário Individual do Professor';
    
    doc.setFontSize(18);
    doc.text(title, 14, 20);
    doc.setFontSize(10);
    doc.text(`Gerado em: ${new Date().toLocaleString()}`, 14, 28);

    if (scheduleView === 'geral') {
      const turmasToPrint = scheduleFilterTurmaId === 'all' 
        ? turmas 
        : turmas.filter(t => t.id === scheduleFilterTurmaId);

      turmasToPrint.forEach((t, index) => {
        const turmaHorarios = horarios.filter(h => h.turma_id === t.id);
        if (turmaHorarios.length === 0 && scheduleFilterTurmaId === 'all') return;

        if (index > 0) doc.addPage();
        doc.setFontSize(14);
        doc.text(`Turma: ${t.nome}`, 14, 40);

        const tableData = aulasNumeros.map(aulaNum => {
          const row: any[] = [`${aulaNum}ª Aula`];
          diasSemana.forEach((_, dayIndex) => {
            const h = turmaHorarios.find(hor => hor.dia_semana === (dayIndex + 1) && hor.aula_numero === aulaNum);
            if (h) {
              const disc = disciplinas.find(d => d.id === h.disciplina_id)?.nome || '';
              const prof = professores.find(p => p.id === h.professor_id)?.nome || '';
              row.push(`${disc}\n(${prof})`);
            } else {
              row.push('-');
            }
          });
          return row;
        });

        autoTable(doc, {
          startY: 45,
          head: [['Aula', ...diasSemana]],
          body: tableData,
          theme: 'grid',
          headStyles: { fillColor: [79, 70, 229], halign: 'center' },
          styles: { fontSize: 8, halign: 'center', cellPadding: 2 },
          columnStyles: { 0: { fontStyle: 'bold', fillColor: [248, 250, 252] } }
        });
      });
    } else {
      const prof = professores.find(p => p.id === scheduleFilterProfessorId);
      doc.setFontSize(14);
      doc.text(`Professor: ${prof?.nome || 'Todos'}`, 14, 40);

      const tableData = aulasNumeros.map(aulaNum => {
        const row: any[] = [`${aulaNum}ª Aula`];
        diasSemana.forEach((_, dayIndex) => {
          const h = filteredHorarios.find(hor => hor.dia_semana === (dayIndex + 1) && hor.aula_numero === aulaNum);
          if (h) {
            const disc = disciplinas.find(d => d.id === h.disciplina_id)?.nome || '';
            const turma = turmas.find(t => t.id === h.turma_id)?.nome || '';
            row.push(`${disc}\n(${turma})`);
          } else {
            row.push('-');
          }
        });
        return row;
      });

      autoTable(doc, {
        startY: 45,
        head: [['Aula', ...diasSemana]],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [79, 70, 229], halign: 'center' },
        styles: { fontSize: 8, halign: 'center', cellPadding: 2 },
        columnStyles: { 0: { fontStyle: 'bold', fillColor: [248, 250, 252] } }
      });
    }

    doc.save(`horario_${scheduleView}_${new Date().getTime()}.pdf`);
  };

  const printSingleAction = (action: AcaoCoordenacao) => {
    const doc = new jsPDF();
    const aluno = alunos.find(a => a.id === action.aluno_id);
    const turma = turmas.find(t => t.id === aluno?.turma_id);
    
    doc.setFontSize(22);
    doc.setTextColor(79, 70, 229);
    doc.text('Relatório de Ocorrência', 105, 20, { align: 'center' });
    
    doc.setDrawColor(226, 232, 240);
    doc.line(20, 25, 190, 25);
    
    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139);
    doc.text(`Data do Registro: ${action.data}`, 20, 35);
    doc.text(`Status: ${action.resolvido ? 'RESOLVIDO' : 'PENDENTE'}`, 190, 35, { align: 'right' });
    
    // Aluno Info
    doc.setFillColor(248, 250, 252);
    doc.rect(20, 45, 170, 25, 'F');
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Aluno: ${aluno?.nome || 'N/A'}`, 25, 55);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Turma: ${turma?.nome || 'N/A'}`, 25, 63);
    
    // Detalhes
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Descrição da Ocorrência (Professor):', 20, 85);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const descLines = doc.splitTextToSize(action.texto_original || action.descricao, 170);
    doc.text(descLines, 20, 92);
    
    let currentY = 92 + (descLines.length * 7) + 10;
    
    if (action.resolvido) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 41, 59);
      doc.text('Resolução da Coordenação:', 20, currentY);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      const resLines = doc.splitTextToSize(action.resolucao_coordenacao || 'N/A', 170);
      doc.text(resLines, 20, currentY + 7);
      currentY += (resLines.length * 7) + 10;
      doc.text(`Data da Resolução: ${action.data_resolvido}`, 20, currentY);
    } else {
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(148, 163, 184);
      doc.text('Aguardando resolução da coordenação...', 20, currentY);
    }
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text(`Documento gerado em ${new Date().toLocaleString()}`, 105, 285, { align: 'center' });
    
    doc.save(`ocorrencia_${(aluno?.nome || 'aluno').replace(/\s+/g, '_')}_${action.id}.pdf`);
  };

  // PDF Export
  const exportPDF = async () => {
    const element = document.getElementById('report-preview');
    if (!element) return;

    try {
      // Temporarily hide elements that shouldn't be in the PDF if any
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1200 // Force a consistent width for capture
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      const pageHeight = pdf.internal.pageSize.getHeight();
      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`relatorio_ocorrencias_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("Error generating PDF", error);
      // Fallback to print if PDF fails
      if (confirm("Houve um erro ao gerar o PDF. Deseja tentar imprimir o relatório em vez disso?")) {
        handlePrint();
      }
    }
  };

  // Native Print
  const handlePrint = () => {
    window.print();
  };

  const handleResetSystem = async () => {
    const password = prompt("Digite a senha de segurança para resetar TODO o sistema:");
    if (password === config?.resposta_seguranca) {
      if (confirm("ATENÇÃO: Isso apagará TODOS os dados (turmas, alunos, ocorrências). Deseja continuar?")) {
        await fetch('/api/reset-all', { method: 'POST' });
        fetchData();
        setToast({ message: "Sistema resetado com sucesso!", type: 'success' });
        setTimeout(() => setToast(null), 3000);
      }
    } else {
      setToast({ message: "Senha incorreta.", type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleUpdateAlunoAvatar = async (alunoId: number, newAvatar: string) => {
    const aluno = alunos.find(a => a.id === alunoId);
    if (!aluno) return;
    
    const updated = { ...aluno, avatar: newAvatar };
    await fetch(`/api/alunos/${alunoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
    fetchData();
    if (selectedStudentForModal?.id === alunoId) {
      setSelectedStudentForModal(updated);
    }
  };

  const handleCreateProjeto = async (data: Partial<Projeto>) => {
    try {
      await fetch('/api/projetos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      fetchData();
      setShowCreateProjetoModal(false);
      setToast({ message: "Projeto criado com sucesso!", type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Failed to create project", err);
    }
  };

  const handleCreateProjetoTurma = async (data: Partial<ProjetoTurma>) => {
    try {
      await fetch('/api/projeto-turmas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, projeto_id: selectedProjetoId })
      });
      fetchData();
      setShowCreateProjetoTurmaModal(false);
    } catch (err) {
      console.error("Failed to create project turma", err);
    }
  };

  const handleImportTurma = async (turmaId: number) => {
    const turma = turmas.find(t => t.id === turmaId);
    if (!turma || !selectedProjetoId) return;

    try {
      // 1. Create project turma
      const ptResponse = await fetch('/api/projeto-turmas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projeto_id: selectedProjetoId,
          nome: turma.nome,
          serie: turma.serie,
          turno: turma.turno
        })
      });
      const pt = await ptResponse.json();

      // 2. Duplicate students
      const turmaAlunos = alunos.filter(a => a.turma_id === turmaId);
      await Promise.all(turmaAlunos.map(a => 
        fetch('/api/projeto-alunos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projeto_id: selectedProjetoId,
            projeto_turma_id: pt.id,
            nome: a.nome,
            identificador: a.matricula || `IMP-${a.id}`,
            pontos: 0
          })
        })
      ));

      fetchData();
      setShowImportTurmaModal(false);
      setToast({ message: "Turma importada com sucesso!", type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Failed to import turma", err);
    }
  };

  const handleAddProjetoAluno = async (data: Partial<ProjetoAluno>) => {
    try {
      await fetch('/api/projeto-alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, projeto_id: selectedProjetoId })
      });
      fetchData();
      setShowAddProjetoAlunoModal(false);
    } catch (err) {
      console.error("Failed to add project student", err);
    }
  };

  const handleUpdateProjetoAlunoPoints = async (alunoId: number, delta: number) => {
    const pa = projetoAlunos.find(p => p.id === alunoId);
    if (!pa) return;

    try {
      await fetch(`/api/projeto-alunos/${alunoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...pa, pontos: pa.pontos + delta })
      });
      fetchData();
    } catch (err) {
      console.error("Failed to update points", err);
    }
  };

  const handleRegistrarExperiencia = async (data: Partial<ProjetoExperiencia>, files: File[]) => {
    try {
      // In a real app, we would upload files first
      // For now, we'll mock the file URLs
      const mockArquivos = files.length > 0 ? files.map((f, i) => ({
        id: (Date.now() + i).toString(),
        nome: f.name,
        tipo: f.type,
        url: URL.createObjectURL(f)
      })) : (editingExperiencia?.arquivos || []);

      if (editingExperiencia) {
        await fetch(`/api/projeto-experiencias/${editingExperiencia.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            ...data, 
            arquivos: mockArquivos
          })
        });
      } else {
        await fetch('/api/projeto-experiencias', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            ...data, 
            projeto_id: selectedProjetoId,
            arquivos: mockArquivos
          })
        });
      }
      fetchData();
      setShowRegistrarExperienciaModal(false);
      setEditingExperiencia(null);
      setToast({ message: editingExperiencia ? "Experiência atualizada!" : "Experiência registrada!", type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Failed to record experience", err);
    }
  };

  const handleCadastrarAlunoEspecial = async (data: Partial<AlunoCondicaoEspecial>) => {
    try {
      await fetch('/api/alunos-especiais', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      fetchData();
      setShowCadastrarAlunoEspecialModal(false);
      setToast({ message: "Aluno cadastrado!", type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Failed to register special student", err);
    }
  };

  const handleSavePlanoAcompanhamento = async (plano: string) => {
    if (!selectedAlunoEspecial) return;
    try {
      await fetch(`/api/alunos-especiais/${selectedAlunoEspecial.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...selectedAlunoEspecial, plano_acompanhamento: plano })
      });
      fetchData();
      setToast({ message: "Plano salvo!", type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Failed to save plan", err);
    }
  };

  const handlePrintFeed = () => {
    const printContent = document.getElementById('experience-feed');
    if (!printContent) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const styles = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules).map(rule => rule.cssText).join('');
        } catch (e) {
          return '';
        }
      })
      .join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Registro de Experiências</title>
          <style>
            ${styles}
            @media print {
              .no-print { display: none !important; }
              body { padding: 20px; background: white; }
              .feed-card { break-inside: avoid; border: 1px solid #eee; margin-bottom: 20px; padding: 20px; border-radius: 12px; }
              .feed-media { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 15px; }
              .feed-media img, .feed-media video { width: 100%; border-radius: 8px; }
            }
          </style>
        </head>
        <body>
          <div class="max-w-4xl mx-auto">
            <h1 class="text-2xl font-bold mb-8 text-center uppercase tracking-widest">Registro de Experiências</h1>
            ${printContent.innerHTML}
          </div>
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 500);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleSaveEvolucaoAluno = async (evolucao: string) => {
    if (!selectedAlunoEspecial) return;
    try {
      await fetch(`/api/alunos-especiais/${selectedAlunoEspecial.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...selectedAlunoEspecial, evolucao: evolucao })
      });
      fetchData();
      setToast({ message: "Evolução salva!", type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Failed to save evolution", err);
    }
  };

  const handleDeleteExperiencia = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este registro?")) return;
    try {
      await fetch(`/api/projeto-experiencias/${id}`, { method: 'DELETE' });
      fetchData();
      setToast({ message: "Registro excluído!", type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Failed to delete experience", err);
    }
  };

  const activeReminders = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(today.getDate() + 14);

    const inst = eventosInstitucionais.filter(e => {
      const d = parseISO(e.data);
      return d >= today && d <= twoWeeksLater && !lembretesOcultos.includes(e.id);
    });

    const pess = eventosPessoais.filter(e => {
      const d = parseISO(e.data);
      return d >= today && d <= twoWeeksLater && !lembretesOcultos.includes(e.id + 1000000) && e.professor_id === professorLogadoId;
    });

    return [
      ...inst.map(e => ({ ...e, source: 'institucional' })),
      ...pess.map(e => ({ ...e, source: 'pessoal' }))
    ];
  }, [eventosInstitucionais, eventosPessoais, lembretesOcultos, professorLogadoId]);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} error={loginError} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Reminders Bar */}
      <AnimatePresence>
        {activeReminders.length > 0 && (
          <div className="fixed bottom-4 right-4 z-[100] pointer-events-none flex flex-col items-end gap-2 px-4 no-print">
            {activeReminders.map((rem: any) => (
              <motion.div
                key={rem.source === 'institucional' ? rem.id : rem.id + 1000000}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "pointer-events-auto flex items-center gap-4 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-md max-w-md w-full",
                  rem.source === 'institucional' 
                    ? "bg-indigo-600/90 border-indigo-400 text-white" 
                    : "bg-emerald-600/90 border-emerald-400 text-white"
                )}
              >
                <div className="bg-white/20 p-2 rounded-xl">
                  <Bell size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm truncate uppercase tracking-tight">{rem.titulo}</p>
                  <p className="text-[10px] opacity-80 font-bold uppercase tracking-widest">
                    {format(parseISO(rem.data), 'dd/MM/yyyy')} • {rem.source === 'institucional' ? 'Institucional' : 'Pessoal'}
                  </p>
                </div>
                <button 
                  onClick={() => setLembretesOcultos(prev => [...prev, rem.source === 'institucional' ? rem.id : rem.id + 1000000])}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
      {/* Top Bar - Birthdays */}
      <div className="bg-indigo-600 text-white py-2 px-4 flex items-center justify-center gap-4 overflow-hidden whitespace-nowrap no-print">
        <Cake size={18} className="animate-bounce" />
        <span className="text-sm font-medium">Aniversariantes da Semana:</span>
        <div className="flex gap-4 animate-marquee">
          {weeklyBirthdays.map(a => (
            <span key={a.id} className="text-sm bg-white/20 px-2 py-0.5 rounded-full">
              {a.nome} ({turmas.find(t => t.id === a.turma_id)?.nome}) - {a.data_nascimento ? format(parseISO(a.data_nascimento), 'dd/MM') : ''} 🎂
            </span>
          ))}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Row 1: Logo, Undo/Redo and Primary Tabs */}
          <div className="flex flex-col md:flex-row justify-between items-center py-3 gap-4 border-b border-slate-100">
            <div className="flex items-center gap-2 self-start">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-black leading-none text-indigo-600 tracking-tighter">
                  POINT&POWER
                </h1>
                <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                  ESCOLAR
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-sm font-black text-slate-800 uppercase tracking-tight">{user.nome}</span>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{user.role}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all shadow-sm"
                title="Sair"
              >
                <LogOut size={20} />
              </button>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              <div className="flex items-center gap-1 mr-2 no-print border-r border-slate-200 pr-2">
                <button onClick={handleUndo} disabled={historyIndex <= 0} className="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-30"><RotateCcw size={18} /></button>
                <button onClick={handleRedo} disabled={historyIndex >= history.length - 1} className="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-30 scale-x-[-1]"><RotateCcw size={18} /></button>
              </div>
              <div className="flex items-center gap-1">
                {[
                  { id: 'dashboard', icon: BarChart2, label: 'Dashboard', roles: ['coordenador', 'developer'] },
                  { id: 'turmas', icon: Users, label: 'Turmas', roles: ['coordenador', 'professor', 'developer'] },
                  { id: 'ocorrencias', icon: BookOpen, label: 'Ocorrências', roles: ['coordenador', 'professor', 'developer'] },
                  { id: 'calendario', icon: Calendar, label: 'Calendário', roles: ['coordenador', 'professor', 'developer', 'responsavel'] },
                  { id: 'coordenacao', icon: ShieldAlert, label: 'Coordenação', roles: ['coordenador', 'developer'] },
                  { id: 'professor', icon: UserIcon, label: 'Professor', roles: ['professor', 'developer'] },
                  { id: 'responsaveis', icon: Heart, label: 'Área do Responsável', roles: ['responsavel', 'developer'] },
                  { id: 'relatorios', icon: BarChart3, label: 'Relatórios', roles: ['coordenador', 'professor', 'developer'] },
                  { id: 'projetos', icon: FolderKanban, label: 'Projetos', roles: ['coordenador', 'professor', 'developer'] },
                  { id: 'laudados', icon: Heart, label: 'Alunos Laudados', roles: ['coordenador', 'professor', 'developer'] },
                  { id: 'cadastro', icon: Edit3, label: 'Cadastro', roles: ['coordenador', 'developer'] },
                ].filter(tab => tab.roles.includes(user.role)).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 font-bold text-xs uppercase tracking-wider whitespace-nowrap",
                      activeTab === tab.id 
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" 
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                    )}
                  >
                    <tab.icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Secondary Tabs */}
          <div className="flex justify-center items-center py-2 gap-4 overflow-x-auto">
            {[
              { id: 'musica', icon: Smile, label: 'Música' },
              { id: 'ruido', icon: Volume2, label: 'Ruído' },
              { id: 'config', icon: Settings, label: 'Config' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-6 py-1.5 rounded-full transition-all duration-200 font-bold text-[10px] uppercase tracking-widest border whitespace-nowrap",
                  activeTab === tab.id 
                    ? "bg-slate-800 border-slate-800 text-white shadow-sm" 
                    : "bg-white border-slate-200 text-slate-400 hover:border-slate-400 hover:text-slate-600"
                )}
              >
                <tab.icon size={12} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        <AnimatePresence mode="wait">
          {activeTab === 'coordenacao' && (
            <motion.div
              key="coordenacao"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Coordenação</h2>
                  <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Gestão de Alunos e Professores</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-2xl no-print">
                  <button 
                    onClick={() => setCoordenacaoSubTab('alunos')}
                    className={cn(
                      "px-6 py-2 rounded-xl font-black uppercase text-xs tracking-widest transition-all",
                      coordenacaoSubTab === 'alunos' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    Alunos
                  </button>
                  <button 
                    onClick={() => setCoordenacaoSubTab('professores')}
                    className={cn(
                      "px-6 py-2 rounded-xl font-black uppercase text-xs tracking-widest transition-all",
                      coordenacaoSubTab === 'professores' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    Professores
                  </button>
                  <button 
                    onClick={() => setCoordenacaoSubTab('agenda')}
                    className={cn(
                      "px-6 py-2 rounded-xl font-black uppercase text-xs tracking-widest transition-all",
                      coordenacaoSubTab === 'agenda' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    Agenda
                  </button>
                  <button 
                    onClick={() => setCoordenacaoSubTab('acoes')}
                    className={cn(
                      "px-6 py-2 rounded-xl font-black uppercase text-xs tracking-widest transition-all",
                      coordenacaoSubTab === 'acoes' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    Ações
                  </button>
                  <button 
                    onClick={() => setCoordenacaoSubTab('responsaveis')}
                    className={cn(
                      "px-6 py-2 rounded-xl font-black uppercase text-xs tracking-widest transition-all",
                      coordenacaoSubTab === 'responsaveis' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    Responsáveis
                  </button>
                </div>
              </div>

              {coordenacaoSubTab === 'alunos' ? (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1 rounded-xl no-print">
                      <button
                        onClick={() => setCadastroTurmaFilter(0)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                          cadastroTurmaFilter === 0 ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                        )}
                      >
                        TODOS
                      </button>
                      {turmas.map(t => (
                        <button
                          key={t.id}
                          onClick={() => setCadastroTurmaFilter(t.id)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                            cadastroTurmaFilter === t.id ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                          )}
                        >
                          {t.nome.toUpperCase()}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          const nome = prompt('Nome do novo aluno:');
                          if (nome) {
                            const novaTurmaId = cadastroTurmaFilter || turmas[0]?.id || 1;
                            setCadastroAlunos(prev => [...prev, {
                              id: Math.max(0, ...prev.map(a => a.id)) + 1,
                              nome,
                              turma_id: novaTurmaId,
                              data_nascimento: format(new Date(), 'yyyy-MM-dd'),
                              avatar: 'https://picsum.photos/seed/student/200'
                            }]);
                          }
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all"
                      >
                        <Plus size={20} /> NOVO ALUNO
                      </button>
                      <button
                        onClick={handleSaveCadastro}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                      >
                        <Save size={20} /> SALVAR ALTERAÇÕES
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-wider">Aluno</th>
                            <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-wider">Data de Nascimento</th>
                            <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-wider">Turma</th>
                            <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-wider w-20">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {cadastroAlunos.filter(a => cadastroTurmaFilter === 0 || a.turma_id === cadastroTurmaFilter).length === 0 ? (
                            <tr>
                              <td colSpan={4} className="p-8 text-center text-slate-400 font-medium">
                                Nenhum aluno encontrado para este filtro.
                              </td>
                            </tr>
                          ) : (
                            cadastroAlunos
                              .filter(a => cadastroTurmaFilter === 0 || a.turma_id === cadastroTurmaFilter)
                              .sort((a,b) => a.nome.localeCompare(b.nome))
                              .map((aluno) => (
                              <tr key={aluno.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4">
                                  <div className="flex items-center gap-3">
                                    <img 
                                      src={getAvatarUrl(aluno.avatar, config?.avatar_set)} 
                                      alt={aluno.nome} 
                                      className="w-10 h-10 rounded-xl bg-slate-100"
                                      referrerPolicy="no-referrer"
                                    />
                                    <input
                                      type="text"
                                      value={aluno.nome}
                                      onChange={(e) => handleUpdateCadastroAluno(aluno.id, 'nome', e.target.value)}
                                      className="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none py-1 font-bold text-slate-700 w-full"
                                    />
                                  </div>
                                </td>
                                <td className="p-4">
                                  <input
                                    type="date"
                                    value={aluno.data_nascimento || ''}
                                    onChange={(e) => handleUpdateCadastroAluno(aluno.id, 'data_nascimento', e.target.value)}
                                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                                  />
                                </td>
                                <td className="p-4">
                                  <select
                                    value={aluno.turma_id}
                                    onChange={(e) => handleUpdateCadastroAluno(aluno.id, 'turma_id', Number(e.target.value))}
                                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none w-full"
                                  >
                                    {turmas.map(t => (
                                      <option key={t.id} value={t.id}>{t.nome}</option>
                                    ))}
                                  </select>
                                </td>
                                <td className="p-4">
                                  <button
                                    onClick={() => {
                                      setSecurityAction({ type: 'delete-aluno', id: aluno.id });
                                      setIsSecurityModalOpen(true);
                                    }}
                                    className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : coordenacaoSubTab === 'responsaveis' ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Gestão de Responsáveis</h3>
                    <button
                      onClick={() => {
                        const nome = prompt('Nome do responsável:');
                        const login = prompt('Login:');
                        const senha = prompt('Senha:');
                        const aluno_id = Number(prompt('ID do Aluno:'));
                        if (nome && login && senha && aluno_id) {
                          fetch('/api/responsaveis', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ nome, login, senha, aluno_id })
                          }).then(() => fetchData());
                        }
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    >
                      <Plus size={20} /> NOVO RESPONSÁVEL
                    </button>
                  </div>

                  <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-wider">Nome</th>
                          <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-wider">Login</th>
                          <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-wider">Aluno Associado</th>
                          <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-wider w-20">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {responsaveis.map(resp => (
                          <tr key={resp.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-bold text-slate-700">{resp.nome}</td>
                            <td className="p-4 text-slate-500">{resp.login}</td>
                            <td className="p-4 text-slate-500">{alunos.find(a => a.id === resp.aluno_id)?.nome}</td>
                            <td className="p-4">
                              <button
                                onClick={async () => {
                                  if (confirm('Excluir responsável?')) {
                                    await fetch(`/api/responsaveis/${resp.id}`, { method: 'DELETE' });
                                    fetchData();
                                  }
                                }}
                                className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : coordenacaoSubTab === 'professores' ? (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setProfessorForm({ nome: '', login: '', senha: '', disciplinas_ids: [] as any, turmas_ids: [] as any });
                        setShowProfessorModal(true);
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    >
                      <Plus size={20} /> CADASTRAR PROFESSOR
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {professores.map(p => (
                      <motion.div 
                        key={p.id}
                        layout
                        className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                            <UserIcon size={24} />
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                            <button 
                              onClick={() => {
                                setSelectedProfessorForSchedule(p);
                                setShowScheduleModal(true);
                              }}
                              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                            >
                              <Clock size={18} />
                            </button>
                            <button 
                              onClick={() => {
                                setProfessorForm({
                                  ...p,
                                  senha: '' // Don't show password
                                });
                                setShowProfessorModal(true);
                              }}
                              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                            >
                              <Edit3 size={18} />
                            </button>
                            <button 
                              onClick={() => handleDeleteProfessor(p.id)}
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{p.nome}</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Login: {p.login}</p>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          {(Array.isArray(p.turmas_ids) ? p.turmas_ids : []).map(tId => (
                            <span key={tId} className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase">
                              {turmas.find(t => t.id === tId)?.nome}
                            </span>
                          ))}
                          {(Array.isArray(p.disciplinas_ids) ? p.disciplinas_ids : []).map(dId => (
                            <span key={dId} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase">
                              {disciplinas.find(d => d.id === dId)?.nome}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : coordenacaoSubTab === 'agenda' ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <Calendar className="text-indigo-600" size={20} /> Agenda Institucional
                    </h3>
                    <button
                      onClick={() => {
                        setEventType('institucional');
                        setShowEventModal(true);
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    >
                      <Plus size={20} /> NOVO EVENTO
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eventosInstitucionais.map(e => (
                      <div key={e.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-100 px-2 py-0.5 rounded-full">
                            {e.tipo || 'Evento'}
                          </span>
                          <span className="text-xs font-bold text-slate-400">{format(parseISO(e.data), 'dd/MM/yyyy')}</span>
                        </div>
                        <h4 className="font-bold text-slate-800 mb-2">{e.titulo}</h4>
                        <p className="text-sm text-slate-500 mb-4">{e.descricao}</p>
                        <button 
                          onClick={() => handleDeleteEvent(e.id, 'institucional')}
                          className="w-full py-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all text-xs font-bold uppercase tracking-widest"
                        >
                          Excluir Evento
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <ShieldAlert className="text-amber-500" size={20} /> Ações Pendentes
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {acoesCoordenacao.filter(a => !a.resolvido).map(a => (
                      <div key={a.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                              <UserIcon size={20} />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800 text-sm">
                                {alunos.find(al => al.id === a.aluno_id)?.nome}
                              </h4>
                              <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                                {a.tipo === 'coordenacao' ? 'Coordenação' : 'Família'}
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400">{format(parseISO(a.data), 'dd/MM/yyyy')}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-6 line-clamp-3">{a.descricao}</p>
                        <button 
                          onClick={() => handleToggleActionResolution(a.id!, true)}
                          className="w-full py-3 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-100 uppercase tracking-widest"
                        >
                          Resolver Ação
                        </button>
                      </div>
                    ))}
                    {acoesCoordenacao.filter(a => !a.resolvido).length === 0 && (
                      <div className="col-span-full py-12 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 className="text-slate-300" size={32} />
                        </div>
                        <p className="text-slate-400 font-medium">Nenhuma ação pendente no momento.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'ruido' && (
            <motion.div
              key="ruido"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Medidor de Ruído</h2>
                    <p className="text-slate-500 font-medium">Controle o nível de silêncio na sala de aula.</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "text-6xl font-black transition-all duration-300",
                      currentNoiseLevel > noiseThreshold ? "text-rose-500 scale-110" : 
                      currentNoiseLevel > noiseThreshold * 0.7 ? "text-amber-500" : "text-emerald-500"
                    )}>
                      {currentNoiseLevel}
                      <span className="text-xl ml-1 opacity-50">dB</span>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Nível Atual</p>
                  </div>
                </div>

                <div className="space-y-12">
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Intensidade do Som</label>
                      <span className={cn(
                        "text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest",
                        currentNoiseLevel > noiseThreshold ? "bg-rose-100 text-rose-600" : 
                        currentNoiseLevel > noiseThreshold * 0.7 ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"
                      )}>
                        {currentNoiseLevel > noiseThreshold ? "MUITO ALTO" : 
                         currentNoiseLevel > noiseThreshold * 0.7 ? "MODERADO" : "SILENCIOSO"}
                      </span>
                    </div>
                    <div className="h-6 bg-slate-100 rounded-full overflow-hidden flex p-1">
                      <motion.div 
                        className={cn(
                          "h-full rounded-full transition-colors duration-300",
                          currentNoiseLevel > noiseThreshold ? "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]" : 
                          currentNoiseLevel > noiseThreshold * 0.7 ? "bg-amber-500" : "bg-emerald-500"
                        )}
                        initial={{ width: 0 }}
                        animate={{ width: `${currentNoiseLevel}%` }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Limite Permitido</label>
                        <span className="text-lg font-black text-indigo-600">{noiseThreshold} dB</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={noiseThreshold}
                        onChange={(e) => setNoiseThreshold(Number(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                      <div className="flex justify-between text-[10px] font-black text-slate-300 uppercase">
                        <span>Silencioso</span>
                        <span>Moderado</span>
                        <span>Barulhento</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Som do Alarme</label>
                      <div className="space-y-3">
                        <select 
                          value={noiseAlertSound}
                          onChange={(e) => setNoiseAlertSound(e.target.value)}
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        >
                          {ALARM_SOUNDS.map(sound => (
                            <option key={sound.id} value={sound.url}>{sound.name}</option>
                          ))}
                        </select>
                        <button 
                          onClick={() => {
                            if (noiseAudioRef.current) {
                              noiseAudioRef.current.currentTime = 0;
                              noiseAudioRef.current.play();
                            }
                          }}
                          className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                        >
                          <Play size={18} /> TESTAR SOM
                        </button>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setNoiseMeterActive(!noiseMeterActive)}
                    className={cn(
                      "w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-4",
                      noiseMeterActive 
                        ? "bg-rose-50 text-rose-600 border-2 border-rose-200 hover:bg-rose-100" 
                        : "bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700"
                    )}
                  >
                    {noiseMeterActive ? <MicOff size={24} /> : <Mic size={24} />}
                    {noiseMeterActive ? "DESATIVAR MEDIDOR" : "ATIVAR MEDIDOR"}
                  </button>
                </div>
              </div>

              <audio 
                ref={noiseAudioRef} 
                src={noiseAlertSound}
              />
            </motion.div>
          )}

          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Dashboard</h2>
                <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
                  <button 
                    onClick={() => setDashboardFilter('all')}
                    className={cn(
                      "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2",
                      dashboardFilter === 'all' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    <LayoutGrid size={16} /> Todas
                  </button>
                  <button 
                    onClick={() => setDashboardFilter('positive')}
                    className={cn(
                      "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2",
                      dashboardFilter === 'positive' ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    <ThumbsUp size={16} /> Positivas
                  </button>
                  <button 
                    onClick={() => setDashboardFilter('negative')}
                    className={cn(
                      "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2",
                      dashboardFilter === 'negative' ? "bg-white text-rose-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    <ThumbsDown size={16} /> Negativas
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                      <Users size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Alunos</p>
                      <motion.h3 
                        key={alunos.length}
                        initial={{ scale: 1.2, color: '#4f46e5' }}
                        animate={{ scale: 1, color: '#1e293b' }}
                        className="text-2xl font-black text-slate-800"
                      >
                        {alunos.length}
                      </motion.h3>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 w-full" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                      <ThumbsUp size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Positivas</p>
                      <motion.h3 
                        key={ocorrencias.filter(o => o.type === 'positive').length}
                        initial={{ scale: 1.2, color: '#10b981' }}
                        animate={{ scale: 1, color: '#1e293b' }}
                        className="text-2xl font-black text-slate-800"
                      >
                        {ocorrencias.filter(o => o.type === 'positive').length}
                      </motion.h3>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${(ocorrencias.filter(o => o.type === 'positive').length / Math.max(1, ocorrencias.length)) * 100}%` }} />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center">
                      <ThumbsDown size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Negativas</p>
                      <motion.h3 
                        key={ocorrencias.filter(o => o.type === 'negative').length}
                        initial={{ scale: 1.2, color: '#f43f5e' }}
                        animate={{ scale: 1, color: '#1e293b' }}
                        className="text-2xl font-black text-slate-800"
                      >
                        {ocorrencias.filter(o => o.type === 'negative').length}
                      </motion.h3>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500" style={{ width: `${(ocorrencias.filter(o => o.type === 'negative').length / Math.max(1, ocorrencias.length)) * 100}%` }} />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Média Geral</p>
                      <h3 className="text-2xl font-black text-slate-800">
                        {notas.length > 0 ? (notas.reduce((acc, n) => acc + n.valor, 0) / notas.length).toFixed(1) : '0.0'}
                      </h3>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-full" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-6">Desempenho por Turma</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={turmas.map(t => {
                        const tOcorrencias = ocorrencias.filter(o => {
                          const aluno = alunos.find(a => a.id === o.aluno_id);
                          return aluno?.turma_id === t.id;
                        });
                        
                        const filtered = tOcorrencias.filter(o => {
                          if (dashboardFilter === 'positive') return o.type === 'positive';
                          if (dashboardFilter === 'negative') return o.type === 'negative';
                          return true;
                        });

                        return {
                          name: t.nome,
                          positivas: filtered.filter(o => o.type === 'positive').length,
                          negativas: filtered.filter(o => o.type === 'negative').length,
                          total: filtered.length
                        };
                      })}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Legend iconType="circle" />
                        {(dashboardFilter === 'all' || dashboardFilter === 'positive') && <Bar dataKey="positivas" fill="#10b981" radius={[4, 4, 0, 0]} />}
                        {(dashboardFilter === 'all' || dashboardFilter === 'negative') && <Bar dataKey="negativas" fill="#f43f5e" radius={[4, 4, 0, 0]} />}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-6">Evolução de Ocorrências</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={Array.from({ length: 7 }).map((_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() - (6 - i));
                        const dateStr = date.toISOString().split('T')[0];
                        
                        const filtered = ocorrencias.filter(o => {
                          if (o.data !== dateStr) return false;
                          if (dashboardFilter === 'positive') return o.type === 'positive';
                          if (dashboardFilter === 'negative') return o.type === 'negative';
                          return true;
                        });

                        return {
                          name: format(date, 'dd/MM'),
                          total: filtered.length
                        };
                      })}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Area type="monotone" dataKey="total" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'calendario' && (
            <motion.div
              key="calendario"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Calendário Escolar</h2>
                <div className="flex gap-2">
                  <button onClick={() => setShowEventModal(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                    <Plus size={18} /> NOVO EVENTO
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                  <div key={d} className="bg-slate-50 p-4 text-center text-xs font-black text-slate-400 uppercase tracking-widest">{d}</div>
                ))}
                {Array.from({ length: 35 }).map((_, i) => {
                  const d = new Date();
                  d.setDate(d.getDate() - d.getDay() + i);
                  const dateStr = d.toISOString().split('T')[0];
                  const dayEvents = [...eventosInstitucionais, ...eventosPessoais].filter(e => e.data === dateStr);
                  
                  return (
                    <div key={i} className={cn(
                      "bg-white min-h-[120px] p-2 hover:bg-slate-50 transition-colors",
                      !isSameDay(d, new Date()) && "text-slate-400"
                    )}>
                      <span className={cn(
                        "text-sm font-black w-8 h-8 flex items-center justify-center rounded-lg mb-1",
                        isSameDay(d, new Date()) ? "bg-indigo-600 text-white" : ""
                      )}>{d.getDate()}</span>
                      <div className="space-y-1">
                        {dayEvents.map(e => (
                          <div key={e.id} className={cn(
                            "text-[10px] p-1 rounded-md font-bold truncate uppercase tracking-tighter",
                            'professor_id' in e ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-indigo-100 text-indigo-700 border border-indigo-200"
                          )}>
                            {e.titulo}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'responsaveis' && (
            <motion.div
              key="responsaveis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {user.role === 'responsavel' ? (
                <div className="space-y-6">
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                        <UserIcon size={32} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Área do Responsável</h2>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Acompanhamento do Aluno: {alunos.find(a => a.id === user.aluno_id)?.nome}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Média Atual</p>
                        <h4 className="text-3xl font-black text-indigo-600">
                          {notas.filter(n => n.aluno_id === user.aluno_id).length > 0
                            ? (notas.filter(n => n.aluno_id === user.aluno_id).reduce((acc, n) => acc + n.valor, 0) / notas.filter(n => n.aluno_id === user.aluno_id).length).toFixed(1)
                            : '0.0'}
                        </h4>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Ocorrências</p>
                        <h4 className="text-3xl font-black text-rose-600">
                          {ocorrencias.filter(o => o.aluno_id === user.aluno_id).length}
                        </h4>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Notificações</p>
                        <h4 className="text-3xl font-black text-emerald-600">
                          {notificacoes.filter(n => n.aluno_id === user.aluno_id && !n.lida).length}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                      <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-6">Notas Recentes</h3>
                      <div className="space-y-4">
                        {notas.filter(n => n.aluno_id === user.aluno_id).sort((a, b) => b.id - a.id).map(nota => (
                          <div key={nota.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div>
                              <p className="font-black text-slate-800 uppercase text-sm">{disciplinas.find(d => d.id === nota.disciplina_id)?.nome}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{format(parseISO(nota.data), 'dd/MM/yyyy')}</p>
                            </div>
                            <div className={cn(
                              "px-4 py-2 rounded-xl font-black text-lg",
                              nota.valor >= 7 ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                            )}>
                              {nota.valor.toFixed(1)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                      <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-6">Notificações</h3>
                      <div className="space-y-4">
                        {notificacoes.filter(n => n.aluno_id === user.aluno_id).sort((a, b) => b.id - a.id).map(notif => (
                          <div key={notif.id} className={cn(
                            "p-4 rounded-2xl border transition-all",
                            notif.lida ? "bg-slate-50 border-slate-100 opacity-60" : "bg-indigo-50 border-indigo-100"
                          )}>
                            <div className="flex justify-between items-start mb-2">
                              <span className="px-2 py-0.5 bg-white rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 border border-indigo-100">
                                {notif.tipo}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                {format(parseISO(notif.data), 'dd/MM/yyyy')}
                              </span>
                            </div>
                            <p className="text-sm font-bold text-slate-700">{notif.conteudo}</p>
                            {!notif.lida && (
                              <button 
                                onClick={async () => {
                                  await fetch(`/api/notificacoes/${notif.id}/read`, { method: 'PUT' });
                                  fetchData();
                                }}
                                className="mt-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline"
                              >
                                Marcar como lida
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center">
                  <p className="text-slate-500 font-bold">Esta área é exclusiva para responsáveis.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'turmas' && (
            <motion.div
              key="turmas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Homework Reminders */}
              {homeworks.length > 0 && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <Bell size={20} />
                    <h3 className="text-lg font-black uppercase tracking-tight">Lembretes de Tarefas</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {homeworks
                      .filter(h => selectedTurmaId === 0 || turmas.find(t => t.id === selectedTurmaId)?.nome === h.class_group)
                      .map(h => (
                        <div key={h.id} className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 space-y-2 relative group">
                          <button 
                            onClick={() => handleDeleteHomework(h.id)}
                            className="absolute top-2 right-2 p-1 text-slate-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <X size={14} />
                          </button>
                          <div className="flex justify-between items-start">
                            <span className="px-2 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-[10px] font-black uppercase">
                              {h.subject}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              {h.date_created}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-slate-800">{h.description}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Turma: {h.class_group}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Dashboard Controls */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-[300px]">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      placeholder="Buscar aluno..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                    />
                  </div>
                  
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    {[
                      { id: 'grid-sm', icon: LayoutGrid, size: 14 },
                      { id: 'grid-md', icon: LayoutGrid, size: 18 },
                      { id: 'grid-lg', icon: LayoutGrid, size: 22 },
                      { id: 'list', icon: LayoutList, size: 18 },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setViewMode(mode.id as ViewMode)}
                        className={cn(
                          "p-2 rounded-lg transition-all",
                          viewMode === mode.id ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                        )}
                      >
                        <mode.icon size={mode.size} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => setSortMode('az')}
                      className={cn(
                        "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                        sortMode === 'az' ? "bg-blue-500 text-white shadow-md" : "text-slate-500 hover:bg-slate-200"
                      )}
                    >
                      <ArrowUpAZ size={14} /> A-Z
                    </button>
                    <button
                      onClick={() => setSortMode('max')}
                      className={cn(
                        "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                        sortMode === 'max' ? "bg-emerald-500 text-white shadow-md" : "text-slate-500 hover:bg-slate-200"
                      )}
                    >
                      <ArrowUpWideNarrow size={14} /> MAX
                    </button>
                    <button
                      onClick={() => setSortMode('min')}
                      className={cn(
                        "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                        sortMode === 'min' ? "bg-rose-500 text-white shadow-md" : "text-slate-500 hover:bg-slate-200"
                      )}
                    >
                      <ArrowDownWideNarrow size={14} /> MIN
                    </button>
                  </div>

                  <button
                    onClick={handleCreateAluno}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-bold hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                  >
                    <Plus size={16} /> NOVO ALUNO
                  </button>

                  <button
                    onClick={handleSelectionCycle}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
                      selectionState === 'inactive' ? "bg-slate-100 text-slate-600" : 
                      selectionState === 'active' ? "bg-indigo-600 text-white shadow-lg" : "bg-emerald-600 text-white shadow-lg"
                    )}
                  >
                    {selectionState === 'inactive' ? <Filter size={16} /> : selectionState === 'active' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    {selectionState === 'inactive' ? 'SELECIONAR' : selectionState === 'active' ? 'TODOS' : 'LIMPAR'}
                  </button>
                </div>
              </div>

              {/* Filters Row */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                  <Users size={18} className="text-slate-400" />
                  <select
                    value={selectedTurmaId}
                    onChange={(e) => setSelectedTurmaId(Number(e.target.value))}
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={0}>Todas as Turmas</option>
                    {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
                  </select>
                </div>

                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                  <BookOpen size={18} className="text-slate-400" />
                  <select
                    value={selectedDisciplineId}
                    onChange={(e) => setSelectedDisciplineId(Number(e.target.value))}
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={0}>Todas as Disciplinas</option>
                    {disciplinas.map(d => <option key={d.id} value={d.id}>{d.nome}</option>)}
                  </select>
                </div>

                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                  <Calendar size={18} className="text-slate-400" />
                  <input
                    type="date"
                    value={currentDate}
                    onChange={(e) => setCurrentDate(e.target.value)}
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
                  {[
                    { id: 'all', label: 'Todas', icon: <Filter size={14} /> },
                    { id: 'positive', label: 'Positivas', icon: <ThumbsUp size={14} /> },
                    { id: 'negative', label: 'Negativas', icon: <ThumbsDown size={14} /> }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setOccurrenceTypeFilter(f.id as any)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                        occurrenceTypeFilter === f.id ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                      )}
                    >
                      {f.icon} {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Homework Alerts & Project Reminders */}
              {selectedTurmaId !== 0 && (
                <div className="space-y-2">
                  {/* Project Activity Reminders */}
                  {(() => {
                    const selectedTurma = turmas.find(t => t.id === selectedTurmaId);
                    if (!selectedTurma) return null;

                    return projetoAtividades
                      .filter(atividade => {
                        const projeto = projetos.find(p => p.id === atividade.projeto_id);
                        if (!projeto) return false;

                        // Link by name/serie/turno match between ProjetoTurma and System Turma
                        const isLinkedToTurma = projetoTurmas.some(pt => 
                          pt.projeto_id === projeto.id && 
                          pt.nome === selectedTurma.nome &&
                          pt.serie === selectedTurma.serie &&
                          pt.turno === selectedTurma.turno
                        );

                        if (!isLinkedToTurma) return false;

                        const execDate = parseISO(atividade.data_execucao);
                        const today = startOfDay(new Date());
                        const diffDays = differenceInDays(execDate, today);

                        // Reminder 20 days before, and not past the date
                        return diffDays <= 20 && diffDays >= 0;
                      })
                      .map(atividade => {
                        const projeto = projetos.find(p => p.id === atividade.projeto_id);
                        return (
                          <motion.div 
                            key={`rem-${atividade.id}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-4 bg-amber-400 border border-amber-500 rounded-2xl flex items-center justify-between shadow-lg shadow-amber-100"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-600 shadow-sm">
                                <AlertTriangle size={20} />
                              </div>
                              <div>
                                <p className="text-xs font-black text-amber-900 uppercase tracking-wider">Lembrete de Projeto</p>
                                <p className="text-sm font-bold text-slate-900">{atividade.titulo}</p>
                                <p className="text-[10px] font-bold text-amber-800 uppercase">
                                  Projeto: {projeto?.nome} • Execução: {format(parseISO(atividade.data_execucao), "dd/MM/yyyy")}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 bg-white text-amber-800 rounded-full text-[10px] font-black uppercase shadow-sm">
                                {differenceInDays(parseISO(atividade.data_execucao), startOfDay(new Date()))} Dias
                              </span>
                            </div>
                          </motion.div>
                        );
                      });
                  })()}

                  {/* Homework Alerts */}
                  {horarios
                    .filter(h => h.turma_id === selectedTurmaId)
                    .map(h => {
                      const tarefa = tarefas.find(t => t.horario_id === h.id && t.data === currentDate && !t.corrigida);
                      if (!tarefa) return null;
                      return (
                        <motion.div 
                          key={tarefa.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                              <Bell size={20} />
                            </div>
                            <div>
                              <p className="text-xs font-black text-amber-800 uppercase tracking-wider">Tarefa para Corrigir</p>
                              <p className="text-sm font-bold text-amber-900">{tarefa.descricao}</p>
                              <p className="text-[10px] font-medium text-amber-600 uppercase">{disciplinas.find(d => d.id === h.disciplina_id)?.nome} • {h.horario_inicio} - {h.horario_fim}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-[10px] font-black uppercase">Hoje</span>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              )}

              {/* Student Grid */}
              <div className={cn(
                "grid gap-6",
                viewMode === 'grid-sm' && "grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8",
                viewMode === 'grid-md' && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
                viewMode === 'grid-lg' && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
                viewMode === 'list' && "grid-cols-1"
              )}>
                {filteredAlunos.map((aluno) => (
                  <motion.div
                    layout
                    key={aluno.id}
                    onClick={() => {
                      if (selectionState !== 'inactive') {
                        toggleAlunoSelection(aluno.id);
                      } else {
                        setSelectedStudentForModal(aluno);
                        setOccurrenceFilter('all');
                      }
                    }}
                    className={cn(
                      "group relative bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden cursor-pointer",
                      selectedAlunos.has(aluno.id) ? "border-indigo-500 ring-4 ring-indigo-50" : "border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-200/50",
                      viewMode === 'list' ? "flex items-center p-4 gap-6" : "p-5"
                    )}
                  >
                    {/* Selection Overlay */}
                    {selectionState !== 'inactive' && (
                      <div className={cn(
                        "absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                        selectedAlunos.has(aluno.id) ? "bg-indigo-600 border-indigo-600" : "bg-white border-slate-200"
                      )}>
                        {selectedAlunos.has(aluno.id) && <CheckCircle2 className="text-white" size={14} />}
                      </div>
                    )}

                    <div className={cn("flex flex-col items-center", viewMode === 'list' && "flex-row flex-1")}>
                      <div className={cn("flex items-start gap-4 w-full", viewMode === 'list' ? "flex-row" : "flex-col items-center")}>
                        <div className={cn(
                          "relative",
                          viewMode === 'grid-sm' ? "w-16 h-16" : "w-24 h-24",
                          viewMode === 'list' && "mb-0 mr-6 w-16 h-16"
                        )}>
                          <img 
                            src={getAvatarUrl(aluno.avatar || aluno.nome, config?.avatar_set)} 
                            alt={aluno.nome}
                            referrerPolicy="no-referrer"
                            className="w-full h-full rounded-2xl bg-slate-50"
                          />
                          <div className="absolute -bottom-2 -right-2 bg-white px-2 py-1 rounded-lg shadow-md border border-slate-100 flex flex-col items-center">
                            <span className={cn(
                              "text-xs font-black",
                              aluno.pontos > 0 ? "text-emerald-600" : aluno.pontos < 0 ? "text-rose-600" : "text-slate-600"
                            )}>
                              {aluno.pontos > 0 ? `+${aluno.pontos}` : aluno.pontos}
                            </span>
                          </div>
                        </div>

                        <div className={cn("flex-1", viewMode === 'list' ? "text-left" : "text-center")}>
                          <h3 className="font-bold text-slate-800 truncate max-w-full">{aluno.nome}</h3>
                          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                            {turmas.find(t => t.id === aluno.turma_id)?.nome}
                          </p>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className={cn(
                        "mt-4 flex items-center justify-center gap-2",
                        viewMode === 'list' && "mt-0"
                      )}>
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            if (selectionState === 'inactive') {
                              setFormAlunoId(aluno.id);
                              setFormTipo(1);
                              setFormDisciplinaId(selectedDisciplineId || (disciplinas.length > 0 ? disciplinas[0].id : 0));
                              setFormDescricao('');
                              setFormPontos(1);
                              setIsOccurrenceModalOpen(true);
                            } else {
                              handleQuickOccurrence(aluno.id, 1);
                            }
                          }}
                          className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                        >
                          <ThumbsUp size={18} />
                        </button>
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            if (selectionState === 'inactive') {
                              setFormAlunoId(aluno.id);
                              setFormTipo(-1);
                              setFormDisciplinaId(selectedDisciplineId || (disciplinas.length > 0 ? disciplinas[0].id : 0));
                              setFormDescricao('');
                              setFormPontos(1);
                              setIsOccurrenceModalOpen(true);
                            } else {
                              handleQuickOccurrence(aluno.id, -1);
                            }
                          }}
                          className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                        >
                          <ThumbsDown size={18} />
                        </button>
                        <div className="w-px h-6 bg-slate-100 mx-1" />
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleEditAluno(aluno); }}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); requestSecurity('reset-aluno', aluno.id); }}
                          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                        >
                          <RotateCcw size={18} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); requestSecurity('delete-aluno', aluno.id); }}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setSelectedStudentForNota(aluno);
                            setShowNotaModal(true);
                          }}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                          title="Notas"
                        >
                          <GraduationCap size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tarefas de Casa da Turma */}
              {selectedTurmaId !== 0 && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-800 uppercase flex items-center gap-2">
                      <BookOpen className="text-amber-500" /> Tarefas de Casa - {turmas.find(t => t.id === selectedTurmaId)?.nome}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tarefas.filter(t => {
                      const h = horarios.find(hor => hor.id === t.horario_id);
                      return h?.turma_id === selectedTurmaId && t.data === currentDate && !t.corrigida;
                    }).map(t => {
                      const h = horarios.find(hor => hor.id === t.horario_id);
                      return (
                        <div key={t.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between gap-3">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-[10px] font-black text-indigo-600 uppercase">
                                {disciplinas.find(d => d.id === h?.disciplina_id)?.nome}
                              </span>
                            </div>
                            <p className="text-sm font-bold text-slate-700 line-clamp-3">{t.descricao}</p>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={async () => {
                                await fetch(`/api/tarefas/${t.id}`, {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ ...t, corrigida: 1 })
                                });
                                fetchData();
                                setToast({ message: "Tarefa corrigida!", type: 'success' });
                                setTimeout(() => setToast(null), 3000);
                              }}
                              className="flex-1 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all"
                            >
                              Corrigir Tarefa
                            </button>
                            <button
                              onClick={async () => {
                                if (confirm("Excluir tarefa?")) {
                                  await fetch(`/api/tarefas/${t.id}`, { method: 'DELETE' });
                                  fetchData();
                                }
                              }}
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    {tarefas.filter(t => {
                      const h = horarios.find(hor => hor.id === t.horario_id);
                      return h?.turma_id === selectedTurmaId && t.data === currentDate && !t.corrigida;
                    }).length === 0 && (
                      <div className="col-span-full py-8 text-center text-slate-400 font-medium italic bg-white rounded-2xl border-2 border-dashed border-slate-100">
                        Nenhuma tarefa cadastrada para hoje.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {filteredAlunos.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-20 text-center"
                >
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users size={48} className="text-slate-200" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Nenhum aluno encontrado</h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    Não encontramos alunos para os filtros selecionados. Você pode cadastrar um novo aluno agora mesmo.
                  </p>
                  <button
                    onClick={handleCreateAluno}
                    className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2 mx-auto"
                  >
                    <Plus size={20} /> CADASTRAR PRIMEIRO ALUNO
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'ocorrencias' && (
            <motion.div
              key="ocorrencias"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-slate-800 uppercase flex items-center gap-2">
                    <Settings className="text-indigo-600" /> Configurações de Alerta
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-600 uppercase">Período de Avaliação (Unidade)</h3>
                      <button
                        onClick={() => {
                          if (!config) return;
                          handleUpdateConfig({
                            ...config,
                            contagem_por_unidade: config.contagem_por_unidade ? 0 : 1
                          });
                        }}
                        className={cn(
                          "px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all",
                          config?.contagem_por_unidade ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"
                        )}
                      >
                        {config?.contagem_por_unidade ? 'Ativado' : 'Desativado'}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">Início</label>
                        <input
                          type="date"
                          value={config?.unidade_inicio || ''}
                          onChange={(e) => {
                            if (!config) return;
                            setConfig({ ...config, unidade_inicio: e.target.value });
                          }}
                          className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">Fim</label>
                        <input
                          type="date"
                          value={config?.unidade_fim || ''}
                          onChange={(e) => {
                            if (!config) return;
                            setConfig({ ...config, unidade_fim: e.target.value });
                          }}
                          className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (config) handleUpdateConfig(config);
                      }}
                      className="w-full py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-indigo-100"
                    >
                      Fixar Configuração do Período
                    </button>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                    <h3 className="text-sm font-black text-slate-600 uppercase">Filtro por Disciplinas (Alerta)</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          const next = alertDisciplineIds.length === disciplinas.length ? [] : disciplinas.map(d => d.id);
                          setAlertDisciplineIds(next);
                          if (config) handleUpdateConfig({ ...config, alerta_disciplinas_ids: JSON.stringify(next) });
                        }}
                        className={cn(
                          "px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all",
                          alertDisciplineIds.length === disciplinas.length ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-400"
                        )}
                      >
                        Todas
                      </button>
                      {disciplinas.map(d => (
                        <button
                          key={d.id}
                          onClick={() => {
                            const next = alertDisciplineIds.includes(d.id)
                              ? alertDisciplineIds.filter(id => id !== d.id)
                              : [...alertDisciplineIds, d.id];
                            setAlertDisciplineIds(next);
                            if (config) handleUpdateConfig({ ...config, alerta_disciplinas_ids: JSON.stringify(next) });
                          }}
                          className={cn(
                            "px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all",
                            alertDisciplineIds.includes(d.id) ? "bg-indigo-100 text-indigo-600 border border-indigo-200" : "bg-white border border-slate-200 text-slate-400"
                          )}
                        >
                          {d.nome}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold italic">
                      * A seleção de disciplinas filtrará as ocorrências negativas contadas para o alerta.
                    </p>
                  </div>

                  {['coordenacao', 'familia'].map((type) => {
                    const limite = limitesOcorrencias.find(l => l.tipo === type);
                    const currentLimit = limite?.limite || 3;
                    const currentTurmas = limite ? JSON.parse(limite.turmas_ids as string) : [];

                    return (
                      <div key={type} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-black text-slate-600 uppercase">
                            {type === 'coordenacao' ? 'Encaminhar à Coordenação' : 'Chamar Família'}
                          </h3>
                          <div className="flex items-center gap-2">
                            <input 
                              type="number" 
                              defaultValue={currentLimit}
                              onBlur={(e) => handleSaveLimite(type as any, Number(e.target.value), currentTurmas)}
                              className="w-16 p-2 bg-white border border-slate-200 rounded-xl text-center font-bold"
                            />
                            <span className="text-xs font-bold text-slate-400 uppercase">Ocorrências</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-slate-400 uppercase">Turmas Aplicáveis</p>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => {
                                const allIds = turmas.map(t => t.id);
                                handleSaveLimite(type as any, currentLimit, currentTurmas.length === turmas.length ? [] : allIds);
                              }}
                              className={cn(
                                "px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all",
                                currentTurmas.length === turmas.length ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-400"
                              )}
                            >
                              Todas
                            </button>
                            {turmas.map(t => (
                              <button
                                key={t.id}
                                onClick={() => {
                                  const next = currentTurmas.includes(t.id) 
                                    ? currentTurmas.filter((id: number) => id !== t.id)
                                    : [...currentTurmas, t.id];
                                  handleSaveLimite(type as any, currentLimit, next);
                                }}
                                className={cn(
                                  "px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all",
                                  currentTurmas.includes(t.id) ? "bg-indigo-100 text-indigo-600 border border-indigo-200" : "bg-white border border-slate-200 text-slate-400"
                                )}
                              >
                                {t.nome}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Plus className="text-indigo-600" /> Registrar Ocorrência
                    </h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => { e.preventDefault(); handleSaveOccurrence(); }}>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600">Aluno</label>
                        <select 
                          value={formAlunoId}
                          onChange={(e) => setFormAlunoId(Number(e.target.value))}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value={0}>Selecione um aluno</option>
                          {alunos.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600">Disciplina</label>
                        <select 
                          value={formDisciplinaId}
                          onChange={(e) => setFormDisciplinaId(Number(e.target.value))}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value={0}>Selecione uma disciplina</option>
                          {disciplinas.map(d => <option key={d.id} value={d.id}>{d.nome}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600">Tipo</label>
                        <div className="flex gap-4">
                          <button 
                            type="button"
                            onClick={() => setFormTipo(1)}
                            className={cn(
                              "flex-1 py-3 rounded-xl border-2 font-bold flex items-center justify-center gap-2 transition-all",
                              formTipo === 1 ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-slate-50 text-slate-400 border-slate-100"
                            )}
                          >
                            <ThumbsUp size={18} /> Positivo
                          </button>
                          <button 
                            type="button"
                            onClick={() => setFormTipo(-1)}
                            className={cn(
                              "flex-1 py-3 rounded-xl border-2 font-bold flex items-center justify-center gap-2 transition-all",
                              formTipo === -1 ? "bg-rose-50 text-rose-600 border-rose-200" : "bg-slate-50 text-slate-400 border-slate-100"
                            )}
                          >
                            <ThumbsDown size={18} /> Negativo
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600">Pontuação (1-10)</label>
                        <input 
                          type="number" 
                          min="1" 
                          max="10" 
                          value={formPontos}
                          onChange={(e) => setFormPontos(Number(e.target.value))}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-bold text-slate-600">Descrição</label>
                        <textarea 
                          value={formDescricao}
                          onChange={(e) => setFormDescricao(e.target.value)}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none" 
                          placeholder="Descreva o ocorrido..."
                        />
                      </div>
                      <div className="md:col-span-2 flex items-center gap-4">
                        <button 
                          type="submit"
                          className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
                        >
                          SALVAR REGISTRO
                        </button>
                        <div className="flex items-center gap-2 text-slate-500">
                          <input 
                            type="checkbox" 
                            id="sms" 
                            checked={sendSms}
                            onChange={(e) => setSendSms(e.target.checked)}
                            className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                          />
                          <label htmlFor="sms" className="text-sm font-medium cursor-pointer">Enviar SMS ao Responsável</label>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Bell className="text-amber-500" /> Modelos Rápidos
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {modelos.map(m => (
                        <div key={m.id} className="group relative">
                          <button
                            type="button"
                            onClick={() => handleApplyModel(m)}
                            className={cn(
                              "px-4 py-2 rounded-xl border-2 font-medium transition-all",
                              m.tipo === 1 ? "bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-rose-50 border-rose-100 text-rose-700 hover:bg-rose-100"
                            )}
                          >
                            {m.descricao} (+{m.pontos})
                          </button>
                          <button 
                            type="button"
                            onClick={async (e) => {
                              e.stopPropagation();
                              if (confirm("Excluir este modelo?")) {
                                await fetch(`/api/modelos/${m.id}`, { method: 'DELETE' });
                                fetchData();
                              }
                            }}
                            className="absolute -top-2 -right-2 bg-white text-rose-500 rounded-full p-1 shadow-md border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                      <button 
                        onClick={handleCreateModelo}
                        className="px-4 py-2 rounded-xl border-2 border-dashed border-slate-300 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-all flex items-center gap-2"
                      >
                        <Plus size={18} /> Novo Modelo
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                    <h2 className="text-xl font-black text-slate-800 uppercase mb-6 flex items-center gap-2">
                      <ShieldAlert className="text-rose-600" /> Ações da Coordenação
                    </h2>
                    <div className="space-y-4">
                      {acoesCoordenacao.filter(a => !a.resolvido).length === 0 ? (
                        <p className="text-center py-8 text-slate-400 font-bold italic">Nenhuma ação pendente.</p>
                      ) : (
                        acoesCoordenacao.filter(a => !a.resolvido).sort((a, b) => b.id - a.id).map(acao => (
                          <div key={acao.id} className="p-4 rounded-2xl border bg-white border-slate-200 shadow-sm flex items-center justify-between gap-4 transition-all">
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                "p-3 rounded-xl",
                                acao.tipo === 'coordenacao' ? "bg-indigo-100 text-indigo-600" : "bg-rose-100 text-rose-600"
                              )}>
                                {acao.tipo === 'coordenacao' ? <Users size={20} /> : <Phone size={20} />}
                              </div>
                              <div>
                                <p className="text-sm font-black text-slate-800 uppercase">
                                  {alunos.find(a => a.id === acao.aluno_id)?.nome}
                                </p>
                                <p className="text-xs text-slate-500">{acao.descricao}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{acao.data}</p>
                              </div>
                            </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    setOriginalText(acao.texto_original || acao.descricao);
                                    setShowOriginalTextModal(true);
                                  }}
                                  className="p-2 bg-slate-100 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all"
                                  title="Ver Mensagem do Professor"
                                >
                                  <MessageSquare size={18} />
                                </button>
                                <button
                                  onClick={() => handleToggleActionResolved(acao)}
                                  className={cn(
                                    "p-2 rounded-lg transition-all",
                                    acao.resolvido ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"
                                  )}
                                  title={acao.resolvido ? "Marcar como pendente" : "Enviar para Resolvidas"}
                                >
                                  <CheckCircle2 size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeleteAction(acao.id)}
                                  className="p-2 bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-all"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <AlertTriangle className="text-rose-500" /> Lista de Alerta
                    </h2>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {alunos.map(aluno => {
                        const hasPendingAction = acoesCoordenacao.some(a => a.aluno_id === aluno.id && !a.resolvido);
                        if (hasPendingAction) return null;

                        let alunoOcorrencias = ocorrencias.filter(o => o.aluno_id === aluno.id && o.tipo === -1);
                        
                        if (alertDisciplineIds.length > 0) {
                          alunoOcorrencias = alunoOcorrencias.filter(o => alertDisciplineIds.includes(o.disciplina_id));
                        }
                        
                        if (config?.contagem_por_unidade && config.unidade_inicio && config.unidade_fim) {
                          alunoOcorrencias = alunoOcorrencias.filter(o => o.data >= config.unidade_inicio && o.data <= config.unidade_fim);
                        }
                        
                        const count = alunoOcorrencias.length;
                        
                        const limiteCoord = limitesOcorrencias.find(l => l.tipo === 'coordenacao');
                        const limiteFam = limitesOcorrencias.find(l => l.tipo === 'familia');
                        
                        const turmasCoord = limiteCoord ? JSON.parse(limiteCoord.turmas_ids as string) : [];
                        const turmasFam = limiteFam ? JSON.parse(limiteFam.turmas_ids as string) : [];
                        
                        const reachesCoord = count >= (limiteCoord?.limite || 3) && (turmasCoord.length === 0 || turmasCoord.includes(aluno.turma_id));
                        const reachesFam = count >= (limiteFam?.limite || 5) && (turmasFam.length === 0 || turmasFam.includes(aluno.turma_id));
                        
                        if (!reachesCoord && !reachesFam) return null;

                        return (
                          <div key={aluno.id} className="p-4 bg-rose-50 rounded-xl border border-rose-100 space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p 
                                  className="text-sm font-bold text-rose-900 cursor-pointer hover:underline"
                                  onClick={() => {
                                    setSelectedStudentForModal(aluno);
                                    setShowStudentOccurrencesModal(true);
                                    setOccurrenceFilter('all');
                                  }}
                                >
                                  {aluno.nome}
                                </p>
                                <p className="text-[10px] font-black text-rose-400 uppercase">
                                  {turmas.find(t => t.id === aluno.turma_id)?.nome} • {count} Ocorrências Negativas
                                </p>
                              </div>
                              <div className="flex gap-1">
                                {reachesCoord && (
                                  <button
                                    onClick={() => {
                                      setSelectedStudentForAction(aluno);
                                      setActionType('coordenacao');
                                      setShowActionModal(true);
                                    }}
                                    className="p-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-all"
                                    title="Encaminhar à Coordenação"
                                  >
                                    <Users size={14} />
                                  </button>
                                )}
                                {reachesFam && (
                                  <button
                                    onClick={() => {
                                      setSelectedStudentForAction(aluno);
                                      setActionType('familia');
                                      setShowActionModal(true);
                                    }}
                                    className="p-2 bg-rose-600 text-white rounded-lg shadow-sm hover:bg-rose-700 transition-all"
                                    title="Chamar Família"
                                  >
                                    <Phone size={14} />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {alunos.every(aluno => {
                        let alunoOcorrencias = ocorrencias.filter(o => o.aluno_id === aluno.id && o.tipo === -1);
                        
                        if (alertDisciplineIds.length > 0) {
                          alunoOcorrencias = alunoOcorrencias.filter(o => alertDisciplineIds.includes(o.disciplina_id));
                        }

                        if (config?.contagem_por_unidade && config.unidade_inicio && config.unidade_fim) {
                          alunoOcorrencias = alunoOcorrencias.filter(o => o.data >= config.unidade_inicio && o.data <= config.unidade_fim);
                        }
                        const count = alunoOcorrencias.length;
                        const limiteCoord = limitesOcorrencias.find(l => l.tipo === 'coordenacao');
                        const limiteFam = limitesOcorrencias.find(l => l.tipo === 'familia');
                        const turmasCoord = limiteCoord ? JSON.parse(limiteCoord.turmas_ids as string) : [];
                        const turmasFam = limiteFam ? JSON.parse(limiteFam.turmas_ids as string) : [];
                        const reachesCoord = count >= (limiteCoord?.limite || 3) && (turmasCoord.length === 0 || turmasCoord.includes(aluno.turma_id));
                        const reachesFam = count >= (limiteFam?.limite || 5) && (turmasFam.length === 0 || turmasFam.includes(aluno.turma_id));
                        return !reachesCoord && !reachesFam;
                      }) && (
                        <p className="text-center py-8 text-slate-400 text-xs font-bold italic">Nenhum aluno em alerta.</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <Calendar className="text-indigo-600" /> Últimos Registros
                      </h2>
                      <div className="flex items-center gap-2">
                        {selectedOcorrencias.length > 0 && (
                          <button
                            onClick={() => handleDeleteOcorrencias(selectedOcorrencias)}
                            className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-all flex items-center gap-1 text-xs font-bold"
                            title="Excluir Selecionados"
                          >
                            <Trash2 size={16} /> Excluir ({selectedOcorrencias.length})
                          </button>
                        )}
                        <button 
                          onClick={exportPDF}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all flex items-center gap-1 text-xs font-bold"
                          title="Exportar Relatório em PDF"
                        >
                          <Download size={16} /> PDF
                        </button>
                      </div>
                    </div>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                      {ocorrencias.slice().sort((a, b) => b.id - a.id).slice(0, ocorrenciasLimit).map(o => (
                        <div key={o.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3 group relative">
                          <div className="flex items-center h-full pt-1">
                            <input
                              type="checkbox"
                              checked={selectedOcorrencias.includes(o.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedOcorrencias(prev => [...prev, o.id]);
                                } else {
                                  setSelectedOcorrencias(prev => prev.filter(id => id !== o.id));
                                }
                              }}
                              className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            />
                          </div>
                          <div className={cn(
                            "p-2 rounded-lg",
                            o.tipo === 1 ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                          )}>
                            {o.tipo === 1 ? <Smile size={18} /> : <Frown size={18} />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-slate-800">{alunos.find(a => a.id === o.aluno_id)?.nome}</p>
                            <p className="text-xs text-slate-500">{o.descricao}</p>
                            <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">{o.data}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteOcorrencias([o.id])}
                            className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-600 transition-all"
                            title="Excluir Registro"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                      {ocorrencias.length > ocorrenciasLimit && (
                        <button
                          onClick={() => setOcorrenciasLimit(prev => prev + 10)}
                          className="w-full py-3 text-indigo-600 font-bold text-xs uppercase tracking-widest hover:bg-indigo-50 rounded-xl transition-all border border-dashed border-indigo-200"
                        >
                          Mais Registros
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Modal */}
              <AnimatePresence>
                {showActionModal && selectedStudentForAction && (
                  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
                    >
                      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                            {actionType === 'coordenacao' ? <ShieldAlert size={24} /> : <Phone size={24} />}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-800">
                              {actionType === 'coordenacao' ? 'Encaminhar para Coordenação' : 'Chamar Família'}
                            </h3>
                            <p className="text-sm text-slate-500">Aluno: {selectedStudentForAction.nome}</p>
                          </div>
                        </div>
                        <button onClick={() => setShowActionModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                          <X size={20} className="text-slate-400" />
                        </button>
                      </div>
                      
                      <div className="p-6 space-y-6">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => {
                              const filtered = ocorrencias.filter(o => o.aluno_id === selectedStudentForAction.id && o.tipo === 1);
                              const text = filtered.map(o => `[${o.data}] ${o.descricao}`).join('\n');
                              setActionDescription(prev => prev + (prev ? '\n' : '') + text);
                            }}
                            className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center gap-1"
                          >
                            <ThumbsUp size={14} /> Ocorrências Positivas
                          </button>
                          <button
                            onClick={() => {
                              const filtered = ocorrencias.filter(o => o.aluno_id === selectedStudentForAction.id && o.tipo === -1);
                              const text = filtered.map(o => `[${o.data}] ${o.descricao}`).join('\n');
                              setActionDescription(prev => prev + (prev ? '\n' : '') + text);
                            }}
                            className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-100 transition-colors flex items-center gap-1"
                          >
                            <ThumbsDown size={14} /> Ocorrências Negativas
                          </button>
                          <button
                            onClick={() => {
                              const filtered = ocorrencias.filter(o => o.aluno_id === selectedStudentForAction.id);
                              const text = filtered.map(o => `[${o.data}] ${o.descricao}`).join('\n');
                              setActionDescription(prev => prev + (prev ? '\n' : '') + text);
                            }}
                            className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors flex items-center gap-1"
                          >
                            <LayoutList size={14} /> Todas Ocorrências
                          </button>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase">Descrição da Ação</label>
                          <textarea
                            value={actionDescription}
                            onChange={(e) => setActionDescription(e.target.value)}
                            placeholder="Descreva o motivo do encaminhamento ou as ocorrências observadas..."
                            className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none text-slate-700"
                          />
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => setShowActionModal(false)}
                            className="flex-1 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={handleSaveAction}
                            className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                          >
                            <Save size={20} /> Confirmar Envio
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === 'acoes_coordenacao' && (
            <motion.div
              key="acoes_coordenacao"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 no-print">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <ShieldAlert className="text-indigo-600" /> Ações da Coordenação
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowManualActionModal(true)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-200"
                    >
                      <Plus size={18} /> Inserir Aluno
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      title="Imprimir Lista"
                    >
                      <Printer size={20} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Pendentes */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase flex items-center gap-2">
                      <AlertTriangle size={16} className="text-amber-500" /> Pendentes de Resolução
                    </h3>
                    <div className="space-y-3">
                      {acoesCoordenacao.filter(a => !a.resolvido).length === 0 ? (
                        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400">
                          <CheckCircle2 size={48} className="mx-auto mb-4 opacity-20" />
                          <p>Nenhuma ação pendente no momento.</p>
                        </div>
                      ) : (
                        acoesCoordenacao.filter(a => !a.resolvido).map(action => (
                          <div key={action.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-bold text-slate-800">
                                    {alunos.find(a => a.id === action.aluno_id)?.nome}
                                  </span>
                                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold uppercase">
                                    {turmas.find(t => t.id === alunos.find(a => a.id === action.aluno_id)?.turma_id)?.nome}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 line-clamp-2 mb-3">{action.descricao}</p>
                                <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase">
                                  <span className="flex items-center gap-1"><Calendar size={12} /> {action.data}</span>
                                  <span className={cn(
                                    "px-2 py-0.5 rounded-full",
                                    action.tipo === 'coordenacao' ? "bg-indigo-50 text-indigo-600" : "bg-rose-50 text-rose-600"
                                  )}>
                                    {action.tipo === 'coordenacao' ? 'Coordenação' : 'Família'}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <button
                                  onClick={() => printSingleAction(action)}
                                  className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-slate-600 hover:text-white transition-all"
                                  title="Imprimir Detalhes"
                                >
                                  <Printer size={16} />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedActionForResolution(action);
                                    setShowResolutionModal(true);
                                  }}
                                  className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
                                  title="Resolver"
                                >
                                  <Check size={16} />
                                </button>
                                <button
                                  onClick={() => {
                                    setOriginalText(action.texto_original || action.descricao);
                                    setShowOriginalTextModal(true);
                                  }}
                                  className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all"
                                  title="Ver Texto Original"
                                >
                                  <BookOpen size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteAction(action.id)}
                                  className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all"
                                  title="Excluir"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Resolvidos (Mini Report) */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-500" /> Recentemente Resolvidos
                    </h3>
                    <div className="space-y-3">
                      {acoesCoordenacao.filter(a => a.resolvido).slice(0, 5).map(action => (
                        <div key={action.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 opacity-75 hover:opacity-100 transition-all">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p className="text-sm font-bold text-slate-800">{alunos.find(a => a.id === action.aluno_id)?.nome}</p>
                              <p className="text-xs text-slate-500 mb-2 italic">Resolvido em: {action.data_resolvido}</p>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleReopenAction(action.id)}
                                  className="text-[10px] font-bold text-indigo-600 hover:underline uppercase"
                                >
                                  Reabrir Caso
                                </button>
                              </div>
                            </div>
                            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                              <CheckCircle2 size={16} />
                            </div>
                          </div>
                        </div>
                      ))}
                      {acoesCoordenacao.filter(a => a.resolvido).length > 5 && (
                        <button
                          onClick={() => setActiveTab('relatorios')}
                          className="w-full py-2 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-all uppercase"
                        >
                          Ver todos no Relatório
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Resolved Report Section */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <BarChart2 className="text-emerald-600" /> Relatório de Ocorrências Resolvidas
                  </h2>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      placeholder="Buscar aluno..."
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                      onChange={(e) => setResolvedSearchTerm(e.target.value.toLowerCase())}
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase">Data</th>
                        <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase">Aluno</th>
                        <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase">Tipo</th>
                        <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase">Resolução</th>
                        <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {acoesCoordenacao
                        .filter(a => a.resolvido)
                        .filter(a => alunos.find(al => al.id === a.aluno_id)?.nome.toLowerCase().includes(resolvedSearchTerm))
                        .map(action => (
                          <tr key={action.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                            <td className="py-4 px-4 text-xs text-slate-500">{action.data}</td>
                            <td className="py-4 px-4">
                              <p className="text-sm font-bold text-slate-800">{alunos.find(a => a.id === action.aluno_id)?.nome}</p>
                              <p className="text-[10px] text-slate-400 uppercase font-bold">
                                {turmas.find(t => t.id === alunos.find(a => a.id === action.aluno_id)?.turma_id)?.nome}
                              </p>
                            </td>
                            <td className="py-4 px-4">
                              <span className={cn(
                                "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                                action.tipo === 'coordenacao' ? "bg-indigo-50 text-indigo-600" : "bg-rose-50 text-rose-600"
                              )}>
                                {action.tipo === 'coordenacao' ? 'Coordenação' : 'Família'}
                              </span>
                            </td>
                            <td className="py-4 px-4 max-w-xs">
                              <p className="text-xs text-slate-600 line-clamp-2">{action.resolucao_coordenacao}</p>
                              <p className="text-[10px] text-emerald-600 font-bold mt-1">Resolvido em: {action.data_resolvido}</p>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                <button
                                  onClick={() => {
                                    setOriginalText(action.texto_original || action.descricao);
                                    setShowOriginalTextModal(true);
                                  }}
                                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                                  title="Ver Mensagem do Professor"
                                >
                                  <BookOpen size={16} />
                                </button>
                                <button
                                  onClick={() => {
                                    setOriginalText(action.resolucao_coordenacao || "Sem resolução registrada.");
                                    setShowOriginalTextModal(true);
                                  }}
                                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                                  title="Ver Resolução da Coordenação"
                                >
                                  <MessageSquare size={16} />
                                </button>
                                <button
                                  onClick={() => printSingleAction(action)}
                                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                                  title="Imprimir"
                                >
                                  <Printer size={16} />
                                </button>
                                <button
                                  onClick={() => handleReopenAction(action.id)}
                                  className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg"
                                  title="Reabrir"
                                >
                                  <RotateCcw size={16} />
                                </button>
                                <button
                                  onClick={async () => {
                                    if (confirm("Deseja excluir este registro permanentemente?")) {
                                      await fetch(`/api/acoes-coordenacao/${action.id}`, { method: 'DELETE' });
                                      fetchData();
                                    }
                                  }}
                                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                                  title="Excluir"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'projetos' && (
            <motion.div
              key="projetos"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Projetos Pedagógicos</h2>
                  <p className="text-slate-500">Gerencie projetos independentes e acompanhe a evolução dos alunos.</p>
                </div>
                <button
                  onClick={() => setShowCreateProjetoModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                >
                  <Plus size={20} /> CRIAR PROJETO
                </button>
              </div>

              {!selectedProjetoId ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projetos.map(projeto => (
                    <motion.div
                      key={projeto.id}
                      whileHover={{ y: -4 }}
                      className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group"
                      onClick={() => {
                        setSelectedProjetoId(projeto.id);
                        setIsProjetoUnlocked(false);
                        setProjetoAccessCode('');
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          <FolderKanban size={24} />
                        </div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {projeto.data_inicio} - {projeto.data_termino}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{projeto.nome}</h3>
                      <p className="text-sm text-slate-50 font-medium line-clamp-2 mb-4 text-slate-500">{projeto.descricao}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                            <UserIcon size={12} className="text-slate-400" />
                          </div>
                          <span className="text-xs font-bold text-slate-600">{projeto.professor_responsavel}</span>
                        </div>
                        <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-600 transition-all" />
                      </div>
                    </motion.div>
                  ))}
                  {projetos.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                      <FolderKanban size={48} className="mx-auto mb-4 text-slate-200" />
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Nenhum projeto criado</h3>
                      <p className="text-slate-500">Comece criando seu primeiro projeto pedagógico.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-8">
                  <button
                    onClick={() => setSelectedProjetoId(null)}
                    className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-indigo-600 transition-all uppercase tracking-wider"
                  >
                    <ChevronRight size={18} className="rotate-180" /> Voltar para Projetos
                  </button>

                  {!isProjetoUnlocked ? (
                    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center space-y-6">
                      <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
                        <Lock size={32} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Acesso Restrito</h3>
                        <p className="text-slate-500 text-sm">Para visualizar este projeto, digite o nome completo dele para confirmar sua identidade.</p>
                      </div>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Digite o nome do projeto..."
                          value={projetoAccessCode}
                          onChange={(e) => setProjetoAccessCode(e.target.value)}
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          onClick={() => {
                            const projeto = projetos.find(p => p.id === selectedProjetoId);
                            if (projetoAccessCode === projeto?.nome) {
                              setIsProjetoUnlocked(true);
                            } else {
                              alert("Nome do projeto incorreto!");
                            }
                          }}
                          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                        >
                          LIBERAR ACESSO
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {/* Project Header Info */}
                      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                          <div className="space-y-2">
                            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">
                              {projetos.find(p => p.id === selectedProjetoId)?.nome}
                            </h2>
                            <p className="text-slate-500 font-medium">{projetos.find(p => p.id === selectedProjetoId)?.descricao}</p>
                            <div className="flex flex-wrap gap-4 pt-4">
                              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                <Calendar size={14} /> {projetos.find(p => p.id === selectedProjetoId)?.data_inicio} até {projetos.find(p => p.id === selectedProjetoId)?.data_termino}
                              </div>
                              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                <UserIcon size={14} /> Prof. {projetos.find(p => p.id === selectedProjetoId)?.professor_responsavel}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 self-start">
                            <button
                              onClick={() => setShowCreateProjetoTurmaModal(true)}
                              className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs uppercase hover:bg-slate-200 transition-all flex items-center gap-2"
                            >
                              <Plus size={16} /> Nova Turma
                            </button>
                            <button
                              onClick={() => setShowImportTurmaModal(true)}
                              className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-xs uppercase hover:bg-indigo-100 transition-all flex items-center gap-2"
                            >
                              <Download size={16} /> Importar Turma
                            </button>
                            <button
                              onClick={() => setShowRegistrarExperienciaModal(true)}
                              className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-lg shadow-emerald-100"
                            >
                              <FileText size={16} /> Registrar Experiência
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Project Content Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Classes & Students */}
                        <div className="lg:col-span-2 space-y-6">
                          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <Users className="text-indigo-600" /> Turmas e Alunos
                              </h3>
                              <button
                                onClick={() => setShowAddProjetoAlunoModal(true)}
                                className="text-xs font-bold text-indigo-600 hover:underline"
                              >
                                + Adicionar Aluno Manualmente
                              </button>
                            </div>

                            <div className="space-y-8">
                              {projetoTurmas.filter(pt => pt.projeto_id === selectedProjetoId).map(pt => (
                                <div key={pt.id} className="space-y-4">
                                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                                    <div className="flex items-center gap-3">
                                      <span className="text-sm font-black text-slate-800 uppercase">{pt.nome}</span>
                                      <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold uppercase">{pt.serie} {pt.turno && `- ${pt.turno}`}</span>
                                    </div>
                                    <button
                                      onClick={async () => {
                                        if (confirm("Deseja excluir esta turma do projeto?")) {
                                          await fetch(`/api/projeto-turmas/${pt.id}`, { method: 'DELETE' });
                                          fetchData();
                                        }
                                      }}
                                      className="text-slate-300 hover:text-rose-500 transition-all"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {projetoAlunos.filter(pa => pa.projeto_turma_id === pt.id).map(pa => (
                                      <div key={pa.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm font-bold text-indigo-600">
                                            {pa.nome.charAt(0)}
                                          </div>
                                          <div>
                                            <p className="text-sm font-bold text-slate-800">{pa.nome}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">ID: {pa.identificador}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <div className="text-right">
                                            <p className="text-xs font-black text-indigo-600">{pa.pontos} PTS</p>
                                            <div className="flex gap-1 mt-1">
                                              <button
                                                onClick={() => handleUpdateProjetoAlunoPoints(pa.id, 1)}
                                                className="w-6 h-6 bg-white text-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                              >
                                                +
                                              </button>
                                              <button
                                                onClick={() => handleUpdateProjetoAlunoPoints(pa.id, -1)}
                                                className="w-6 h-6 bg-white text-rose-600 rounded-lg flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                              >
                                                -
                                              </button>
                                            </div>
                                          </div>
                                          <button
                                            onClick={async () => {
                                              if (confirm("Remover aluno do projeto?")) {
                                                await fetch(`/api/projeto-alunos/${pa.id}`, { method: 'DELETE' });
                                                fetchData();
                                              }
                                            }}
                                            className="p-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                                          >
                                            <Trash2 size={14} />
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                    {projetoAlunos.filter(pa => pa.projeto_turma_id === pt.id).length === 0 && (
                                      <div className="col-span-full py-4 text-center text-slate-400 text-xs italic">
                                        Nenhum aluno vinculado a esta turma.
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                              {projetoTurmas.filter(pt => pt.projeto_id === selectedProjetoId).length === 0 && (
                                <div className="py-12 text-center text-slate-400">
                                  <p>Nenhuma turma vinculada a este projeto.</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Cronograma & Experiences */}
                        <div className="space-y-8">
                          {/* Cronograma Section */}
                          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <Calendar className="text-amber-500" /> Cronograma do Projeto
                              </h3>
                              <button
                                onClick={() => setShowCreateProjetoAtividadeModal(true)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-xl font-bold text-[10px] uppercase hover:bg-amber-100 transition-all"
                              >
                                <Plus size={14} /> Adicionar Atividade
                              </button>
                            </div>

                            <div className="space-y-3">
                              {projetoAtividades
                                .filter(a => a.projeto_id === selectedProjetoId)
                                .sort((a, b) => new Date(a.data_execucao).getTime() - new Date(b.data_execucao).getTime())
                                .map(atividade => (
                                  <div key={atividade.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-amber-600">
                                        <Clock size={16} />
                                      </div>
                                      <div>
                                        <p className="text-xs font-bold text-slate-800">{atividade.titulo}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                                          {format(parseISO(atividade.data_execucao), "dd/MM/yyyy")}
                                        </p>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => handleDeleteProjetoAtividade(atividade.id)}
                                      className="p-1.5 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                ))}
                              {projetoAtividades.filter(a => a.projeto_id === selectedProjetoId).length === 0 && (
                                <div className="py-6 text-center text-slate-400 text-xs italic">
                                  Nenhuma atividade cadastrada no cronograma.
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Experiences Feed */}
                          <div className="space-y-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                              <History className="text-indigo-600" /> Registro de Experiências
                            </h3>
                            <div className="flex gap-2">
                              <button 
                                onClick={handlePrintFeed}
                                className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all"
                                title="Imprimir Feed"
                              >
                                <Printer size={18} />
                              </button>
                              <button 
                                onClick={() => setShowRegistrarExperienciaModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all text-xs"
                              >
                                <Plus size={16} /> NOVO REGISTRO
                              </button>
                            </div>
                          </div>

                          <div id="experience-feed" className="space-y-6 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                            {projetoExperiencias
                              .filter(exp => exp.projeto_id === selectedProjetoId)
                              .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                              .map(exp => (
                                <motion.div 
                                  key={exp.id} 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden feed-card hover:shadow-md transition-all"
                                >
                                  <div className="p-5">
                                    <div className="flex justify-between items-start mb-4">
                                      <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                          <Calendar size={20} />
                                        </div>
                                        <div>
                                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                            {format(parseISO(exp.data), "EEEE, d 'de' MMMM", { locale: ptBR })}
                                          </p>
                                          <h4 className="text-sm font-bold text-slate-800">{exp.descricao}</h4>
                                        </div>
                                      </div>
                                      <div className="flex gap-1 no-print">
                                        <button 
                                          onClick={() => {
                                            setEditingExperiencia(exp);
                                            setShowRegistrarExperienciaModal(true);
                                          }}
                                          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-300 hover:text-indigo-600"
                                        >
                                          <Edit3 size={16} />
                                        </button>
                                        <button 
                                          onClick={() => handleDeleteExperiencia(exp.id)}
                                          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-300 hover:text-rose-600"
                                        >
                                          <Trash2 size={16} />
                                        </button>
                                      </div>
                                    </div>

                                    {exp.observacoes && (
                                      <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <p className="text-xs text-slate-600 leading-relaxed italic">"{exp.observacoes}"</p>
                                      </div>
                                    )}

                                    {exp.arquivos && exp.arquivos.length > 0 && (
                                      <div className="grid grid-cols-2 gap-2 feed-media">
                                        {exp.arquivos.map(file => (
                                          <div key={file.id} className="relative group rounded-xl overflow-hidden bg-slate-100 aspect-video flex items-center justify-center">
                                            {file.tipo.startsWith('image/') ? (
                                              <img 
                                                src={file.url} 
                                                alt={file.nome} 
                                                className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                                                referrerPolicy="no-referrer"
                                              />
                                            ) : file.tipo.startsWith('video/') ? (
                                              <video 
                                                src={file.url} 
                                                className="w-full h-full object-cover"
                                                muted
                                                onMouseOver={(e) => e.currentTarget.play()}
                                                onMouseOut={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                                              />
                                            ) : (
                                              <div className="flex flex-col items-center gap-1 text-slate-400">
                                                <FileText size={24} />
                                                <span className="text-[8px] font-bold uppercase truncate max-w-[80px]">{file.nome}</span>
                                              </div>
                                            )}
                                            <a 
                                              href={file.url} 
                                              download={file.nome}
                                              className="absolute top-1 right-1 p-1.5 bg-black/50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity no-print"
                                            >
                                              <Download size={12} />
                                            </a>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              ))}
                            
                            {projetoExperiencias.filter(exp => exp.projeto_id === selectedProjetoId).length === 0 && (
                              <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-slate-100">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300">
                                  <History size={32} />
                                </div>
                                <h4 className="text-sm font-bold text-slate-400">Nenhum registro encontrado</h4>
                                <p className="text-[10px] text-slate-400 mt-1">Comece registrando a primeira experiência deste projeto.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

          {activeTab === 'alunos_especiais' && (
            <motion.div
              key="alunos_especiais"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Alunos em Condições Especiais</h2>
                  <p className="text-slate-500">Acompanhamento individualizado e planos de apoio pedagógico.</p>
                </div>
                <button
                  onClick={() => setShowCadastrarAlunoEspecialModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                >
                  <Plus size={20} /> CADASTRAR ALUNO
                </button>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-wider">Aluno</th>
                        <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-wider">Turma</th>
                        <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-wider">Disciplina</th>
                        <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-wider text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {alunosEspeciais.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="p-12 text-center text-slate-400 font-medium">
                            Nenhum aluno cadastrado nesta seção.
                          </td>
                        </tr>
                      ) : (
                        alunosEspeciais.map((ae) => {
                          const aluno = alunos.find(a => a.id === ae.aluno_id);
                          const turma = turmas.find(t => t.id === ae.turma_id);
                          const disciplina = disciplinas.find(d => d.id === ae.disciplina_id);
                          
                          return (
                            <tr key={ae.id} className="hover:bg-slate-50 transition-colors group">
                              <td className="p-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
                                    {aluno?.nome.charAt(0)}
                                  </div>
                                  <span className="font-bold text-slate-800">{aluno?.nome}</span>
                                </div>
                              </td>
                              <td className="p-6">
                                <span className="text-xs font-black text-slate-500 uppercase">{turma?.nome}</span>
                              </td>
                              <td className="p-6">
                                <button
                                  onClick={() => {
                                    setSelectedAlunoEspecial(ae);
                                    setShowPlanoAcompanhamentoModal(true);
                                  }}
                                  className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-xs uppercase hover:bg-indigo-600 hover:text-white transition-all"
                                >
                                  {disciplina?.nome}
                                </button>
                              </td>
                              <td className="p-6 text-right">
                                <button
                                  onClick={async () => {
                                    if (confirm("Deseja remover este aluno do acompanhamento especial?")) {
                                      await fetch(`/api/alunos-especiais/${ae.id}`, { method: 'DELETE' });
                                      fetchData();
                                    }
                                  }}
                                  className="p-2 text-slate-300 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === 'agenda' && (
            <motion.div
              key="agenda"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Agenda Geral</h2>
                  <p className="text-slate-500">Visualize compromissos institucionais e pessoais.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Institutional Events Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-indigo-600 flex items-center gap-2">
                    <ShieldCheck size={20} /> Institucional
                  </h3>
                  <div className="space-y-3">
                    {eventosInstitucionais.length === 0 ? (
                      <p className="text-slate-400 text-sm italic">Nenhum evento institucional.</p>
                    ) : (
                      eventosInstitucionais.map(e => (
                        <div key={e.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
                              {e.tipo || 'Evento'}
                            </span>
                            <span className="text-xs font-bold text-slate-400">{format(parseISO(e.data), 'dd/MM/yyyy')}</span>
                          </div>
                          <h4 className="font-bold text-slate-800 mb-1">{e.titulo}</h4>
                          <p className="text-sm text-slate-500 line-clamp-2">{e.descricao}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Personal Events Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-emerald-600 flex items-center gap-2">
                    <UserIcon size={20} /> Pessoal
                  </h3>
                  {!professorLogadoId ? (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-700 text-sm">
                      <p className="font-bold mb-1">Agenda não vinculada!</p>
                      <p>Vincule seu nome na aba <strong>Professor</strong> para ver seus compromissos.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {eventosPessoais.filter(e => e.professor_id === professorLogadoId).length === 0 ? (
                        <p className="text-slate-400 text-sm italic">Nenhum evento pessoal.</p>
                      ) : (
                        eventosPessoais.filter(e => e.professor_id === professorLogadoId).map(e => (
                          <div key={e.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                                Pessoal
                              </span>
                              <span className="text-xs font-bold text-slate-400">{format(parseISO(e.data), 'dd/MM/yyyy')}</span>
                            </div>
                            <h4 className="font-bold text-slate-800 mb-1">{e.titulo}</h4>
                            <p className="text-sm text-slate-500 line-clamp-2">{e.descricao}</p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'professor' && (
            <motion.div
              key="professor"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                    <UserIcon size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      {professorLogadoId ? professores.find(p => p.id === professorLogadoId)?.nome : 'Área do Professor'}
                    </h2>
                    <p className="text-slate-500">Gerencie seu horário e compromissos pessoais.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl">
                  <button
                    onClick={() => setProfessorSubTab('horario')}
                    className={cn(
                      "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                      professorSubTab === 'horario' ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    Horário
                  </button>
                  <button
                    onClick={() => setProfessorSubTab('agenda')}
                    className={cn(
                      "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                      professorSubTab === 'agenda' ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    Agenda
                  </button>
                </div>
              </div>

              {!professorLogadoId ? (
                <div className="bg-white p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center space-y-6">
                  <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto">
                    <Lock size={40} />
                  </div>
                  <div className="max-w-md mx-auto space-y-2">
                    <h3 className="text-xl font-bold text-slate-800">Vincule sua Agenda</h3>
                    <p className="text-slate-500">Para acessar seu horário e agenda pessoal, selecione seu nome abaixo.</p>
                  </div>
                  <div className="max-w-xs mx-auto">
                    <select 
                      onChange={(e) => {
                        const id = Number(e.target.value);
                        if (id) {
                          setProfessorLogadoId(id);
                          localStorage.setItem('professorLogadoId', String(id));
                        }
                      }}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    >
                      <option value="">Selecione seu nome...</option>
                      {professores.map(p => (
                        <option key={p.id} value={p.id}>{p.nome}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <>
                  {professorSubTab === 'horario' && (
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'].map(dia => (
                          <div key={dia} className="space-y-4">
                            <h4 className="text-center font-black text-xs uppercase tracking-[0.2em] text-slate-400 py-2 border-b border-slate-100">
                              {dia}
                            </h4>
                            <div className="space-y-3">
                              {teacherSchedules
                                .filter(h => h.day_of_week === dia && h.teacher_id === professorLogadoId)
                                .sort((a, b) => a.class_time.localeCompare(b.class_time))
                                .map(h => (
                                  <div 
                                    key={h.id} 
                                    onClick={() => {
                                      setSelectedScheduleForHomework(h);
                                      setShowHomeworkModal(true);
                                    }}
                                    className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 cursor-pointer hover:bg-indigo-50 transition-all group"
                                  >
                                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest flex justify-between">
                                      {h.class_time}
                                      <Plus size={10} className="opacity-0 group-hover:opacity-100 transition-all" />
                                    </p>
                                    <p className="font-bold text-slate-800 text-sm">
                                      {h.class_group}
                                    </p>
                                    <p className="text-xs text-slate-500 font-medium">
                                      {h.subject}
                                    </p>
                                  </div>
                                ))}
                              {teacherSchedules.filter(h => h.day_of_week === dia && h.teacher_id === professorLogadoId).length === 0 && (
                                <div className="h-24 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl">
                                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Sem aulas</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {professorSubTab === 'agenda' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-800">Meus Compromissos</h3>
                        <button
                          onClick={() => {
                            setEventType('pessoal');
                            setShowEventModal(true);
                          }}
                          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                        >
                          <Plus size={20} /> ADICIONAR EVENTO
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {eventosPessoais.filter(e => e.professor_id === professorLogadoId).map(e => (
                          <div key={e.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-4">
                              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl">
                                <Calendar size={20} />
                              </div>
                              <button 
                                onClick={() => handleDeleteEvent(e.id, 'pessoal')}
                                className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                            <div className="space-y-2">
                              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                {format(parseISO(e.data), 'dd/MM/yyyy')}
                              </p>
                              <h4 className="text-lg font-bold text-slate-800">{e.titulo}</h4>
                              <p className="text-sm text-slate-500 leading-relaxed">{e.descricao}</p>
                            </div>
                          </div>
                        ))}
                        {eventosPessoais.filter(e => e.professor_id === professorLogadoId).length === 0 && (
                          <div className="col-span-full py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center">
                              <Calendar size={32} />
                            </div>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Sua agenda está vazia</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'relatorios' && (
            <motion.div
              key="relatorios"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6 no-print">
                <div className="flex flex-wrap items-center gap-4">
                  <label className="text-xs font-bold text-slate-400 uppercase w-full">Unidades</label>
                  {config?.unidades.map(u => (
                    <button
                      key={u.id}
                      onClick={() => {
                        setReportStartDate(u.inicio);
                        setReportEndDate(u.fim);
                      }}
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm font-bold transition-all",
                        reportStartDate === u.inicio && reportEndDate === u.fim 
                          ? "bg-indigo-600 text-white" 
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      )}
                    >
                      {u.nome}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Período</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="date" 
                        value={reportStartDate}
                        onChange={(e) => setReportStartDate(e.target.value)}
                        className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" 
                      />
                      <span className="text-slate-300">até</span>
                      <input 
                        type="date" 
                        value={reportEndDate}
                        onChange={(e) => setReportEndDate(e.target.value)}
                        className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Turma</label>
                    <select 
                      value={reportTurmaId}
                      onChange={(e) => {
                        setReportTurmaId(e.target.value);
                        setReportStudentId('all');
                      }}
                      className="w-48 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    >
                      <option value="all">Todas as Turmas</option>
                      {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Aluno</label>
                    <select 
                      value={reportStudentId}
                      onChange={(e) => setReportStudentId(e.target.value)}
                      className="w-48 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    >
                      <option value="all">Todos os Alunos</option>
                      {alunos
                        .filter(a => reportTurmaId === 'all' || a.turma_id === Number(reportTurmaId))
                        .map(a => <option key={a.id} value={a.id}>{a.nome}</option>)
                      }
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Disciplina</label>
                    <select 
                      value={reportDisciplineId}
                      onChange={(e) => setReportDisciplineId(e.target.value)}
                      className="w-48 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    >
                      <option value="all">Todas as Disciplinas</option>
                      {disciplinas.map(d => <option key={d.id} value={d.id}>{d.nome}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Ordenação / Agrupamento</label>
                    <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1 rounded-xl">
                      <button
                        onClick={() => setReportSortAlphabetical(!reportSortAlphabetical)}
                        className={cn(
                          "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                          reportSortAlphabetical ? "bg-blue-500 text-white shadow-md" : "text-slate-500 hover:bg-slate-200"
                        )}
                      >
                        <ArrowUpAZ size={14} /> ALFABÉTICA
                      </button>
                      <button
                        onClick={() => setReportGroupByTurma(!reportGroupByTurma)}
                        className={cn(
                          "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                          reportGroupByTurma ? "bg-indigo-500 text-white shadow-md" : "text-slate-500 hover:bg-slate-200"
                        )}
                      >
                        <Users size={14} /> POR TURMA
                      </button>
                      <button
                        onClick={() => {
                          setReportSortMostOccurrences(!reportSortMostOccurrences);
                          if (!reportSortMostOccurrences) setReportSortLeastOccurrences(false);
                        }}
                        className={cn(
                          "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                          reportSortMostOccurrences ? "bg-emerald-500 text-white shadow-md" : "text-slate-500 hover:bg-slate-200"
                        )}
                      >
                        <ArrowUpWideNarrow size={14} /> MAIS OCORRÊNCIAS
                      </button>
                      <button
                        onClick={() => {
                          setReportSortLeastOccurrences(!reportSortLeastOccurrences);
                          if (!reportSortLeastOccurrences) setReportSortMostOccurrences(false);
                        }}
                        className={cn(
                          "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                          reportSortLeastOccurrences ? "bg-rose-500 text-white shadow-md" : "text-slate-500 hover:bg-slate-200"
                        )}
                      >
                        <ArrowDownWideNarrow size={14} /> MENOS OCORRÊNCIAS
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Tamanho da Fonte</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="range" 
                        min="8" 
                        max="24" 
                        value={reportFontSize}
                        onChange={(e) => setReportFontSize(Number(e.target.value))}
                        className="w-32"
                      />
                      <span className="text-sm font-bold text-slate-600">{reportFontSize}px</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Tipo de Ocorrência</label>
                    <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
                      {[
                        { id: 'all', label: 'Todas' },
                        { id: 'positive', label: 'Positivas' },
                        { id: 'negative', label: 'Negativas' }
                      ].map(f => (
                        <button
                          key={f.id}
                          onClick={() => setReportOccurrenceType(f.id as any)}
                          className={cn(
                            "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                            reportOccurrenceType === f.id ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                          )}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-50 no-print">
                  <button 
                    onClick={exportPDF}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                  >
                    <Download size={20} /> EXPORTAR PDF
                  </button>
                  <button 
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all"
                  >
                    <Printer size={20} /> IMPRIMIR
                  </button>
                  {reportStudentId !== 'all' && (
                    <button 
                      onClick={() => {
                        const student = alunos.find(a => a.id === Number(reportStudentId));
                        if (student) {
                          setSelectedStudentForOccurrenceView(student);
                          setShowOccurrenceViewModal(true);
                        }
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-100 transition-all border border-indigo-100"
                    >
                      <Eye size={20} /> VISUALIZAR OCORRÊNCIAS
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      const types: ('bar' | 'pie' | 'line' | 'area')[] = ['bar', 'pie', 'line', 'area'];
                      const next = types[(types.indexOf(reportChartType) + 1) % types.length];
                      setReportChartType(next);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-slate-100"
                  >
                    <BarChart2 size={20} /> ALTERAR GRÁFICO ({reportChartType.toUpperCase()})
                  </button>
                  <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                    <button 
                      onClick={() => setReportView('occurrences')}
                      className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", reportView === 'occurrences' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500")}
                    >
                      OCORRÊNCIAS
                    </button>
                    <button 
                      onClick={() => setReportView('homework')}
                      className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", reportView === 'homework' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500")}
                    >
                      TAREFAS
                    </button>
                  </div>
                </div>
              </div>

              {reportView === 'occurrences' ? (
                <>
                  <div id="report-content" className="grid grid-cols-1 lg:grid-cols-2 gap-8 no-print">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                      <h3 className="text-lg font-bold mb-8 text-slate-800">Desempenho por Turma/Aluno</h3>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          {reportChartType === 'bar' ? (
                            <BarChart data={turmas
                              .filter(t => reportTurmaId === 'all' || t.id === Number(reportTurmaId))
                              .map(t => {
                                const turmaAlunos = alunos.filter(a => a.turma_id === t.id && (reportStudentId === 'all' || a.id === Number(reportStudentId)));
                                const filteredOcorrencias = ocorrencias.filter(o => {
                                  const inTurma = turmaAlunos.some(a => a.id === o.aluno_id);
                                  const inDiscipline = reportDisciplineId === 'all' || o.disciplina_id === Number(reportDisciplineId);
                                  const inDateRange = (!reportStartDate || o.data >= reportStartDate) && 
                                                     (!reportEndDate || o.data <= reportEndDate);
                                  const matchesType = reportOccurrenceType === 'all' || 
                                                     (reportOccurrenceType === 'positive' && o.tipo === 1) ||
                                                     (reportOccurrenceType === 'negative' && o.tipo === -1);
                                  return inTurma && inDiscipline && inDateRange && matchesType;
                                });
                                const pontos = filteredOcorrencias.reduce((acc, curr) => acc + (curr.tipo * curr.pontos), 0);
                                return { name: t.nome, pontos };
                              })}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                              <Tooltip 
                                contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                cursor={{ fill: '#F8FAFC' }}
                              />
                              <Bar dataKey="pontos" fill="#6366F1" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                          ) : reportChartType === 'line' ? (
                            <LineChart data={ocorrencias
                              .filter(o => {
                                const aluno = alunos.find(a => a.id === o.aluno_id);
                                if (!aluno) return false;
                                const inTurma = reportTurmaId === 'all' || aluno.turma_id === Number(reportTurmaId);
                                const inStudent = reportStudentId === 'all' || aluno.id === Number(reportStudentId);
                                const inDiscipline = reportDisciplineId === 'all' || o.disciplina_id === Number(reportDisciplineId);
                                const inDateRange = (!reportStartDate || o.data >= reportStartDate) && 
                                                   (!reportEndDate || o.data <= reportEndDate);
                                const matchesType = reportOccurrenceType === 'all' || 
                                                   (reportOccurrenceType === 'positive' && o.tipo === 1) ||
                                                   (reportOccurrenceType === 'negative' && o.tipo === -1);
                                return inTurma && inStudent && inDiscipline && inDateRange && matchesType;
                              })
                              .sort((a, b) => a.data.localeCompare(b.data))
                              .reduce((acc: any[], curr) => {
                                const existing = acc.find(item => item.date === curr.data);
                                if (existing) {
                                  existing.pontos += (curr.tipo * curr.pontos);
                                } else {
                                  acc.push({ date: curr.data, pontos: (curr.tipo * curr.pontos) });
                                }
                                return acc;
                              }, [])}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 10 }} />
                              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                              <Tooltip />
                              <Line type="monotone" dataKey="pontos" stroke="#6366F1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                          ) : reportChartType === 'area' ? (
                            <AreaChart data={ocorrencias
                              .filter(o => {
                                const aluno = alunos.find(a => a.id === o.aluno_id);
                                if (!aluno) return false;
                                const inTurma = reportTurmaId === 'all' || aluno.turma_id === Number(reportTurmaId);
                                const inStudent = reportStudentId === 'all' || aluno.id === Number(reportStudentId);
                                const inDiscipline = reportDisciplineId === 'all' || o.disciplina_id === Number(reportDisciplineId);
                                const inDateRange = (!reportStartDate || o.data >= reportStartDate) && 
                                                   (!reportEndDate || o.data <= reportEndDate);
                                const matchesType = reportOccurrenceType === 'all' || 
                                                   (reportOccurrenceType === 'positive' && o.tipo === 1) ||
                                                   (reportOccurrenceType === 'negative' && o.tipo === -1);
                                return inTurma && inStudent && inDiscipline && inDateRange && matchesType;
                              })
                              .sort((a, b) => a.data.localeCompare(b.data))
                              .reduce((acc: any[], curr) => {
                                const existing = acc.find(item => item.date === curr.data);
                                if (existing) {
                                  existing.pontos += (curr.tipo * curr.pontos);
                                } else {
                                  acc.push({ date: curr.data, pontos: (curr.tipo * curr.pontos) });
                                }
                                return acc;
                              }, [])}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 10 }} />
                              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                              <Tooltip />
                              <Area type="monotone" dataKey="pontos" stroke="#6366F1" fill="#6366F1" fillOpacity={0.1} />
                            </AreaChart>
                          ) : (
                            <PieChart>
                              <Pie
                                data={turmas
                                  .filter(t => reportTurmaId === 'all' || t.id === Number(reportTurmaId))
                                  .map(t => {
                                    const turmaAlunos = alunos.filter(a => a.turma_id === t.id && (reportStudentId === 'all' || a.id === Number(reportStudentId)));
                                    const filteredOcorrencias = ocorrencias.filter(o => {
                                      const inTurma = turmaAlunos.some(a => a.id === o.aluno_id);
                                      const inDiscipline = reportDisciplineId === 'all' || o.disciplina_id === Number(reportDisciplineId);
                                      const inDateRange = (!reportStartDate || o.data >= reportStartDate) && 
                                                         (!reportEndDate || o.data <= reportEndDate);
                                      const matchesType = reportOccurrenceType === 'all' || 
                                                         (reportOccurrenceType === 'positive' && o.tipo === 1) ||
                                                         (reportOccurrenceType === 'negative' && o.tipo === -1);
                                      return inTurma && inDiscipline && inDateRange && matchesType;
                                    });
                                    const value = filteredOcorrencias.length;
                                    return { name: t.nome, value };
                                  })}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={8}
                                dataKey="value"
                              >
                                {turmas.map((_, index) => (
                                  <Cell key={`cell-${index}`} fill={['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5]} />
                                ))}
                              </Pie>
                              <Tooltip />
                              <Legend />
                            </PieChart>
                          )}
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                      <h3 className="text-lg font-bold mb-8 text-slate-800">Distribuição de Ocorrências</h3>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Positivas', value: ocorrencias.filter(o => {
                                  const aluno = alunos.find(a => a.id === o.aluno_id);
                                  if (!aluno) return false;
                                  const inTurma = reportTurmaId === 'all' || aluno.turma_id === Number(reportTurmaId);
                                  const inStudent = reportStudentId === 'all' || aluno.id === Number(reportStudentId);
                                  const inDiscipline = reportDisciplineId === 'all' || o.disciplina_id === Number(reportDisciplineId);
                                  const inDateRange = (!reportStartDate || o.data >= reportStartDate) && 
                                                     (!reportEndDate || o.data <= reportEndDate);
                                  const matchesType = reportOccurrenceType === 'all' || 
                                                     (reportOccurrenceType === 'positive' && o.tipo === 1) ||
                                                     (reportOccurrenceType === 'negative' && o.tipo === -1);
                                  return o.tipo === 1 && inTurma && inStudent && inDiscipline && inDateRange && matchesType;
                                }).length },
                                { name: 'Negativas', value: ocorrencias.filter(o => {
                                  const aluno = alunos.find(a => a.id === o.aluno_id);
                                  if (!aluno) return false;
                                  const inTurma = reportTurmaId === 'all' || aluno.turma_id === Number(reportTurmaId);
                                  const inStudent = reportStudentId === 'all' || aluno.id === Number(reportStudentId);
                                  const inDiscipline = reportDisciplineId === 'all' || o.disciplina_id === Number(reportDisciplineId);
                                  const inDateRange = (!reportStartDate || o.data >= reportStartDate) && 
                                                     (!reportEndDate || o.data <= reportEndDate);
                                  const matchesType = reportOccurrenceType === 'all' || 
                                                     (reportOccurrenceType === 'positive' && o.tipo === 1) ||
                                                     (reportOccurrenceType === 'negative' && o.tipo === -1);
                                  return o.tipo === -1 && inTurma && inStudent && inDiscipline && inDateRange && matchesType;
                                }).length },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={8}
                              dataKey="value"
                            >
                              <Cell fill="#10B981" />
                              <Cell fill="#EF4444" />
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Report Preview Section */}
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mt-8">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-lg font-bold text-slate-800">Pré-visualização do Relatório</h3>
                      <div className="flex gap-2 no-print">
                        {selectedOcorrencias.length > 0 && (
                          <button
                            onClick={() => handleDeleteOcorrencias(selectedOcorrencias)}
                            className="flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-xl font-bold shadow-lg shadow-rose-100 hover:bg-rose-700 transition-all"
                          >
                            <Trash2 size={20} /> EXCLUIR SELECIONADOS ({selectedOcorrencias.length})
                          </button>
                        )}
                        <button 
                          onClick={exportPDF}
                          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                        >
                          <Download size={20} /> EXPORTAR PDF
                        </button>
                        <button 
                          onClick={handlePrint}
                          className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all"
                        >
                          <Printer size={20} /> IMPRIMIR
                        </button>
                      </div>
                    </div>
                    
                    <div id="report-preview" className="bg-white p-10 border border-slate-100 rounded-xl overflow-x-auto" style={{ fontSize: `${reportFontSize}px` }}>
                      <div className="min-w-[800px]">
                        {/* Header */}
                        <div className="text-center mb-12">
                          <h2 className="text-3xl font-black text-slate-800 uppercase mb-2" style={{ fontSize: `${reportFontSize * 2.5}px` }}>Relatório de Ocorrências Escolares</h2>
                          <div className="flex justify-center gap-8 text-slate-500 font-bold text-xs uppercase tracking-widest" style={{ fontSize: `${reportFontSize * 0.8}px` }}>
                            <span>Período: {reportStartDate ? format(parseISO(reportStartDate), 'dd/MM/yyyy') : 'Início'} - {reportEndDate ? format(parseISO(reportEndDate), 'dd/MM/yyyy') : 'Fim'}</span>
                            <span>Emitido em: {format(new Date(), 'dd/MM/yyyy')}</span>
                          </div>
                        </div>

                        {/* Student Groups */}
                        <div className="space-y-8">
                          {reportSortOrder === 'turma' ? (
                            // Grouped by Turma view
                            turmas
                              .filter(t => reportTurmaId === 'all' || t.id === Number(reportTurmaId))
                              .map(turma => {
                                const turmaData = reportData.filter(d => d.aluno.turma_id === turma.id);
                                if (turmaData.length === 0) return null;
                                return (
                                  <div key={turma.id} className="space-y-6 border-t-2 border-slate-100 pt-6">
                                    <h3 className="text-2xl font-black text-indigo-600 uppercase" style={{ fontSize: `${reportFontSize * 1.5}px` }}>TURMA: {turma.nome}</h3>
                                    <div className="space-y-8">
                                      {turmaData.map(({ aluno, occurrences }) => (
                                        <div key={aluno.id} className="space-y-2 break-inside-avoid">
                                          <div className="flex justify-between items-end border-b border-slate-100 pb-1">
                                            <h4 className="font-bold text-slate-900 uppercase" style={{ fontSize: `${reportFontSize * 1.2}px` }}>{aluno.nome}</h4>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest" style={{ fontSize: `${reportFontSize * 0.7}px` }}>
                                              {occurrences.length} Ocorrência(s)
                                            </span>
                                          </div>
                                          
                                          <table className="w-full text-left border-collapse">
                                            <thead>
                                              <tr className="border-b border-slate-50">
                                                <th className="py-1 w-8 no-print">
                                                  <input
                                                    type="checkbox"
                                                    onChange={(e) => {
                                                      const ids = occurrences.map(o => o.id);
                                                      if (e.target.checked) {
                                                        setSelectedOcorrencias(prev => Array.from(new Set([...prev, ...ids])));
                                                      } else {
                                                        setSelectedOcorrencias(prev => prev.filter(id => !ids.includes(id)));
                                                      }
                                                    }}
                                                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                                  />
                                                </th>
                                                <th className="py-1 font-black text-slate-400 uppercase tracking-widest" style={{ fontSize: `${reportFontSize * 0.7}px` }}>Data</th>
                                                <th className="py-1 font-black text-slate-400 uppercase tracking-widest" style={{ fontSize: `${reportFontSize * 0.7}px` }}>Disciplina</th>
                                                <th className="py-1 font-black text-slate-400 uppercase tracking-widest" style={{ fontSize: `${reportFontSize * 0.7}px` }}>Descrição</th>
                                                <th className="py-1 font-black text-slate-400 uppercase tracking-widest text-right" style={{ fontSize: `${reportFontSize * 0.7}px` }}>Pontos</th>
                                                <th className="py-1 w-8 no-print"></th>
                                              </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50">
                                              {occurrences.map(o => (
                                                <tr key={o.id} className="group">
                                                  <td className="py-1 no-print">
                                                    <input
                                                      type="checkbox"
                                                      checked={selectedOcorrencias.includes(o.id)}
                                                      onChange={(e) => {
                                                        if (e.target.checked) {
                                                          setSelectedOcorrencias(prev => [...prev, o.id]);
                                                        } else {
                                                          setSelectedOcorrencias(prev => prev.filter(id => id !== o.id));
                                                        }
                                                      }}
                                                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                                    />
                                                  </td>
                                                  <td className="py-1 font-medium text-slate-600" style={{ fontSize: `${reportFontSize * 0.9}px` }}>{format(parseISO(o.data), 'dd/MM/yyyy')}</td>
                                                  <td className="py-1">
                                                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full font-black uppercase" style={{ fontSize: `${reportFontSize * 0.6}px` }}>
                                                      {disciplinas.find(d => d.id === o.disciplina_id)?.nome}
                                                    </span>
                                                  </td>
                                                  <td className="py-1 text-slate-500" style={{ fontSize: `${reportFontSize * 0.9}px` }}>{o.descricao}</td>
                                                  <td className={cn(
                                                    "py-1 font-black text-right",
                                                    o.tipo === 1 ? "text-emerald-600" : "text-rose-600"
                                                  )} style={{ fontSize: `${reportFontSize * 0.9}px` }}>
                                                    {o.tipo === 1 ? '+' : '-'}{o.pontos}
                                                  </td>
                                                  <td className="py-1 text-right no-print">
                                                    <button
                                                      onClick={() => handleDeleteOcorrencias([o.id])}
                                                      className="p-1 text-slate-300 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100"
                                                      title="Excluir Registro"
                                                    >
                                                      <Trash2 size={14} />
                                                    </button>
                                                  </td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })
                          ) : (
                            // Sequential view (Alphabetical or by Occurrences)
                            reportData.map(({ aluno, occurrences }) => (
                              <div key={aluno.id} className="space-y-2 break-inside-avoid">
                                <div className="flex justify-between items-end border-b border-slate-100 pb-1">
                                  <div>
                                    <h4 className="font-bold text-slate-900 uppercase" style={{ fontSize: `${reportFontSize * 1.2}px` }}>{aluno.nome}</h4>
                                    <p className="font-bold text-slate-400 uppercase tracking-widest" style={{ fontSize: `${reportFontSize * 0.7}px` }}>
                                      {turmas.find(t => t.id === aluno.turma_id)?.nome}
                                    </p>
                                  </div>
                                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest" style={{ fontSize: `${reportFontSize * 0.7}px` }}>
                                    {occurrences.length} Ocorrência(s)
                                  </span>
                                </div>
                                
                                <table className="w-full text-left border-collapse">
                                  <thead>
                                    <tr className="border-b border-slate-50">
                                      <th className="py-1 w-8 no-print">
                                        <input
                                          type="checkbox"
                                          onChange={(e) => {
                                            const ids = occurrences.map(o => o.id);
                                            if (e.target.checked) {
                                              setSelectedOcorrencias(prev => Array.from(new Set([...prev, ...ids])));
                                            } else {
                                              setSelectedOcorrencias(prev => prev.filter(id => !ids.includes(id)));
                                            }
                                          }}
                                          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                        />
                                      </th>
                                      <th className="py-1 font-black text-slate-400 uppercase tracking-widest" style={{ fontSize: `${reportFontSize * 0.7}px` }}>Data</th>
                                      <th className="py-1 font-black text-slate-400 uppercase tracking-widest" style={{ fontSize: `${reportFontSize * 0.7}px` }}>Disciplina</th>
                                      <th className="py-1 font-black text-slate-400 uppercase tracking-widest" style={{ fontSize: `${reportFontSize * 0.7}px` }}>Descrição</th>
                                      <th className="py-1 font-black text-slate-400 uppercase tracking-widest text-right" style={{ fontSize: `${reportFontSize * 0.7}px` }}>Pontos</th>
                                      <th className="py-1 w-8 no-print"></th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-50">
                                    {occurrences.map(o => (
                                      <tr key={o.id} className="group">
                                        <td className="py-1 no-print">
                                          <input
                                            type="checkbox"
                                            checked={selectedOcorrencias.includes(o.id)}
                                            onChange={(e) => {
                                              if (e.target.checked) {
                                                setSelectedOcorrencias(prev => [...prev, o.id]);
                                              } else {
                                                setSelectedOcorrencias(prev => prev.filter(id => id !== o.id));
                                              }
                                            }}
                                            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                          />
                                        </td>
                                        <td className="py-1 font-medium text-slate-600" style={{ fontSize: `${reportFontSize * 0.9}px` }}>{format(parseISO(o.data), 'dd/MM/yyyy')}</td>
                                        <td className="py-1">
                                          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full font-black uppercase" style={{ fontSize: `${reportFontSize * 0.6}px` }}>
                                            {disciplinas.find(d => d.id === o.disciplina_id)?.nome}
                                          </span>
                                        </td>
                                        <td className="py-1 text-slate-500" style={{ fontSize: `${reportFontSize * 0.9}px` }}>{o.descricao}</td>
                                        <td className={cn(
                                          "py-1 font-black text-right",
                                          o.tipo === 1 ? "text-emerald-600" : "text-rose-600"
                                        )} style={{ fontSize: `${reportFontSize * 0.9}px` }}>
                                          {o.tipo === 1 ? '+' : '-'}{o.pontos}
                                        </td>
                                        <td className="py-1 text-right no-print">
                                          <button
                                            onClick={() => handleDeleteOcorrencias([o.id])}
                                            className="p-1 text-slate-300 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100"
                                            title="Excluir Registro"
                                          >
                                            <Trash2 size={14} />
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ))
                          )}
                          
                          {reportData.length === 0 && (
                            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                              <p className="text-slate-400 font-bold">Nenhum dado encontrado para os filtros selecionados.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div id="report-preview" className="bg-white p-10 border border-slate-100 rounded-xl overflow-x-auto">
                  <div className="min-w-[800px]">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl font-black text-slate-800 uppercase mb-2">Relatório de Tarefas de Casa</h2>
                      <div className="flex justify-center gap-8 text-slate-500 font-bold text-xs uppercase tracking-widest">
                        <span>Emitido em: {format(new Date(), 'dd/MM/yyyy')}</span>
                      </div>
                    </div>
                    
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b-2 border-slate-800">
                          <th className="py-4 text-sm font-black uppercase">Data</th>
                          <th className="py-4 text-sm font-black uppercase">Turma/Disciplina</th>
                          <th className="py-4 text-sm font-black uppercase">Descrição</th>
                          <th className="py-4 text-sm font-black uppercase">Status</th>
                          <th className="py-4 text-sm font-black uppercase text-right no-print">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {tarefas.filter(t => {
                          const h = horarios.find(hor => hor.id === t.horario_id);
                          if (!h) return false;
                          const inTurma = reportTurmaId === 'all' || h.turma_id === Number(reportTurmaId);
                          const inDiscipline = reportDisciplineId === 'all' || h.disciplina_id === Number(reportDisciplineId);
                          return inTurma && inDiscipline;
                        }).map(t => {
                          const h = horarios.find(hor => hor.id === t.horario_id);
                          return (
                            <tr key={t.id}>
                              <td className="py-4 text-sm font-bold">{format(parseISO(t.data), 'dd/MM/yyyy')}</td>
                              <td className="py-4">
                                <p className="text-sm font-black">{turmas.find(tur => tur.id === h?.turma_id)?.nome}</p>
                                <p className="text-xs text-slate-400">{disciplinas.find(d => d.id === h?.disciplina_id)?.nome}</p>
                              </td>
                              <td className="py-4 text-sm text-slate-600">{t.descricao}</td>
                              <td className="py-4">
                                <span className={cn(
                                  "px-3 py-1 rounded-full text-[10px] font-black uppercase",
                                  t.corrigida ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                                )}>
                                  {t.corrigida ? "Tarefa Corrigida" : "Pendente"}
                                </span>
                              </td>
                              <td className="py-4 text-right no-print">
                                <div className="flex justify-end gap-2">
                                  <button 
                                    onClick={async () => {
                                      await fetch(`/api/tarefas/${t.id}`, {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ ...t, corrigida: t.corrigida ? 0 : 1 })
                                      });
                                      fetchData();
                                    }}
                                    className={cn(
                                      "p-1.5 rounded-lg transition-all",
                                      t.corrigida ? "text-emerald-600 bg-emerald-50" : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                                    )}
                                    title={t.corrigida ? "Marcar como pendente" : "Marcar como corrigida"}
                                  >
                                    <CheckCircle2 size={14} />
                                  </button>
                                  <button 
                                    onClick={async () => {
                                      const newDesc = prompt("Nova descrição:", t.descricao);
                                      if (newDesc === null) return;
                                      await fetch(`/api/tarefas/${t.id}`, {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ ...t, descricao: newDesc })
                                      });
                                      fetchData();
                                    }}
                                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                  >
                                    <Edit3 size={14} />
                                  </button>
                                  <button 
                                    onClick={async () => {
                                      if (confirm("Excluir tarefa?")) {
                                        await fetch(`/api/tarefas/${t.id}`, { method: 'DELETE' });
                                        fetchData();
                                      }
                                    }}
                                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'horario_escolar' && (
            <motion.div
              key="horario_escolar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex flex-col gap-6 mb-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-slate-800 uppercase flex items-center gap-3">
                      <Calendar className="text-indigo-600" /> {scheduleView === 'geral' ? 'Horário Geral (Turmas)' : 'Horário do Professor (Individual)'}
                    </h2>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setScheduleView(scheduleView === 'geral' ? 'individual' : 'geral')}
                        className={cn(
                          "px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2",
                          scheduleView === 'geral' ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        )}
                      >
                        <LayoutGrid size={18} /> {scheduleView === 'geral' ? 'VER HORÁRIO INDIVIDUAL' : 'VER HORÁRIO GERAL'}
                      </button>
                      <button 
                        onClick={printHorario}
                        className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center gap-2"
                      >
                        <Printer size={18} /> IMPRIMIR
                      </button>
                      <button 
                        onClick={async () => {
                          setIsSavingSchedule(true);
                          try {
                            const entries = Object.values(draftHorario).filter(e => {
                              const entry = e as any;
                              return entry.turma_id && entry.disciplina_id;
                            });
                            if (entries.length > 0) {
                              await fetch('/api/horario/bulk', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  entries: entries.map(e => {
                                    const entry = e as any;
                                    return {
                                      ...entry,
                                      professor_id: entry.professor_id || (scheduleFilterProfessorId === 'all' ? null : scheduleFilterProfessorId)
                                    };
                                  })
                                })
                              });
                              setDraftHorario({});
                              fetchData();
                            }
                            setToast({ message: "Alterações salvas!", type: 'success' });
                            setTimeout(() => setToast(null), 3000);
                          } catch (err) {
                            console.error("Failed to save schedule", err);
                          } finally {
                            setIsSavingSchedule(false);
                          }
                        }}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-lg shadow-emerald-100"
                      >
                        <Save size={18} /> SALVAR ALTERAÇÕES
                      </button>
                      <button 
                        onClick={() => setShowProfessorModal(true)}
                        className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center gap-2"
                      >
                        <Users size={18} /> PROFESSORES
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {scheduleView === 'individual' ? (
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filtrar por Professor</p>
                      <div className="flex items-center gap-2">
                        <select
                          value={scheduleFilterProfessorId || 'all'}
                          onChange={(e) => {
                            const val = e.target.value === 'all' ? 'all' : Number(e.target.value);
                            setScheduleFilterProfessorId(val);
                            if (isProfessorPinned) {
                              localStorage.setItem('pinnedProfessorId', String(val));
                            }
                          }}
                          className="p-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-black outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="all">TODOS OS PROFESSORES</option>
                          {professores.map(p => (
                            <option key={p.id} value={p.id}>{p.nome.toUpperCase()}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => {
                            const newPinned = !isProfessorPinned;
                            setIsProfessorPinned(newPinned);
                            if (newPinned) {
                              localStorage.setItem('pinnedProfessorId', String(scheduleFilterProfessorId));
                            } else {
                              localStorage.removeItem('pinnedProfessorId');
                            }
                          }}
                          className={cn(
                            "p-2 rounded-xl border transition-all",
                            isProfessorPinned 
                              ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200" 
                              : "bg-slate-100 border-slate-200 text-slate-400 hover:border-indigo-600 hover:text-indigo-600"
                          )}
                          title={isProfessorPinned ? "Desafixar Professor" : "Fixar Professor"}
                        >
                          <Pin size={14} className={cn(isProfessorPinned && "fill-current")} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filtrar por Turma</p>
                      <div className="flex items-center gap-2">
                        <select
                          value={scheduleFilterTurmaId || 'all'}
                          onChange={(e) => {
                            const val = e.target.value === 'all' ? 'all' : Number(e.target.value);
                            setScheduleFilterTurmaId(val);
                          }}
                          className="p-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-black outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="all">TODAS AS TURMAS</option>
                          {turmas.map(t => (
                            <option key={t.id} value={t.id}>{t.nome.toUpperCase()}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <div className="overflow-x-auto">
                  {scheduleView === 'geral' ? (
                    <div className="space-y-12">
                      {turmas.filter(t => scheduleFilterTurmaId === 'all' || t.id === scheduleFilterTurmaId).map(t => {
                        const turmaHorarios = horarios.filter(h => h.turma_id === t.id);
                        
                        return (
                          <div key={t.id} className="space-y-4 print:break-after-page">
                            <h3 className="text-lg font-black text-indigo-600 uppercase border-b-2 border-indigo-100 pb-2">{t.nome}</h3>
                            <table className="w-full border-collapse">
                              <thead>
                                <tr>
                                  <th className="p-3 bg-slate-50 border border-slate-200 text-[10px] font-black text-slate-400 uppercase w-32">Aula</th>
                                  {['SEG', 'TER', 'QUA', 'QUI', 'SEX'].map(d => (
                                    <th key={d} className="p-3 bg-slate-50 border border-slate-200 text-[10px] font-black text-slate-400 uppercase">{d}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {aulasNumeros.map(aulaNum => {
                                  return (
                                    <tr key={aulaNum}>
                                      <td className="p-3 border border-slate-200 text-xs font-bold text-slate-600 bg-slate-50/30 text-center">
                                        <div className="flex flex-col">
                                          <span>{aulaNum}ª Aula</span>
                                        </div>
                                      </td>
                                      {[1, 2, 3, 4, 5].map(day => {
                                        const h = turmaHorarios.find(hor => hor.dia_semana === day && hor.aula_numero === aulaNum);
                                        const draft = draftHorario[`${day}|${aulaNum}`];
                                        const current = draft || h;

                                        return (
                                          <td key={day} className="p-3 border border-slate-200 min-w-[120px]">
                                            <div className="space-y-2">
                                              {h ? (
                                                <div className="space-y-1 group relative">
                                                  <p className="text-[10px] font-black text-indigo-600 uppercase">
                                                    {disciplinas.find(d => d.id === h.disciplina_id)?.nome}
                                                  </p>
                                                  <p className="text-[10px] font-bold text-slate-500 italic">
                                                    {professores.find(p => p.id === h.professor_id)?.nome}
                                                  </p>
                                                  <button
                                                    onClick={async () => {
                                                      if (confirm('Deseja excluir esta aula?')) {
                                                        await fetch(`/api/horario/${h.id}`, { method: 'DELETE' });
                                                        fetchData();
                                                      }
                                                    }}
                                                    className="absolute -top-1 -right-1 p-1 text-rose-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all no-print"
                                                  >
                                                    <Trash2 size={10} />
                                                  </button>
                                                </div>
                                              ) : (
                                                <div className="space-y-1 no-print">
                                                  <select 
                                                    value={current?.disciplina_id || 0}
                                                    onChange={(e) => handleAutoSaveHorario(day, aulaNum, 'disciplina_id', Number(e.target.value), t.id)}
                                                    className="w-full p-1 text-[10px] font-bold bg-slate-50 border border-slate-100 rounded outline-none focus:ring-1 focus:ring-indigo-500"
                                                  >
                                                    <option value={0}>DISCIPLINA</option>
                                                    {disciplinas.map(d => <option key={d.id} value={d.id}>{d.nome}</option>)}
                                                  </select>
                                                  <select 
                                                    value={current?.professor_id || 0}
                                                    onChange={(e) => handleAutoSaveHorario(day, aulaNum, 'professor_id', Number(e.target.value), t.id)}
                                                    className="w-full p-1 text-[10px] font-bold bg-slate-50 border border-slate-100 rounded outline-none focus:ring-1 focus:ring-indigo-500"
                                                  >
                                                    <option value={0}>PROFESSOR</option>
                                                    {professores.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                                                  </select>
                                                </div>
                                              )}
                                            </div>
                                          </td>
                                        );
                                      })}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="p-4 bg-slate-50 border border-slate-200 text-xs font-black text-slate-400 uppercase w-48">Aula</th>
                          {['SEG', 'TER', 'QUA', 'QUI', 'SEX'].map(d => (
                            <th key={d} className="p-4 bg-slate-50 border border-slate-200 text-xs font-black text-slate-400 uppercase">{d}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {aulasNumeros.map(aulaNum => {
                          return (
                            <tr key={aulaNum}>
                              <td className="p-4 border border-slate-200 font-bold text-sm text-slate-600 bg-slate-50/50">
                                <span className="text-[10px] font-black text-indigo-600 uppercase">{aulaNum}ª Aula</span>
                              </td>
                              {[1, 2, 3, 4, 5].map(day => {
                                const h = horarios.find(hor => 
                                  hor.dia_semana === day && 
                                  hor.aula_numero === aulaNum &&
                                  (scheduleFilterProfessorId === 'all' ? true : hor.professor_id === scheduleFilterProfessorId)
                                );
                                
                                const draft = draftHorario[`${day}|${aulaNum}`];
                                const current = draft || h;

                                return (
                                  <td key={day} className="p-2 border border-slate-200 min-w-[150px] group relative">
                                    <div className="space-y-2">
                                      {h ? (
                                        <div className="p-2 bg-indigo-50 rounded-xl border border-indigo-100">
                                          <p className="text-[10px] font-black text-indigo-600 uppercase mb-1">
                                            {disciplinas.find(d => d.id === h.disciplina_id)?.nome}
                                          </p>
                                          <p className="text-xs font-bold text-slate-700">
                                            {turmas.find(t => t.id === h.turma_id)?.nome}
                                          </p>
                                          {scheduleFilterProfessorId === 'all' && (
                                            <p className="text-[9px] text-slate-400 italic">
                                              {professores.find(p => p.id === h.professor_id)?.nome}
                                            </p>
                                          )}
                                          
                                          <div className="mt-2 flex gap-1 no-print">
                                            <button
                                              onClick={async () => {
                                                const existingTask = tarefas.find(t => t.horario_id === h.id && t.data === currentDate);
                                                if (existingTask && !existingTask.corrigida) {
                                                  await fetch(`/api/tarefas/${existingTask.id}`, {
                                                    method: 'PUT',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ ...existingTask, corrigida: 1 })
                                                  });
                                                  fetchData();
                                                  setToast({ message: "Tarefa corrigida!", type: 'success' });
                                                  setTimeout(() => setToast(null), 3000);
                                                } else {
                                                  setSelectedHorarioForTarefa(h);
                                                  setTarefaDescricao(existingTask?.descricao || '');
                                                  setShowTarefaModal(true);
                                                }
                                              }}
                                              className={cn(
                                                "flex-1 py-1 text-[9px] font-black rounded-lg transition-all uppercase border flex items-center justify-center gap-1.5",
                                                tarefas.find(t => t.horario_id === h.id && t.data === currentDate)
                                                  ? (tarefas.find(t => t.horario_id === h.id && t.data === currentDate)?.corrigida ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-amber-50 border-amber-200 text-amber-600")
                                                  : "bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                                              )}
                                            >
                                              <div className="relative flex items-center justify-center w-3.5 h-4.5 border-2 border-current rounded-[2px] flex-shrink-0">
                                                <span className="text-[8px] font-black leading-none">T</span>
                                              </div>
                                              {tarefas.find(t => t.horario_id === h.id && t.data === currentDate) && !tarefas.find(t => t.horario_id === h.id && t.data === currentDate)?.corrigida && (
                                                <span>Corrigir</span>
                                              )}
                                            </button>
                                            <button
                                              onClick={async () => {
                                                if (confirm('Deseja excluir esta aula?')) {
                                                  await fetch(`/api/horario/${h.id}`, { method: 'DELETE' });
                                                  fetchData();
                                                }
                                              }}
                                              className="p-1 text-rose-400 hover:text-rose-600 transition-colors"
                                            >
                                              <Trash2 size={12} />
                                            </button>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="space-y-1 no-print">
                                          <select 
                                            value={current?.turma_id || 0}
                                            onChange={(e) => handleAutoSaveHorario(day, aulaNum, 'turma_id', Number(e.target.value), undefined, scheduleFilterProfessorId === 'all' ? undefined : Number(scheduleFilterProfessorId))}
                                            className="w-full p-1.5 text-xs font-bold bg-slate-50 border border-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                          >
                                            <option value={0}>TURMA</option>
                                            {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
                                          </select>
                                          <select 
                                            value={current?.disciplina_id || 0}
                                            onChange={(e) => handleAutoSaveHorario(day, aulaNum, 'disciplina_id', Number(e.target.value), undefined, scheduleFilterProfessorId === 'all' ? undefined : Number(scheduleFilterProfessorId))}
                                            className="w-full p-1.5 text-xs font-bold bg-slate-50 border border-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                          >
                                            <option value={0}>DISCIPLINA</option>
                                            {disciplinas.map(d => <option key={d.id} value={d.id}>{d.nome}</option>)}
                                          </select>
                                          {(scheduleFilterProfessorId === 'all' || scheduleFilterProfessorId === 0) && (
                                            <select 
                                              value={current?.professor_id || 0}
                                              onChange={(e) => handleAutoSaveHorario(day, aulaNum, 'professor_id', Number(e.target.value))}
                                              className="w-full p-1.5 text-xs font-bold bg-slate-50 border border-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                            >
                                              <option value={0}>PROFESSOR</option>
                                              {professores.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                                            </select>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'musica' && (
            <motion.div
              key="musica"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-slate-800 uppercase flex items-center gap-3">
                    <Smile className="text-indigo-600" /> Player de Música
                  </h2>
                  <div className="flex flex-wrap items-center gap-4">
                    <input 
                      type="file" 
                      ref={musicFileInputRef} 
                      className="hidden" 
                      accept="audio/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const nome = file.name.replace(/\.[^/.]+$/, "");
                          // In a real app, we'd upload the file. 
                          // Here we'll store the name and use a blob URL for local playback
                          const url = URL.createObjectURL(file);
                          await fetch('/api/musicas', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ nome, url })
                          });
                          fetchData();
                        }
                      }}
                    />
                    <button 
                      onClick={() => musicFileInputRef.current?.click()}
                      className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center gap-2"
                    >
                      <Download size={20} /> DO COMPUTADOR
                    </button>
                    <button 
                      onClick={async () => {
                        const nome = prompt("Nome da Música:");
                        const url = prompt("URL da Música (YouTube, MP3 Link, etc):");
                        if (nome && url) {
                          await fetch('/api/musicas', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ nome, url })
                          });
                          fetchData();
                        }
                      }}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                    >
                      + URL EXTERNA
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Sua Playlist</h3>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                      {musicas.map(m => (
                        <div key={m.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all">
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                              currentMusica?.id === m.id ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-600"
                            )}>
                              <Smile size={20} />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">{m.nome}</p>
                              <p className="text-xs text-slate-400 truncate max-w-[200px]">{m.url}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                            <button 
                              onClick={() => {
                                setCurrentMusica(m);
                                if (audioRef.current) {
                                  audioRef.current.src = m.url;
                                  audioRef.current.play();
                                }
                              }}
                              className="p-2 text-slate-400 hover:text-indigo-600"
                            >
                              <Play size={16} />
                            </button>
                            <button onClick={async () => {
                              if (confirm("Excluir música?")) {
                                await fetch(`/api/musicas/${m.id}`, { method: 'DELETE' });
                                fetchData();
                              }
                            }} className="p-2 text-slate-400 hover:text-rose-600"><Trash2 size={16} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col items-center justify-center text-center space-y-6">
                    <div className={cn(
                      "w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/50",
                      currentMusica ? "animate-pulse" : ""
                    )}>
                      <Smile size={64} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black uppercase tracking-widest">
                        {currentMusica ? currentMusica.nome : "Nenhuma Música Tocando"}
                      </h4>
                      <p className="text-slate-400 text-sm mt-2">
                        {currentMusica ? "Tocando agora..." : "Selecione uma música da sua playlist para começar."}
                      </p>
                    </div>
                    
                    <div className="w-full space-y-4">
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className={cn("h-full bg-indigo-500 transition-all duration-500", currentMusica ? "w-1/2" : "w-0")} />
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                        <span>{currentMusica ? "01:24" : "00:00"}</span>
                        <span>{currentMusica ? "03:45" : "00:00"}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <button className="text-slate-500 hover:text-white transition-all"><RotateCcw size={20} /></button>
                      <button className="text-slate-500 hover:text-white transition-all"><ChevronRight size={32} className="rotate-180" /></button>
                      <button 
                        onClick={() => {
                          if (audioRef.current) {
                            if (audioRef.current.paused) audioRef.current.play();
                            else audioRef.current.pause();
                          }
                        }}
                        className="w-16 h-16 bg-white text-slate-900 rounded-full flex items-center justify-center hover:scale-110 transition-all"
                      >
                        <Play size={24} fill="currentColor" />
                      </button>
                      <button className="text-slate-500 hover:text-white transition-all"><ChevronRight size={32} /></button>
                      <button className="text-slate-500 hover:text-white transition-all"><BarChart2 size={20} /></button>
                    </div>

                    <div className="flex items-center gap-4 w-full max-w-[200px]">
                      <Smile size={16} className="text-slate-500" />
                      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-white w-3/4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'config' && (
            <motion.div
              key="config"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <ShieldCheck className="text-indigo-600" /> Segurança do Sistema
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600">Pergunta de Segurança</label>
                      <input 
                        type="text" 
                        value={config?.pergunta_seguranca || ''} 
                        onChange={(e) => setConfig(prev => prev ? { ...prev, pergunta_seguranca: e.target.value } : null)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600">Resposta de Segurança</label>
                      <input 
                        type="password" 
                        value={config?.resposta_seguranca || ''} 
                        onChange={(e) => setConfig(prev => prev ? { ...prev, resposta_seguranca: e.target.value } : null)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
                      />
                    </div>
                    <button 
                      onClick={handleUpdateSecurity}
                      className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-all"
                    >
                      ATUALIZAR SEGURANÇA
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <FileJson className="text-emerald-600" /> Backup e Restauração
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <p className="text-sm text-emerald-800 font-medium">
                        O backup em tempo real está {directoryHandle ? <span className="font-bold">ATIVADO</span> : <span className="font-bold">DESATIVADO</span>}.
                      </p>
                    </div>
                    <button 
                      onClick={async () => {
                        try {
                          const handle = await (window as any).showDirectoryPicker();
                          setDirectoryHandle(handle);
                        } catch (err) {
                          console.error("Directory picker failed", err);
                        }
                      }}
                      className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-bold hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
                    >
                      <Save size={20} /> CONFIGURAR PASTA DE BACKUP
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={handleExportJson}
                        className="py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                      >
                        <Download size={18} /> EXPORTAR JSON
                      </button>
                      <button 
                        onClick={async () => {
                          try {
                            const [fileHandle] = await (window as any).showOpenFilePicker({
                              types: [
                                {
                                  description: 'Backup JSON',
                                  accept: { 'application/json': ['.json'] },
                                },
                              ],
                              multiple: false
                            });
                            
                            const file = await fileHandle.getFile();
                            const text = await file.text();
                            const data = JSON.parse(text);
                            
                            const res = await fetch('/api/restore', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(data)
                            });
                            
                            if (res.ok) {
                              fetchData();
                              setToast({ message: "Restauração concluída com sucesso!", type: 'success' });
                              setTimeout(() => setToast(null), 3000);
                            } else {
                              throw new Error("Erro no servidor ao restaurar");
                            }
                          } catch (err: any) {
                            if (err.name === 'AbortError') return;
                            console.error("Restore failed", err);
                            setToast({ message: "Falha na restauração: " + err.message, type: 'error' });
                            setTimeout(() => setToast(null), 3000);
                          }
                        }}
                        className="py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                      >
                        <RotateCcw size={18} /> RESTAURAR
                      </button>
                    </div>

                    <div className="p-6 bg-rose-50 rounded-3xl border border-rose-100 space-y-4">
                      <h3 className="text-sm font-black text-rose-800 uppercase tracking-widest flex items-center gap-2">
                        <AlertTriangle size={16} /> Reset Parcial de Dados
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { id: 'ocorrencias', label: 'Ocorrências registradas' },
                          { id: 'disciplinas', label: 'Disciplinas' },
                          { id: 'professores', label: 'Professores' },
                          { id: 'turmas', label: 'Turmas' }
                        ].map(opt => (
                          <label key={opt.id} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-rose-200 cursor-pointer hover:bg-rose-100 transition-all group">
                            <input 
                              type="checkbox" 
                              checked={(resetOptions as any)[opt.id]}
                              onChange={(e) => setResetOptions({ ...resetOptions, [opt.id]: e.target.checked })}
                              className="w-5 h-5 rounded-lg border-rose-300 text-rose-600 focus:ring-rose-500"
                            />
                            <span className="text-xs font-bold text-rose-700 group-hover:text-rose-900">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                      <button 
                        disabled={!Object.values(resetOptions).some(v => v)}
                        onClick={() => {
                          setResetStep(1);
                          setShowResetConfirmation(true);
                        }}
                        className="w-full py-3 bg-rose-600 text-white rounded-xl font-black uppercase tracking-widest shadow-lg shadow-rose-200 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        RESETAR DADOS SELECIONADOS
                      </button>
                    </div>

                    <button 
                      onClick={handleResetSystem}
                      className="w-full py-4 bg-rose-50 text-rose-600 border-2 border-dashed border-rose-200 rounded-xl font-bold hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <Trash2 size={20} /> RESETAR TODO O SISTEMA
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Users className="text-indigo-600" /> Gestão Escolar
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase mb-3">Personalização</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-600">Conjunto de Avatares Padrão</label>
                          <select 
                            value={config?.avatar_set || 'fun-emoji'}
                            onChange={async (e) => {
                              const newConfig = { ...config!, avatar_set: e.target.value };
                              setConfig(newConfig);
                              await fetch('/api/config', {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(newConfig)
                              });
                            }}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="fun-emoji">Emojis Divertidos (Padrão)</option>
                            <option value="adventurer">Aventureiros</option>
                            <option value="avataaars">Avatares Humanos</option>
                            <option value="bottts">Robôs</option>
                            <option value="pixel-art">Pixel Art</option>
                            <option value="lorelei">Estilo Anime</option>
                            <option value="notionists">Estilo Notion</option>
                            <option value="open-peeps">Pessoas (Sketch)</option>
                          </select>
                          <p className="text-[10px] text-slate-400 font-medium">Isso mudará o estilo de todos os avatares que não foram personalizados individualmente.</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase mb-3">Turmas</h3>
                      <div className="flex flex-wrap gap-2">
                        {turmas.map(t => (
                          <div key={t.id} className="px-3 py-1.5 bg-slate-100 rounded-lg flex items-center gap-2 text-sm font-bold">
                            {t.nome} (ID: {t.id}) <Trash2 size={14} className="text-slate-400 hover:text-rose-500 cursor-pointer" onClick={() => requestSecurity('delete-turma', t.id)} />
                          </div>
                        ))}
                        <button 
                          onClick={handleCreateTurma}
                          className="px-3 py-1.5 border-2 border-dashed border-slate-300 rounded-lg text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-all text-sm font-bold"
                        >
                          + NOVA TURMA
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase mb-3">Disciplinas</h3>
                      <div className="flex flex-wrap gap-2">
                        {disciplinas.map(d => (
                          <div key={d.id} className="px-3 py-1.5 bg-slate-100 rounded-lg flex items-center gap-2 text-sm font-bold">
                            {d.nome} <Trash2 size={14} className="text-slate-400 hover:text-rose-500 cursor-pointer" onClick={async () => {
                              await fetch(`/api/disciplinas/${d.id}`, { method: 'DELETE' });
                              fetchData();
                              triggerChange();
                            }} />
                          </div>
                        ))}
                        <button 
                          onClick={handleCreateDisciplina}
                          className="px-3 py-1.5 border-2 border-dashed border-slate-300 rounded-lg text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-all text-sm font-bold"
                        >
                          + NOVA DISCIPLINA
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase mb-3">Alunos</h3>
                      <button 
                        onClick={handleCreateAluno}
                        className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 font-bold hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus size={20} /> CADASTRAR NOVO ALUNO
                      </button>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-rose-500" /> Limites de Alerta
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Encaminhar Coordenação</label>
                          <div className="flex items-center gap-3">
                            <input 
                              type="number" 
                              value={limitesOcorrencias.find(l => l.tipo === 'coordenacao')?.limite || 3}
                              disabled={isFixingConfig}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setLimitesOcorrencias(prev => {
                                  const existing = prev.find(l => l.tipo === 'coordenacao');
                                  if (existing) return prev.map(l => l.tipo === 'coordenacao' ? { ...l, limite: val } : l);
                                  return [...prev, { id: 0, tipo: 'coordenacao', limite: val, turmas_ids: '[]' }];
                                });
                              }}
                              className="flex-1 p-3 bg-white border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                            />
                            <span className="text-xs font-bold text-slate-400 uppercase">Ocorrências</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chamar Família</label>
                          <div className="flex items-center gap-3">
                            <input 
                              type="number" 
                              value={limitesOcorrencias.find(l => l.tipo === 'familia')?.limite || 5}
                              disabled={isFixingConfig}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setLimitesOcorrencias(prev => {
                                  const existing = prev.find(l => l.tipo === 'familia');
                                  if (existing) return prev.map(l => l.tipo === 'familia' ? { ...l, limite: val } : l);
                                  return [...prev, { id: 0, tipo: 'familia', limite: val, turmas_ids: '[]' }];
                                });
                              }}
                              className="flex-1 p-3 bg-white border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                            />
                            <span className="text-xs font-bold text-slate-400 uppercase">Ocorrências</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        {!isFixingConfig ? (
                          <button 
                            onClick={async () => {
                              const coord = limitesOcorrencias.find(l => l.tipo === 'coordenacao') || { tipo: 'coordenacao', limite: 3, turmas_ids: '[]' };
                              const fam = limitesOcorrencias.find(l => l.tipo === 'familia') || { tipo: 'familia', limite: 5, turmas_ids: '[]' };
                              
                              await handleSaveLimite('coordenacao', coord.limite, []);
                              await handleSaveLimite('familia', fam.limite, []);
                              
                              setIsFixingConfig(true);
                              setToast({ message: "Configuração salva e fixada!", type: 'success' });
                              setTimeout(() => setToast(null), 3000);
                            }}
                            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                          >
                            <Save size={18} /> FIXAR CONFIGURAÇÃO
                          </button>
                        ) : (
                          <div className="flex gap-3">
                            <div className="flex-1 py-3 bg-emerald-50 text-emerald-600 rounded-xl font-black uppercase tracking-widest border border-emerald-100 flex items-center justify-center gap-2">
                              <CheckCircle2 size={18} /> ATIVA
                            </div>
                            <button 
                              onClick={() => setIsFixingConfig(false)}
                              className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                            >
                              EDITAR
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase mb-3">Unidades Letivas</h3>
                      <div className="space-y-3">
                        {config?.unidades.map(u => (
                          <div key={u.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-2">
                            <span className="font-bold text-slate-700">{u.nome}</span>
                            <div className="flex items-center gap-2">
                              <input 
                                type="date"
                                value={u.inicio}
                                onChange={async (e) => {
                                  const newUnidades = config.unidades.map(unit => 
                                    unit.id === u.id ? { ...unit, inicio: e.target.value } : unit
                                  );
                                  const newConfig = { ...config, unidades: newUnidades };
                                  setConfig(newConfig);
                                  await fetch('/api/config', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(newConfig)
                                  });
                                }}
                                className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-xs"
                              />
                              <ChevronRight size={12} className="text-slate-300" />
                              <input 
                                type="date"
                                value={u.fim}
                                onChange={async (e) => {
                                  const newUnidades = config.unidades.map(unit => 
                                    unit.id === u.id ? { ...unit, fim: e.target.value } : unit
                                  );
                                  const newConfig = { ...config, unidades: newUnidades };
                                  setConfig(newConfig);
                                  await fetch('/api/config', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(newConfig)
                                  });
                                }}
                                className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-xs"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase mb-3">Pontuação Automática</h3>
                      <div className="space-y-6 p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <label className="text-sm font-bold text-slate-600">Ativar Bônus Automático</label>
                            <p className="text-[10px] text-slate-400 font-medium">Bonifica alunos que cumprem as condições no período.</p>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={!!config?.bonus_automatico_ativo}
                            onChange={async (e) => {
                              const newConfig = { ...config!, bonus_automatico_ativo: e.target.checked ? 1 : 0 };
                              setConfig(newConfig);
                              await fetch('/api/config', {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(newConfig)
                              });
                            }}
                            className="w-6 h-6 rounded-lg accent-indigo-600 cursor-pointer"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
                            <Filter size={16} /> Condições para Receber
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {[0, 1, 2].map(n => (
                              <button
                                key={n}
                                onClick={async () => {
                                  const newConfig = { ...config!, bonus_max_negativas: n };
                                  setConfig(newConfig);
                                  await fetch('/api/config', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(newConfig)
                                  });
                                }}
                                className={cn(
                                  "py-3 px-2 rounded-xl text-[10px] font-black transition-all border-2",
                                  config?.bonus_max_negativas === n 
                                    ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200" 
                                    : "bg-white text-slate-400 border-slate-200 hover:border-indigo-300"
                                )}
                              >
                                {n === 0 ? "0 NEGATIVAS" : `ATÉ ${n} NEGATIVAS`}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-sm font-bold text-slate-600">Unidade Ativa</label>
                          <div className="grid grid-cols-4 gap-2">
                            {config?.unidades?.map(u => (
                              <button
                                key={u.id}
                                onClick={async () => {
                                  setSelectedUnidadeId(u.id);
                                  const newConfig = { ...config!, unidade_ativa_id: u.id };
                                  setConfig(newConfig);
                                  await fetch('/api/config', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(newConfig)
                                  });
                                }}
                                className={cn(
                                  "py-2 px-1 rounded-xl text-[10px] font-black transition-all border-2",
                                  selectedUnidadeId === u.id 
                                    ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200" 
                                    : "bg-white text-slate-400 border-slate-200 hover:border-indigo-300"
                                )}
                              >
                                {u.nome}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
                            <BookOpen size={16} /> Disciplinas para Contagem
                          </label>
                          <p className="text-[10px] text-slate-400 font-medium">Selecione as disciplinas cujas ocorrências negativas impedem o bônus.</p>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={async () => {
                                const allIds = disciplinas.map(d => d.id);
                                const newConfig = { ...config!, bonus_disciplinas_ids: JSON.stringify(allIds) };
                                setConfig(newConfig);
                                await fetch('/api/config', {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify(newConfig)
                                });
                              }}
                              className={cn(
                                "px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border",
                                JSON.parse(config?.bonus_disciplinas_ids || '[]').length === disciplinas.length
                                  ? "bg-indigo-600 text-white border-indigo-700"
                                  : "bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300"
                              )}
                            >
                              TODAS
                            </button>
                            <button
                              onClick={async () => {
                                const newConfig = { ...config!, bonus_disciplinas_ids: JSON.stringify([]) };
                                setConfig(newConfig);
                                await fetch('/api/config', {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify(newConfig)
                                });
                              }}
                              className={cn(
                                "px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border",
                                JSON.parse(config?.bonus_disciplinas_ids || '[]').length === 0
                                  ? "bg-rose-600 text-white border-rose-700"
                                  : "bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300"
                              )}
                            >
                              NENHUMA
                            </button>
                            {disciplinas.map(d => {
                              const selectedIds = JSON.parse(config?.bonus_disciplinas_ids || '[]') as number[];
                              const isSelected = selectedIds.includes(d.id);
                              return (
                                <button
                                  key={d.id}
                                  onClick={async () => {
                                    const newIds = isSelected 
                                      ? selectedIds.filter(id => id !== d.id)
                                      : [...selectedIds, d.id];
                                    const newConfig = { ...config!, bonus_disciplinas_ids: JSON.stringify(newIds) };
                                    setConfig(newConfig);
                                    await fetch('/api/config', {
                                      method: 'PUT',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify(newConfig)
                                    });
                                  }}
                                  className={cn(
                                    "px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border",
                                    isSelected 
                                      ? "bg-indigo-100 text-indigo-600 border-indigo-200" 
                                      : "bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-300"
                                  )}
                                >
                                  {d.nome}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-sm font-bold text-slate-600">Calendário de Bonificação</label>
                          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-4">
                            <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              <span>Semana</span>
                              <span>Status</span>
                            </div>
                            <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
                              {(() => {
                                const activeUnidade = config?.unidades?.find(u => u.id === selectedUnidadeId);
                                if (!activeUnidade) return null;
                                
                                try {
                                  const startUnidade = parseISO(activeUnidade.inicio);
                                  const endUnidade = parseISO(activeUnidade.fim);
                                  
                                  const weeks = eachWeekOfInterval(
                                    { start: startUnidade, end: endUnidade },
                                    { weekStartsOn: 1 }
                                  );

                                  return weeks.map((weekStart, i) => {
                                    const start = startOfWeek(weekStart, { weekStartsOn: 1 });
                                    const end = endOfWeek(weekStart, { weekStartsOn: 1 });
                                    const dateKey = format(start, 'yyyy-MM-dd');
                                    const deactivatedDates = JSON.parse(config?.bonus_datas_desativadas || '[]') as string[];
                                    const isDeactivated = deactivatedDates.includes(dateKey);

                                    return (
                                      <div 
                                        key={i} 
                                        onClick={() => {
                                          if (!isDeactivated) {
                                            setSelectedBonusWeek({ start: format(start, 'yyyy-MM-dd'), end: format(end, 'yyyy-MM-dd') });
                                          }
                                        }}
                                        className={cn(
                                          "flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer",
                                          selectedBonusWeek?.start === format(start, 'yyyy-MM-dd') 
                                            ? "bg-indigo-100 border-indigo-300 shadow-sm" 
                                            : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                                        )}
                                      >
                                        <span className="text-[10px] font-bold text-slate-600">
                                          {format(start, 'dd/MM')} - {format(end, 'dd/MM')}
                                        </span>
                                        <button 
                                          onClick={async (e) => {
                                            e.stopPropagation();
                                            const newDeactivated = isDeactivated 
                                              ? deactivatedDates.filter(d => d !== dateKey)
                                              : [...deactivatedDates, dateKey];
                                            const newConfig = { ...config!, bonus_datas_desativadas: JSON.stringify(newDeactivated) };
                                            setConfig(newConfig);
                                            await fetch('/api/config', {
                                              method: 'PUT',
                                              headers: { 'Content-Type': 'application/json' },
                                              body: JSON.stringify(newConfig)
                                            });
                                          }}
                                          className="flex items-center gap-2"
                                        >
                                          <span className={cn(
                                            "text-[8px] font-black uppercase",
                                            isDeactivated ? "text-slate-400" : "text-emerald-500"
                                          )}>
                                            {isDeactivated ? "Desativado" : "Ativo"}
                                          </span>
                                          <div className={cn(
                                            "w-4 h-4 rounded-full flex items-center justify-center transition-all",
                                            isDeactivated ? "bg-slate-200" : "bg-emerald-500"
                                          )}>
                                            {isDeactivated ? <X size={10} className="text-white" /> : <Check size={10} className="text-white" />}
                                          </div>
                                        </button>
                                      </div>
                                    );
                                  });
                                } catch (e) {
                                  return <p className="text-[10px] text-rose-500 font-bold">Erro ao carregar datas da unidade.</p>;
                                }
                              })()}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-600">Modelo de Ocorrência de Bônus</label>
                          <select 
                            value={config?.bonus_automatico_modelo_id || 0}
                            onChange={async (e) => {
                              const newConfig = { ...config!, bonus_automatico_modelo_id: Number(e.target.value) };
                              setConfig(newConfig);
                              await fetch('/api/config', {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(newConfig)
                              });
                            }}
                            className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value={0}>Selecione um modelo...</option>
                            {modelos.filter(m => m.tipo === 1).map(m => <option key={m.id} value={m.id}>{m.descricao} (+{m.pontos})</option>)}
                          </select>
                        </div>

                        <button 
                          onClick={handleTriggerBonus}
                          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                          <Plus size={20} /> DISPARAR BÔNUS AGORA
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Bar - Unit Filter & Bulk Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            {config?.unidades.map(u => (
              <button
                key={u.id}
                onClick={() => setSelectedUnidadeId(u.id)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-black transition-all",
                  selectedUnidadeId === u.id ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {u.nome}
              </button>
            ))}
          </div>

          {selectedAlunos.size > 0 && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="flex items-center gap-4 bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-2xl shadow-indigo-300"
            >
              <span className="font-bold text-sm">{selectedAlunos.size} ALUNOS SELECIONADOS</span>
              <div className="w-px h-6 bg-white/20" />
              <div className="flex gap-2">
                <button onClick={() => handleBulkAction('like')} className="p-2 hover:bg-white/10 rounded-lg transition-all" title="Elogio em Massa"><ThumbsUp size={20} /></button>
                <button onClick={() => handleBulkAction('dislike')} className="p-2 hover:bg-white/10 rounded-lg transition-all" title="Crítica em Massa"><ThumbsDown size={20} /></button>
                <button onClick={() => handleBulkAction('message')} className="p-2 hover:bg-white/10 rounded-lg transition-all" title="Mensagem em Massa"><MessageSquare size={20} /></button>
                <button onClick={() => handleBulkAction('delete')} className="p-2 hover:bg-white/10 rounded-lg transition-all text-rose-300" title="Excluir em Massa"><Trash2 size={20} /></button>
              </div>
            </motion.div>
          )}

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SISTEMA ONLINE
            </div>
          </div>
        </div>
      </div>

      {/* Occurrence Registration Modal */}
      <AnimatePresence>
        {isOccurrenceModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOccurrenceModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className={cn(
                "p-6 text-white flex items-center justify-between",
                formTipo === 1 ? "bg-emerald-600" : "bg-rose-600"
              )}>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  {formTipo === 1 ? <ThumbsUp /> : <ThumbsDown />}
                  Registrar Ocorrência {formTipo === 1 ? 'Positiva' : 'Negativa'}
                </h3>
                <button onClick={() => setIsOccurrenceModalOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                  <X size={24} />
                </button>
              </div>

              <form className="p-6 space-y-6" onSubmit={(e) => { e.preventDefault(); handleSaveOccurrence(); }}>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Aluno</label>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800">
                    {selectedAlunos.size > 0 
                      ? `${selectedAlunos.size} alunos selecionados` 
                      : (alunos.find(a => a.id === formAlunoId)?.nome || 'Selecione um aluno')}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600">Disciplina</label>
                    <select 
                      value={formDisciplinaId}
                      onChange={(e) => setFormDisciplinaId(Number(e.target.value))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value={0}>Selecione uma disciplina</option>
                      {disciplinas.map(d => <option key={d.id} value={d.id}>{d.nome}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600">Pontuação (1-10)</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="10" 
                      value={formPontos}
                      onChange={(e) => setFormPontos(Number(e.target.value))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Descrição</label>
                  <textarea 
                    value={formDescricao}
                    onChange={(e) => setFormDescricao(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none" 
                    placeholder="Descreva o ocorrido..."
                    required
                  />
                </div>

                {/* Quick Models */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Modelos Rápidos</label>
                  <div className="flex flex-wrap gap-2">
                    {modelos.filter(m => m.tipo === formTipo).map(m => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setFormDescricao(m.descricao);
                          setFormPontos(m.pontos);
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-bold border transition-all",
                          formTipo === 1 
                            ? "bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100" 
                            : "bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100"
                        )}
                      >
                        {m.descricao} (+{m.pontos})
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button 
                    type="submit"
                    className={cn(
                      "flex-1 py-4 text-white rounded-xl font-bold shadow-lg transition-all",
                      formTipo === 1 ? "bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700" : "bg-rose-600 shadow-rose-200 hover:bg-rose-700"
                    )}
                  >
                    SALVAR REGISTRO
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Student Modal */}
      <AnimatePresence>
        {isCreateStudentModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateStudentModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 bg-emerald-600 text-white flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Plus /> Cadastrar Novo Aluno
                </h3>
                <button onClick={() => setIsCreateStudentModalOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                  <X size={24} />
                </button>
              </div>

              <form className="p-6 space-y-4" onSubmit={handleSaveNewStudent}>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Nome do Aluno</label>
                  <input 
                    type="text" 
                    value={newStudentData.nome}
                    onChange={(e) => setNewStudentData({ ...newStudentData, nome: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
                    placeholder="Ex: João Silva"
                    required
                    autoFocus
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Data de Nascimento</label>
                  <input 
                    type="date" 
                    value={newStudentData.data_nascimento}
                    onChange={(e) => setNewStudentData({ ...newStudentData, data_nascimento: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Turma</label>
                  <select 
                    value={newStudentData.turma_id}
                    onChange={(e) => setNewStudentData({ ...newStudentData, turma_id: Number(e.target.value) })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value={0} disabled>Selecione uma turma...</option>
                    {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
                  </select>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
                  >
                    CADASTRAR ALUNO
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Student Modal */}
      <AnimatePresence>
        {isEditStudentModalOpen && editingStudent && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditStudentModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 bg-indigo-600 text-white flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Edit3 /> Editar Aluno
                </h3>
                <button onClick={() => setIsEditStudentModalOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                  <X size={24} />
                </button>
              </div>

              <form className="p-6 space-y-4" onSubmit={handleUpdateAluno}>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Nome do Aluno</label>
                  <input 
                    type="text" 
                    value={editingStudent.nome}
                    onChange={(e) => setEditingStudent({ ...editingStudent, nome: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Data de Nascimento</label>
                  <input 
                    type="date" 
                    value={editingStudent.data_nascimento || ''}
                    onChange={(e) => setEditingStudent({ ...editingStudent, data_nascimento: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Turma</label>
                  <select 
                    value={editingStudent.turma_id}
                    onChange={(e) => setEditingStudent({ ...editingStudent, turma_id: Number(e.target.value) })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">Emoji/Avatar (Nome para Avatar)</label>
                  <input 
                    type="text" 
                    value={editingStudent.avatar || ''}
                    onChange={(e) => setEditingStudent({ ...editingStudent, avatar: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
                    placeholder="Nome usado para gerar o avatar..."
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                  >
                    SALVAR ALTERAÇÕES
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Student Occurrences Modal */}
      <AnimatePresence>
        {selectedStudentForModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStudentForModal(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="bg-indigo-600 p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <img 
                      src={getAvatarUrl(selectedStudentForModal.avatar || selectedStudentForModal.nome, config?.avatar_set)} 
                      alt={selectedStudentForModal.nome}
                      className="w-16 h-16 rounded-xl bg-white/20"
                    />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const newSeed = prompt("Digite um nome ou código para mudar o avatar:", selectedStudentForModal.avatar || selectedStudentForModal.nome);
                        if (newSeed) handleUpdateAlunoAvatar(selectedStudentForModal.id, newSeed);
                      }}
                      className="absolute -bottom-2 -right-2 bg-white text-indigo-600 p-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedStudentForModal.nome}</h3>
                    <p className="text-indigo-100 text-xs uppercase font-bold tracking-wider">
                      {turmas.find(t => t.id === selectedStudentForModal.turma_id)?.nome}
                    </p>
                    <div className="mt-2">
                      {(() => {
                        const studentOccurrences = ocorrencias.filter(o => o.aluno_id === selectedStudentForModal.id);
                        const pos = studentOccurrences.filter(o => o.tipo === 1).reduce((acc, o) => acc + o.pontos, 0);
                        const neg = studentOccurrences.filter(o => o.tipo === -1).reduce((acc, o) => acc + o.pontos, 0);
                        const diff = pos - neg;
                        return (
                          <div className={cn(
                            "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-black shadow-inner",
                            diff >= 0 ? "bg-emerald-500/30 text-emerald-50" : "bg-rose-500/30 text-rose-50"
                          )}>
                            PONTUAÇÃO LÍQUIDA: {diff > 0 ? '+' : ''}{diff}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsAvatarPickerOpen(true)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all flex flex-col items-center gap-1"
                  >
                    <RotateCcw size={20} />
                    <span className="text-[10px] font-bold">AVATAR</span>
                  </button>
                  <button 
                    onClick={() => setSelectedStudentForModal(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-b border-slate-200 flex gap-2">
                {[
                  { id: 'all', label: 'Todas', icon: BookOpen },
                  { id: 'positive', label: 'Positivas', icon: ThumbsUp, color: 'text-emerald-600' },
                  { id: 'negative', label: 'Negativas', icon: ThumbsDown, color: 'text-rose-600' },
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setOccurrenceFilter(filter.id as any)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-bold text-sm transition-all border-2",
                      occurrenceFilter === filter.id 
                        ? "bg-white border-indigo-500 text-indigo-600 shadow-sm" 
                        : "bg-transparent border-transparent text-slate-400 hover:bg-white hover:border-slate-200"
                    )}
                  >
                    <filter.icon size={16} className={filter.color} />
                    {filter.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {ocorrencias
                  .filter(o => o.aluno_id === selectedStudentForModal.id)
                  .filter(o => {
                    if (occurrenceFilter === 'positive') return o.tipo === 1;
                    if (occurrenceFilter === 'negative') return o.tipo === -1;
                    return true;
                  })
                  .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                  .map(o => (
                    <div key={o.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                      <div className={cn(
                        "p-3 rounded-xl",
                        o.tipo === 1 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                      )}>
                        {o.tipo === 1 ? <ThumbsUp size={20} /> : <ThumbsDown size={20} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            {disciplinas.find(d => d.id === o.disciplina_id)?.nome || 'Geral'}
                          </span>
                          <span className="text-xs font-medium text-slate-400">
                            {format(parseISO(o.data), 'dd/MM/yyyy')}
                          </span>
                        </div>
                        <p className="font-bold text-slate-800">{o.descricao}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className={cn(
                            "px-2 py-0.5 rounded-md text-[10px] font-black",
                            o.tipo === 1 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                          )}>
                            {o.tipo === 1 ? '+' : ''}{o.pontos} PONTOS
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                
                {ocorrencias.filter(o => o.aluno_id === selectedStudentForModal.id).length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="text-slate-300" size={32} />
                    </div>
                    <p className="text-slate-400 font-medium">Nenhuma ocorrência registrada.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SecurityModal 
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        onConfirm={confirmSecurity}
        pergunta={config?.pergunta_seguranca || ''}
        respostaCorreta={config?.resposta_seguranca || ''}
      />

      {/* Avatar Picker Modal */}
      <AnimatePresence>
        {isAvatarPickerOpen && selectedStudentForModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAvatarPickerOpen(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="bg-indigo-600 p-6 text-white flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <RotateCcw /> Escolher Novo Avatar
                </h3>
                <button onClick={() => setIsAvatarPickerOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto grid grid-cols-4 sm:grid-cols-6 gap-4">
                {AVATAR_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      handleUpdateAlunoAvatar(selectedStudentForModal.id, opt);
                      setIsAvatarPickerOpen(false);
                    }}
                    className={cn(
                      "aspect-square rounded-2xl p-2 transition-all hover:scale-110 hover:shadow-lg border-2",
                      (selectedStudentForModal.avatar || selectedStudentForModal.nome) === opt 
                        ? "bg-indigo-50 border-indigo-500" 
                        : "bg-slate-50 border-transparent hover:border-slate-200"
                    )}
                  >
                    <img 
                      src={getAvatarUrl(opt, config?.avatar_set)} 
                      alt={opt}
                      className="w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ProfessorModal 
        isOpen={showProfessorModal}
        onClose={() => setShowProfessorModal(false)}
        onSave={handleSaveProfessor}
        professorForm={professorForm}
        disciplinas={disciplinas}
        turmas={turmas}
      />

      {/* Toast Notification */}
      {/* Developer Info Modal */}
      <AnimatePresence>
        {showDeveloperInfo && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-indigo-100 p-4 rounded-3xl">
                    <ShieldCheck className="text-indigo-600 w-8 h-8" />
                  </div>
                  <button onClick={() => setShowDeveloperInfo(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X className="text-slate-400" />
                  </button>
                </div>
                
                <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tight">Desenvolvedor</h2>
                <p className="text-slate-500 font-medium mb-8">Informações sobre a criação da plataforma.</p>
                
                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <p className="text-slate-700 font-bold leading-relaxed">
                      Esta plataforma foi criada e desenvolvida pelo <span className="text-indigo-600">Professor Jaqueilson Ferreira da Silva Santos</span> em Março de 2026.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Finalidade e Objetivo</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      O Point&Power é uma plataforma completa de gestão escolar e comportamental projetada para transformar a dinâmica em sala de aula. 
                      Seu objetivo é promover o engajamento dos alunos através da gamificação, oferecendo aos professores ferramentas precisas para 
                      monitoramento de comportamento, frequência e desempenho acadêmico, com relatórios avançados e backup em tempo real para total segurança dos dados.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowDeveloperInfo(false)}
                  className="w-full mt-8 py-4 bg-slate-800 text-white rounded-2xl font-black hover:bg-slate-900 transition-all shadow-lg"
                >
                  FECHAR
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tarefa de Casa Modal */}
      <AnimatePresence>
        {showTarefaModal && selectedHorarioForTarefa && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[40px] shadow-2xl w-full max-w-md overflow-hidden border border-slate-100"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-amber-100 p-4 rounded-3xl">
                    <BookOpen className="text-amber-600 w-8 h-8" />
                  </div>
                  <button onClick={() => setShowTarefaModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X className="text-slate-400" />
                  </button>
                </div>
                
                <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">Cadastrar Tarefa</h2>
                <p className="text-slate-500 font-medium mb-6">
                  {turmas.find(t => t.id === selectedHorarioForTarefa.turma_id)?.nome} - {disciplinas.find(d => d.id === selectedHorarioForTarefa.disciplina_id)?.nome}
                </p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Descrição da Tarefa</label>
                    <textarea
                      value={tarefaDescricao}
                      onChange={(e) => setTarefaDescricao(e.target.value)}
                      placeholder="Descreva a tarefa de casa..."
                      rows={4}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium text-slate-700"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowTarefaModal(false)}
                      className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all uppercase"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={async () => {
                        if (!tarefaDescricao.trim()) return;
                        
                        // Prevent duplicates
                        const isDuplicate = tarefas.some(t => 
                          t.horario_id === selectedHorarioForTarefa.id && 
                          t.data === currentDate
                        );
                        
                        if (isDuplicate) {
                          setToast({ message: "Já existe uma tarefa para este horário hoje!", type: 'error' });
                          setTimeout(() => setToast(null), 3000);
                          return;
                        }

                        await fetch('/api/tarefas', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            horario_id: selectedHorarioForTarefa.id,
                            data: currentDate,
                            descricao: tarefaDescricao,
                            corrigida: 0
                          })
                        });
                        fetchData();
                        setShowTarefaModal(false);
                        setToast({ message: "Tarefa cadastrada!", type: 'success' });
                        setTimeout(() => setToast(null), 3000);
                      }}
                      className="flex-1 py-4 bg-amber-600 text-white rounded-2xl font-black hover:bg-amber-700 transition-all shadow-lg shadow-amber-200 uppercase"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Duplicate Occurrence Confirmation Modal */}
      <AnimatePresence>
        {duplicateConfirmData && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[40px] shadow-2xl w-full max-w-md overflow-hidden border border-amber-100"
            >
              <div className="p-8">
                <div className="bg-amber-100 w-16 h-16 rounded-3xl flex items-center justify-center mb-6">
                  <Bell className="text-amber-600 w-8 h-8" />
                </div>
                
                <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase">Possível Duplicidade</h2>
                <p className="text-slate-500 font-medium mb-6">
                  Já existe uma ocorrência registrada para este aluno hoje com o mesmo motivo e disciplina. Deseja confirmar o novo registro?
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setDuplicateConfirmData(null)}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all"
                  >
                    CANCELAR
                  </button>
                  <button
                    onClick={() => executeSaveOccurrence(duplicateConfirmData.ids, duplicateConfirmData.data)}
                    className="flex-1 py-4 bg-amber-600 text-white rounded-2xl font-black hover:bg-amber-700 transition-all shadow-lg shadow-amber-200"
                  >
                    CONFIRMAR
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] pointer-events-none"
          >
            <div className={cn(
              "px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-white",
              toast.type === 'success' ? "bg-emerald-600" : "bg-rose-600"
            )}>
              {toast.type === 'success' ? <ShieldCheck size={20} /> : <X size={20} />}
              {toast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} className="hidden" />
      {/* Student Occurrences Modal */}
      <AnimatePresence>
        {showStudentOccurrencesModal && selectedStudentForModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                    <UserIcon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Ocorrências de {selectedStudentForModal.nome}</h3>
                    <p className="text-sm text-slate-500">{turmas.find(t => t.id === selectedStudentForModal.turma_id)?.nome}</p>
                  </div>
                </div>
                <button onClick={() => setShowStudentOccurrencesModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex gap-2">
                  <button
                    onClick={() => setOccurrenceFilter('positive')}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-bold transition-all",
                      occurrenceFilter === 'positive' ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                    )}
                  >
                    Positivas
                  </button>
                  <button
                    onClick={() => setOccurrenceFilter('negative')}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-bold transition-all",
                      occurrenceFilter === 'negative' ? "bg-rose-600 text-white" : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                    )}
                  >
                    Negativas
                  </button>
                  <button
                    onClick={() => setOccurrenceFilter('all')}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-bold transition-all",
                      occurrenceFilter === 'all' ? "bg-slate-600 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    Todas
                  </button>
                </div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {ocorrencias
                    .filter(o => o.aluno_id === selectedStudentForModal.id)
                    .filter(o => {
                      if (occurrenceFilter === 'positive') return o.tipo === 1;
                      if (occurrenceFilter === 'negative') return o.tipo === -1;
                      return true;
                    })
                    .sort((a, b) => b.id - a.id)
                    .map(o => (
                      <div key={o.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                        <div className={cn(
                          "p-2 rounded-lg",
                          o.tipo === 1 ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                        )}>
                          {o.tipo === 1 ? <Smile size={18} /> : <Frown size={18} />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-700">{o.descricao}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[10px] text-slate-400 font-bold uppercase">{o.data}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase">
                              {disciplinas.find(d => d.id === o.disciplina_id)?.nome}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  {ocorrencias.filter(o => o.aluno_id === selectedStudentForModal.id).length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                      <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
                      <p>Nenhuma ocorrência registrada para este aluno.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Manual Action Modal */}
      <AnimatePresence>
        {showManualActionModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-800">Inserir Aluno na Coordenação</h3>
                <button onClick={() => setShowManualActionModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Pesquisar aluno..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    onChange={(e) => {
                      const term = e.target.value.toLowerCase();
                      setManualActionSearch(term);
                    }}
                  />
                </div>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {alunos
                    .filter(a => a.nome.toLowerCase().includes(manualActionSearch))
                    .slice(0, 10).map(aluno => (
                    <button
                      key={aluno.id}
                      onClick={() => {
                        setSelectedStudentForAction(aluno);
                        setActionType('coordenacao');
                        setShowActionModal(true);
                        setShowManualActionModal(false);
                      }}
                      className="w-full p-3 text-left hover:bg-indigo-50 rounded-xl transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <p className="font-bold text-slate-700">{aluno.nome}</p>
                        <p className="text-xs text-slate-500">{turmas.find(t => t.id === aluno.turma_id)?.nome}</p>
                      </div>
                      <Plus size={18} className="text-slate-300 group-hover:text-indigo-600" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Resolution Modal */}
      <AnimatePresence>
        {showResolutionModal && selectedActionForResolution && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-800">Resolver Ocorrência</h3>
                <button onClick={() => setShowResolutionModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => setShowModeloEscritaModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-all"
                  >
                    <Smile size={18} /> Modelos de Escrita
                  </button>
                </div>
                <textarea
                  value={resolutionText}
                  onChange={(e) => setResolutionText(e.target.value)}
                  placeholder="Descreva a resolução ou providência tomada..."
                  className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                />
                <button
                  onClick={handleResolveAction}
                  className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={20} /> Marcar como Resolvido
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Original Text Modal */}
      <AnimatePresence>
        {showOriginalTextModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-800">Texto Original do Encaminhamento</h3>
                <button onClick={() => setShowOriginalTextModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              <div className="p-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-700 whitespace-pre-wrap italic">
                  "{originalText}"
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modelo Escrita Modal */}
      <AnimatePresence>
        {showModeloEscritaModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-800">Modelos de Escrita</h3>
                <button onClick={() => setShowModeloEscritaModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-400 uppercase">Novo Modelo</h4>
                    <input
                      type="text"
                      placeholder="Título do modelo"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      value={newModeloEscrita.titulo}
                      onChange={(e) => setNewModeloEscrita(prev => ({ ...prev, titulo: e.target.value }))}
                    />
                    <textarea
                      placeholder="Texto do modelo..."
                      className="w-full h-32 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none"
                      value={newModeloEscrita.texto}
                      onChange={(e) => setNewModeloEscrita(prev => ({ ...prev, texto: e.target.value }))}
                    />
                    <button
                      onClick={handleSaveModeloEscrita}
                      className="w-full py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
                    >
                      Salvar Modelo
                    </button>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-400 uppercase">Modelos Salvos</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                      {modelosEscrita.map(m => (
                        <div key={m.id} className="group relative">
                          <button
                            onClick={() => {
                              setResolutionText(prev => prev + (prev ? '\n' : '') + m.texto);
                              setShowModeloEscritaModal(false);
                            }}
                            className="w-full p-3 text-left bg-slate-50 hover:bg-indigo-50 rounded-xl border border-slate-200 transition-all"
                          >
                            <p className="font-bold text-slate-700 text-sm">{m.titulo}</p>
                            <p className="text-xs text-slate-500 line-clamp-1">{m.texto}</p>
                          </button>
                          <button
                            onClick={() => handleDeleteModeloEscrita(m.id!)}
                            className="absolute right-2 top-2 p-1 text-rose-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Project Modal */}
      <AnimatePresence>
        {showCreateProjetoModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-800">Criar Novo Projeto</h3>
                <button onClick={() => setShowCreateProjetoModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleCreateProjeto({
                  nome: formData.get('nome') as string,
                  descricao: formData.get('descricao') as string,
                  data_inicio: formData.get('data_inicio') as string,
                  data_termino: formData.get('data_fim') as string,
                  professor_responsavel: formData.get('professor') as string,
                });
              }} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Nome do Projeto</label>
                  <input name="nome" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Descrição</label>
                  <textarea name="descricao" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Início</label>
                    <input type="date" name="data_inicio" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Término</label>
                    <input type="date" name="data_fim" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Professor Responsável</label>
                  <input name="professor" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
                  CRIAR PROJETO
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Project Turma Modal */}
      <AnimatePresence>
        {showCreateProjetoTurmaModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-800">Nova Turma no Projeto</h3>
                <button onClick={() => setShowCreateProjetoTurmaModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleCreateProjetoTurma({
                  nome: formData.get('nome') as string,
                  serie: formData.get('serie') as string,
                  turno: formData.get('turno') as string,
                });
              }} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Nome da Turma</label>
                  <input name="nome" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Série/Ano</label>
                  <input name="serie" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Turno</label>
                  <select name="turno" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noite">Noite</option>
                    <option value="Integral">Integral</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
                  CRIAR TURMA
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Import Turma Modal */}
      <AnimatePresence>
        {showImportTurmaModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-800">Importar Turma</h3>
                <button onClick={() => setShowImportTurmaModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-slate-500">Selecione uma turma para importar. Todos os alunos serão duplicados para este projeto.</p>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {turmas.map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleImportTurma(t.id)}
                      className="w-full p-4 text-left bg-slate-50 hover:bg-indigo-50 border border-slate-200 rounded-2xl transition-all flex items-center justify-between group"
                    >
                      <div>
                        <p className="font-bold text-slate-800">{t.nome}</p>
                        <p className="text-xs text-slate-400">{t.serie} • {t.turno}</p>
                      </div>
                      <ChevronRight className="text-slate-300 group-hover:text-indigo-500 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Project Aluno Modal */}
      <AnimatePresence>
        {showAddProjetoAlunoModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-800">Adicionar Aluno ao Projeto</h3>
                <button onClick={() => setShowAddProjetoAlunoModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleAddProjetoAluno({
                  nome: formData.get('nome') as string,
                  identificador: formData.get('identificador') as string,
                  projeto_turma_id: Number(formData.get('turma_id')),
                  pontos: 0
                });
              }} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Nome do Aluno</label>
                  <input name="nome" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Identificador (Matrícula/ID)</label>
                  <input name="identificador" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Vincular à Turma do Projeto</label>
                  <select name="turma_id" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Nenhuma (Aluno Avulso)</option>
                    {projetoTurmas.filter(pt => pt.projeto_id === selectedProjetoId).map(pt => (
                      <option key={pt.id} value={pt.id}>{pt.nome}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
                  ADICIONAR ALUNO
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Projeto Atividade Modal */}
      <AnimatePresence>
        {showCreateProjetoAtividadeModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-800">Nova Atividade no Cronograma</h3>
                <button onClick={() => setShowCreateProjetoAtividadeModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleCreateProjetoAtividade();
              }} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Título da Atividade</label>
                  <input 
                    required 
                    value={newProjetoAtividade.titulo}
                    onChange={(e) => setNewProjetoAtividade({...newProjetoAtividade, titulo: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
                    placeholder="Ex: Entrega do protótipo"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Descrição (Opcional)</label>
                  <textarea 
                    value={newProjetoAtividade.descricao}
                    onChange={(e) => setNewProjetoAtividade({...newProjetoAtividade, descricao: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]" 
                    placeholder="Detalhes sobre a atividade..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Data de Execução</label>
                  <input 
                    type="date"
                    required 
                    value={newProjetoAtividade.data_execucao}
                    onChange={(e) => setNewProjetoAtividade({...newProjetoAtividade, data_execucao: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
                  />
                </div>
                <button type="submit" className="w-full py-4 bg-amber-500 text-white rounded-2xl font-bold hover:bg-amber-600 shadow-lg shadow-amber-100 transition-all">
                  ADICIONAR AO CRONOGRAMA
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Registrar Experiencia Modal */}
      <AnimatePresence>
        {showRegistrarExperienciaModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-800">
                  {editingExperiencia ? 'Editar Registro' : 'Registrar Experiência'}
                </h3>
                <button 
                  onClick={() => {
                    setShowRegistrarExperienciaModal(false);
                    setEditingExperiencia(null);
                  }} 
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const files = (e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement).files;
                handleRegistrarExperiencia({
                  data: formData.get('data') as string,
                  descricao: formData.get('descricao') as string,
                  observacoes: formData.get('observacoes') as string,
                }, files ? Array.from(files) : []);
              }} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Data</label>
                  <input 
                    type="date" 
                    name="data" 
                    required 
                    defaultValue={editingExperiencia?.data || new Date().toISOString().split('T')[0]} 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Descrição da Atividade</label>
                  <textarea 
                    name="descricao" 
                    required 
                    defaultValue={editingExperiencia?.descricao}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Observações/Resultados</label>
                  <textarea 
                    name="observacoes" 
                    defaultValue={editingExperiencia?.observacoes}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Anexar Mídias (Fotos/Vídeos)</label>
                  <div className="relative">
                    <input type="file" multiple accept="image/*,video/*" className="hidden" id="exp-files" />
                    <label htmlFor="exp-files" className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all">
                      <Upload className="text-slate-400" />
                      <span className="text-sm font-bold text-slate-500">
                        {editingExperiencia ? 'Substituir mídias existentes' : 'Clique para selecionar arquivos'}
                      </span>
                    </label>
                  </div>
                  {editingExperiencia?.arquivos && editingExperiencia.arquivos.length > 0 && (
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                      {editingExperiencia.arquivos.length} arquivo(s) já vinculados.
                    </p>
                  )}
                </div>
                <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
                  {editingExperiencia ? 'ATUALIZAR REGISTRO' : 'SALVAR REGISTRO'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cadastrar Aluno Especial Modal */}
      <AnimatePresence>
        {showCadastrarAlunoEspecialModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-800">Cadastrar Aluno Especial</h3>
                <button onClick={() => setShowCadastrarAlunoEspecialModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleCadastrarAlunoEspecial({
                  aluno_id: Number(formData.get('aluno_id')),
                  turma_id: Number(formData.get('turma_id')),
                  disciplina_id: Number(formData.get('disciplina_id')),
                  plano_acompanhamento: '',
                  evolucao: ''
                });
              }} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Aluno</label>
                  <select name="aluno_id" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Selecione um aluno</option>
                    {alunos.sort((a, b) => a.nome.localeCompare(b.nome)).map(a => (
                      <option key={a.id} value={a.id}>{a.nome} ({turmas.find(t => t.id === a.turma_id)?.nome})</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Turma</label>
                  <select name="turma_id" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Selecione a turma</option>
                    {turmas.map(t => (
                      <option key={t.id} value={t.id}>{t.nome}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Disciplina</label>
                  <select name="disciplina_id" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Selecione a disciplina</option>
                    {disciplinas.map(d => (
                      <option key={d.id} value={d.id}>{d.nome}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
                  CADASTRAR ALUNO
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Plano Acompanhamento Modal */}
      <AnimatePresence>
        {showPlanoAcompanhamentoModal && selectedAlunoEspecial && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-indigo-600 text-white">
                <div>
                  <h3 className="text-xl font-bold">{selectedAlunoEspecial.nome}</h3>
                  <p className="text-indigo-100 text-sm">{selectedAlunoEspecial.turma} • {selectedAlunoEspecial.disciplina}</p>
                </div>
                <button onClick={() => setShowPlanoAcompanhamentoModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <FileText size={20} />
                    <h4 className="font-black uppercase tracking-wider">Plano de Acompanhamento Individual</h4>
                  </div>
                  <textarea
                    defaultValue={selectedAlunoEspecial.plano_acompanhamento}
                    onBlur={(e) => handleSavePlanoAcompanhamento(e.target.value)}
                    placeholder="Descreva o plano de acompanhamento para este aluno..."
                    className="w-full h-96 p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:border-indigo-500 outline-none resize-none transition-all text-slate-700 leading-relaxed"
                  />
                  <p className="text-[10px] text-slate-400 font-bold uppercase">As alterações são salvas automaticamente ao sair do campo.</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <TrendingUp size={20} />
                    <h4 className="font-black uppercase tracking-wider">Evolução do Aluno</h4>
                  </div>
                  <textarea
                    defaultValue={selectedAlunoEspecial.evolucao}
                    onBlur={(e) => handleSaveEvolucaoAluno(e.target.value)}
                    placeholder="Registre aqui a evolução, conquistas e desafios do aluno ao longo do tempo..."
                    className="w-full h-96 p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:border-emerald-500 outline-none resize-none transition-all text-slate-700 leading-relaxed"
                  />
                  <p className="text-[10px] text-slate-400 font-bold uppercase">As alterações são salvas automaticamente ao sair do campo.</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Visualizar Ocorrências Modal */}
      <AnimatePresence>
        {showOccurrenceViewModal && selectedStudentForOccurrenceView && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Ocorrências do Aluno</h3>
                  <p className="text-sm text-slate-500 font-medium">{selectedStudentForOccurrenceView.nome}</p>
                </div>
                <button onClick={() => setShowOccurrenceViewModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 bg-slate-50/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  {/* Coluna Positivas */}
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-6 bg-emerald-500 rounded-full"></div>
                      <h4 className="text-lg font-bold text-slate-700 uppercase tracking-wider">POSITIVAS</h4>
                    </div>
                    <div className="space-y-3 flex-1">
                      {ocorrencias
                        .filter(o => o.aluno_id === selectedStudentForOccurrenceView.id && o.tipo === 'positiva')
                        .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                        .length > 0 ? (
                          ocorrencias
                            .filter(o => o.aluno_id === selectedStudentForOccurrenceView.id && o.tipo === 'positiva')
                            .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                            .map(o => (
                              <div key={o.id} className="p-4 bg-white border border-emerald-100 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                                <div className="flex justify-between items-start mb-2">
                                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase">
                                    {format(parseISO(o.data), 'dd/MM/yyyy')}
                                  </span>
                                  <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-100 rounded-lg transition-all text-slate-400">
                                    <Edit3 size={14} />
                                  </button>
                                </div>
                                <p className="text-sm text-slate-700 leading-relaxed">{o.descricao}</p>
                              </div>
                            ))
                        ) : (
                          <div className="flex flex-col items-center justify-center p-8 bg-white border border-dashed border-slate-200 rounded-2xl text-slate-400">
                            <p className="text-sm font-medium italic">Nenhuma ocorrência registrada</p>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Coluna Negativas */}
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-6 bg-rose-500 rounded-full"></div>
                      <h4 className="text-lg font-bold text-slate-700 uppercase tracking-wider">NEGATIVAS</h4>
                    </div>
                    <div className="space-y-3 flex-1">
                      {ocorrencias
                        .filter(o => o.aluno_id === selectedStudentForOccurrenceView.id && o.tipo === 'negativa')
                        .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                        .length > 0 ? (
                          ocorrencias
                            .filter(o => o.aluno_id === selectedStudentForOccurrenceView.id && o.tipo === 'negativa')
                            .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                            .map(o => (
                              <div key={o.id} className="p-4 bg-white border border-rose-100 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                                <div className="flex justify-between items-start mb-2">
                                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full uppercase">
                                    {format(parseISO(o.data), 'dd/MM/yyyy')}
                                  </span>
                                  <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-100 rounded-lg transition-all text-slate-400">
                                    <Edit3 size={14} />
                                  </button>
                                </div>
                                <p className="text-sm text-slate-700 leading-relaxed">{o.descricao}</p>
                              </div>
                            ))
                        ) : (
                          <div className="flex flex-col items-center justify-center p-8 bg-white border border-dashed border-slate-200 rounded-2xl text-slate-400">
                            <p className="text-sm font-medium italic">Nenhuma ocorrência registrada</p>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Nota Modal */}
      <AnimatePresence>
        {showNotaModal && selectedStudentForNota && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="p-8 bg-indigo-600 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Notas do Aluno</h3>
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">{selectedStudentForNota.nome}</p>
                </div>
                <button onClick={() => setShowNotaModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Lançar Nova Nota</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Disciplina</label>
                      <select 
                        value={newNota.disciplina_id}
                        onChange={(e) => setNewNota({ ...newNota, disciplina_id: Number(e.target.value) })}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      >
                        <option value={0}>Selecione...</option>
                        {disciplinas.map(d => (
                          <option key={d.id} value={d.id}>{d.nome}</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Valor (0-10)</label>
                        <input 
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={newNota.valor}
                          onChange={(e) => setNewNota({ ...newNota, valor: Number(e.target.value) })}
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Bimestre</label>
                        <select 
                          value={newNota.bimestre}
                          onChange={(e) => setNewNota({ ...newNota, bimestre: Number(e.target.value) })}
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        >
                          <option value={1}>1º Bimestre</option>
                          <option value={2}>2º Bimestre</option>
                          <option value={3}>3º Bimestre</option>
                          <option value={4}>4º Bimestre</option>
                        </select>
                      </div>
                    </div>
                    <button 
                      onClick={handleCreateNota}
                      className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all transform active:scale-95"
                    >
                      LANÇAR NOTA
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Histórico de Notas</h4>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {notas.filter(n => n.aluno_id === selectedStudentForNota.id).length === 0 ? (
                      <p className="text-center text-slate-400 italic py-8">Nenhuma nota registrada.</p>
                    ) : (
                      notas.filter(n => n.aluno_id === selectedStudentForNota.id).sort((a,b) => b.id - a.id).map(nota => (
                        <div key={nota.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group">
                          <div>
                            <p className="text-xs font-black text-indigo-600 uppercase">{disciplinas.find(d => d.id === nota.disciplina_id)?.nome}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{nota.bimestre}º Bimestre • {format(parseISO(nota.data), 'dd/MM/yy')}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={cn(
                              "text-lg font-black",
                              nota.valor >= 7 ? "text-emerald-600" : "text-rose-600"
                            )}>
                              {nota.valor.toFixed(1)}
                            </span>
                            <button 
                              onClick={async () => {
                                if (confirm('Excluir nota?')) {
                                  await fetch(`/api/notas/${nota.id}`, { method: 'DELETE' });
                                  fetchData();
                                }
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Event Modal (Institutional or Personal) */}
      <AnimatePresence>
        {showEventModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className={cn(
                "p-8 text-white flex items-center justify-between",
                eventType === 'institucional' ? "bg-indigo-600" : "bg-emerald-600"
              )}>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">
                    {eventType === 'institucional' ? 'Evento Institucional' : 'Evento Pessoal'}
                  </h3>
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">
                    {eventType === 'institucional' ? 'Visível para todos' : 'Visível apenas para você'}
                  </p>
                </div>
                <button onClick={() => setShowEventModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Título do Evento</label>
                  <input 
                    value={newEvent.titulo}
                    onChange={(e) => setNewEvent({ ...newEvent, titulo: e.target.value })}
                    placeholder="Ex: Reunião de Pais"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Data</label>
                  <input 
                    type="date"
                    value={newEvent.data}
                    onChange={(e) => setNewEvent({ ...newEvent, data: e.target.value })}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                  />
                </div>
                {eventType === 'institucional' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Tipo</label>
                    <select 
                      value={newEvent.tipo}
                      onChange={(e) => setNewEvent({ ...newEvent, tipo: e.target.value })}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    >
                      <option value="evento">Evento</option>
                      <option value="reuniao">Reunião</option>
                      <option value="prova">Prova</option>
                      <option value="entrega">Entrega</option>
                    </select>
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Descrição</label>
                  <textarea 
                    value={newEvent.descricao}
                    onChange={(e) => setNewEvent({ ...newEvent, descricao: e.target.value })}
                    placeholder="Detalhes sobre o compromisso..."
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 transition-all h-32 resize-none" 
                  />
                </div>
                <button 
                  onClick={handleCreateEvent}
                  className={cn(
                    "w-full py-4 rounded-2xl text-white font-black uppercase tracking-widest shadow-lg transition-all transform active:scale-95",
                    eventType === 'institucional' ? "bg-indigo-600 shadow-indigo-200 hover:bg-indigo-700" : "bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700"
                  )}
                >
                  SALVAR COMPROMISSO
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Schedule Modal */}
      <AnimatePresence>
        {showScheduleModal && selectedProfessorForSchedule && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl overflow-hidden"
            >
              <div className="p-8 bg-indigo-600 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Horário do Professor</h3>
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">{selectedProfessorForSchedule.nome}</p>
                </div>
                <button onClick={() => setShowScheduleModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-6">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Adicionar Aula</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Dia da Semana</label>
                      <select id="schedule-day" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                        {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'].map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Horário/Aula</label>
                      <select id="schedule-time" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                        {['1ª Aula', '2ª Aula', '3ª Aula', '4ª Aula', '5ª Aula', '6ª Aula'].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Turma/Série</label>
                      <select id="schedule-group" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                        {turmas.map(t => <option key={t.id} value={t.nome}>{t.nome}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Disciplina</label>
                      <select id="schedule-subject" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                        {disciplinas.map(d => <option key={d.id} value={d.nome}>{d.nome}</option>)}
                      </select>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 space-y-2">
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Pré-visualização</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-700">Nova aula será adicionada à grade semanal.</span>
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        const day = (document.getElementById('schedule-day') as HTMLSelectElement).value;
                        const time = (document.getElementById('schedule-time') as HTMLSelectElement).value;
                        const group = (document.getElementById('schedule-group') as HTMLSelectElement).value;
                        const subject = (document.getElementById('schedule-subject') as HTMLSelectElement).value;
                        handleSaveSchedule({
                          teacher_id: selectedProfessorForSchedule.id,
                          day_of_week: day,
                          class_time: time,
                          class_group: group,
                          subject: subject
                        });
                      }}
                      className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all transform active:scale-95"
                    >
                      SALVAR HORÁRIO
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Grade Semanal</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'].map(dia => (
                      <div key={dia} className="space-y-2">
                        <p className="text-[9px] font-black text-center text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1">{dia}</p>
                        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                          {teacherSchedules
                            .filter(s => s.teacher_id === selectedProfessorForSchedule.id && s.day_of_week === dia)
                            .sort((a, b) => a.class_time.localeCompare(b.class_time))
                            .map(s => (
                              <div 
                                key={s.id} 
                                className={cn(
                                  "p-2 bg-slate-50 rounded-xl border border-slate-100 relative group transition-all duration-500",
                                  lastAddedScheduleId === s.id ? "bg-indigo-100 border-indigo-300 scale-105 shadow-md" : ""
                                )}
                              >
                                <button 
                                  onClick={() => handleDeleteSchedule(s.id)}
                                  className="absolute -top-1 -right-1 p-1 bg-white shadow-sm rounded-full text-slate-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                  <X size={10} />
                                </button>
                                <p className="text-[8px] font-black text-indigo-500 uppercase">{s.class_time}</p>
                                <p className="text-[10px] font-bold text-slate-800 leading-tight">{s.class_group}</p>
                                <p className="text-[8px] text-slate-400 font-medium">{s.subject}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Homework Modal */}
      <AnimatePresence>
        {showHomeworkModal && selectedScheduleForHomework && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-8 bg-emerald-600 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Lançar Tarefa</h3>
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">
                    {selectedScheduleForHomework.class_group} • {selectedScheduleForHomework.subject}
                  </p>
                </div>
                <button onClick={() => setShowHomeworkModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Descrição da Tarefa</label>
                  <textarea 
                    id="homework-desc"
                    placeholder="Descreva a atividade para os alunos..."
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium text-slate-600 outline-none focus:ring-2 focus:ring-emerald-500 transition-all h-32 resize-none" 
                  />
                </div>
                <button 
                  onClick={() => {
                    const desc = (document.getElementById('homework-desc') as HTMLTextAreaElement).value;
                    handleSaveHomework({
                      teacher_id: selectedScheduleForHomework.teacher_id,
                      class_group: selectedScheduleForHomework.class_group,
                      subject: selectedScheduleForHomework.subject,
                      description: desc,
                      date_created: new Date().toISOString().split('T')[0]
                    });
                    setShowHomeworkModal(false);
                  }}
                  className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all transform active:scale-95"
                >
                  PUBLICAR TAREFA
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showResetConfirmation && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-8 bg-rose-600 text-white text-center">
                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle size={40} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">Confirmação de Segurança</h3>
                <p className="text-rose-100 text-sm font-bold mt-2 uppercase tracking-widest">Ação Irreversível</p>
              </div>
              
              <div className="p-8 space-y-6">
                {resetStep === 1 ? (
                  <>
                    <p className="text-slate-600 font-bold text-center leading-relaxed">
                      Você está prestes a apagar dados importantes. Deseja continuar?
                    </p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setShowResetConfirmation(false)}
                        className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                      >
                        CANCELAR
                      </button>
                      <button 
                        onClick={() => setResetStep(2)}
                        className="flex-1 py-4 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all"
                      >
                        CONTINUAR
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <p className="text-slate-600 font-bold text-center leading-relaxed">
                        Para confirmar a exclusão, digite a palavra <span className="text-rose-600 font-black">RESETAR</span> abaixo:
                      </p>
                      <input 
                        type="text"
                        value={resetConfirmationText}
                        onChange={(e) => setResetConfirmationText(e.target.value.toUpperCase())}
                        placeholder="Digite RESETAR aqui..."
                        className="w-full p-4 bg-slate-50 border-2 border-rose-100 rounded-2xl font-black text-center text-rose-600 outline-none focus:border-rose-500 transition-all"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => {
                          setResetStep(1);
                          setResetConfirmationText('');
                        }}
                        className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                      >
                        VOLTAR
                      </button>
                      <button 
                        disabled={resetConfirmationText !== 'RESETAR'}
                        onClick={handlePartialReset}
                        className="flex-1 py-4 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-rose-200 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        RESETAR AGORA
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
