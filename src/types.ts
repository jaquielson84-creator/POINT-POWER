export interface Turma {
  id: number;
  nome: string;
}

export interface Disciplina {
  id: number;
  nome: string;
}

export interface Aluno {
  id: number;
  nome: string;
  avatar: string;
  turma_id: number;
  pontos: number;
  data_nascimento?: string;
}

export interface Ocorrencia {
  id: number;
  aluno_id: number;
  disciplina_id: number;
  tipo: number;
  type: 'positive' | 'negative';
  descricao: string;
  pontos: number;
  data: string;
  unidade_id?: number;
}

export interface ModeloOcorrencia {
  id: number;
  tipo: number;
  descricao: string;
  pontos: number;
}

export interface Unidade {
  id: number;
  nome: string;
  inicio: string;
  fim: string;
}

export interface Config {
  id: number;
  pergunta_seguranca: string;
  resposta_seguranca: string;
  unidades: Unidade[];
  avatar_set?: string;
  bonus_automatico_ativo?: number;
  bonus_automatico_modelo_id?: number;
  bonus_automatico_semanal?: number;
  bonus_max_negativas?: number;
  bonus_disciplinas_ids?: string; // JSON string of number[]
  bonus_datas_desativadas?: string; // JSON string of string[]
  alerta_disciplinas_ids?: string; // JSON string of number[]
  unidade_ativa_id?: number;
  contagem_por_unidade?: number;
  unidade_inicio?: string;
  unidade_fim?: string;
}

export interface Musica {
  id: number;
  nome: string;
  url: string;
}

export interface Professor {
  id: number;
  nome: string;
  login?: string;
  senha?: string;
  disciplinas_ids?: string; // JSON string of number[]
  turmas_ids?: string; // JSON string of number[]
}

export interface User {
  id: number;
  nome: string;
  login: string;
  role: 'coordenador' | 'professor' | 'developer' | 'responsavel';
  professor_id?: number;
  aluno_id?: number; // For responsavel role
}

export interface Responsavel {
  id: number;
  nome: string;
  login: string;
  senha?: string;
  aluno_id: number;
}

export interface Nota {
  id: number;
  aluno_id: number;
  disciplina_id: number;
  projeto_id?: number;
  valor: number;
  data: string;
  descricao?: string;
}

export interface Notificacao {
  id: number;
  tipo: 'tarefa' | 'lembrete' | 'ocorrencia' | 'nota';
  data: string;
  conteudo: string;
  lida: number;
  aluno_id: number;
  responsavel_id?: number;
}

export interface HorarioProfessor {
  id: number;
  dia_semana: number;
  horario_inicio: string;
  horario_fim: string;
  turma_id: number;
  disciplina_id: number;
  professor_id: number;
  aula_numero?: number;
}

export interface TarefaCasa {
  id: number;
  horario_id: number;
  data: string;
  descricao: string;
  corrigida?: number; // 0 or 1
}

export interface LimiteOcorrencia {
  id: number;
  tipo: 'coordenacao' | 'familia';
  limite: number;
  turmas_ids: string; // JSON string of number[]
}

export interface AcaoCoordenacao {
  id: number;
  aluno_id: number;
  tipo: 'coordenacao' | 'familia';
  descricao: string;
  data: string;
  resolvido: number; // 0 or 1
  data_resolvido?: string;
  texto_original?: string;
  resolucao_coordenacao?: string;
}

export interface ModeloEscrita {
  id: number;
  titulo: string;
  texto: string;
}

export type ViewMode = 'grid-sm' | 'grid-md' | 'grid-lg' | 'list';
export type SortMode = 'az' | 'max' | 'min';

export interface Projeto {
  id: number;
  nome: string;
  descricao: string;
  data_inicio: string;
  data_termino: string;
  professor_responsavel: string;
}

export interface ProjetoTurma {
  id: number;
  projeto_id: number;
  nome: string;
  serie: string;
  turno?: string;
}

export interface ProjetoAluno {
  id: number;
  projeto_id: number;
  projeto_turma_id: number;
  nome: string;
  identificador: string;
  pontos: number;
  nota?: number;
}

export interface ProjetoExperiencia {
  id: number;
  projeto_id: number;
  data: string;
  descricao: string;
  observacoes: string;
  arquivos: ProjetoArquivo[];
}

export interface ProjetoArquivo {
  id: string;
  nome: string;
  tipo: string;
  url: string;
}

export interface ProjetoAtividade {
  id: number;
  projeto_id: number;
  titulo: string;
  descricao: string;
  data_execucao: string;
}

export interface AlunoCondicaoEspecial {
  id: number;
  aluno_id: number;
  turma_id: number;
  disciplina_id: number;
  plano_acompanhamento: string;
  evolucao: string;
}

export interface EventoInstitucional {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  tipo?: string;
}

export interface EventoPessoal {
  id: number;
  professor_id: number;
  titulo: string;
  descricao: string;
  data: string;
}

export interface TeacherSchedule {
  id: number;
  teacher_id: number;
  day_of_week: string;
  class_time: string;
  class_group: string;
  subject: string;
}

export interface Homework {
  id: number;
  teacher_id: number;
  class_group: string;
  subject: string;
  description: string;
  date_created: string;
}
