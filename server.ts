import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import session from "express-session";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

declare module 'express-session' {
  interface SessionData {
    userId: number;
    userRole: 'coordenador' | 'professor' | 'developer' | 'responsavel';
    userName: string;
    professorId?: number;
    alunoId?: number;
  }
}

const db = new Database("edupoint.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    login TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    role TEXT NOT NULL, -- 'coordenador', 'professor', 'developer', 'responsavel'
    professor_id INTEGER,
    aluno_id INTEGER,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE CASCADE,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS responsaveis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    login TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    aluno_id INTEGER NOT NULL,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS notas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aluno_id INTEGER NOT NULL,
    disciplina_id INTEGER NOT NULL,
    projeto_id INTEGER,
    valor REAL NOT NULL,
    data TEXT NOT NULL,
    descricao TEXT,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE,
    FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS notificacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT NOT NULL, -- 'tarefa', 'lembrete', 'ocorrencia', 'nota'
    data TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    lida INTEGER DEFAULT 0,
    aluno_id INTEGER NOT NULL,
    responsavel_id INTEGER,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (responsavel_id) REFERENCES responsaveis(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS turmas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS disciplinas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    avatar TEXT,
    turma_id INTEGER,
    pontos INTEGER DEFAULT 0,
    data_nascimento TEXT,
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS ocorrencias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aluno_id INTEGER,
    disciplina_id INTEGER,
    tipo INTEGER, -- 1 for positive, -1 for negative
    type TEXT, -- 'positive' or 'negative'
    descricao TEXT,
    pontos INTEGER,
    data TEXT,
    unidade_id INTEGER,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS modelos_ocorrencia (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo INTEGER,
    descricao TEXT,
    pontos INTEGER
  );

  CREATE TABLE IF NOT EXISTS configuracoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pergunta_seguranca TEXT,
    resposta_seguranca TEXT,
    unidades TEXT, -- JSON string
    avatar_set TEXT DEFAULT 'fun-emoji',
    bonus_automatico_ativo INTEGER DEFAULT 0,
    bonus_automatico_modelo_id INTEGER,
    bonus_automatico_semanal INTEGER DEFAULT 0,
    bonus_max_negativas INTEGER DEFAULT 0,
    bonus_disciplinas_ids TEXT DEFAULT '[]',
    bonus_datas_desativadas TEXT DEFAULT '[]',
    unidade_ativa_id INTEGER DEFAULT 1,
    contagem_por_unidade INTEGER DEFAULT 0,
    unidade_inicio TEXT,
    unidade_fim TEXT,
    alerta_disciplinas_ids TEXT DEFAULT '[]'
  );

  CREATE TABLE IF NOT EXISTS musicas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    url TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS professores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    login TEXT,
    senha TEXT,
    disciplinas_ids TEXT DEFAULT '[]', -- JSON array of numbers
    turmas_ids TEXT DEFAULT '[]' -- JSON array of numbers
  );

  CREATE TABLE IF NOT EXISTS horario_professor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dia_semana INTEGER, -- 0-6
    horario_inicio TEXT, -- e.g. "07:30"
    horario_fim TEXT, -- e.g. "08:20"
    turma_id INTEGER,
    disciplina_id INTEGER,
    professor_id INTEGER,
    aula_numero INTEGER, -- 1-6
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS tarefas_casa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    horario_id INTEGER,
    data TEXT,
    descricao TEXT,
    corrigida INTEGER DEFAULT 0,
    FOREIGN KEY (horario_id) REFERENCES horario_professor(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS limites_ocorrencias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT NOT NULL, -- 'coordenacao' or 'familia'
    limite INTEGER NOT NULL,
    turmas_ids TEXT DEFAULT '[]' -- JSON array of numbers
  );

  CREATE TABLE IF NOT EXISTS acoes_coordenacao (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aluno_id INTEGER NOT NULL,
    tipo TEXT NOT NULL, -- 'coordenacao' or 'familia'
    descricao TEXT,
    data TEXT,
    resolvido INTEGER DEFAULT 0,
    data_resolvido TEXT,
    texto_original TEXT,
    resolucao_coordenacao TEXT,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS modelos_escrita (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    texto TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS projetos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    data_inicio TEXT,
    data_termino TEXT,
    professor_responsavel TEXT
  );

  CREATE TABLE IF NOT EXISTS projeto_turmas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    projeto_id INTEGER,
    nome TEXT NOT NULL,
    serie TEXT,
    turno TEXT,
    FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS projeto_alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    projeto_id INTEGER,
    projeto_turma_id INTEGER,
    nome TEXT NOT NULL,
    identificador TEXT,
    pontos INTEGER DEFAULT 0,
    nota REAL,
    FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE,
    FOREIGN KEY (projeto_turma_id) REFERENCES projeto_turmas(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS projeto_experiencias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    projeto_id INTEGER,
    data TEXT,
    descricao TEXT,
    observacoes TEXT,
    arquivos TEXT, -- JSON string of ProjetoArquivo[]
    FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS alunos_especiais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aluno_id INTEGER,
    turma_id INTEGER,
    disciplina_id INTEGER,
    plano_acompanhamento TEXT,
    evolucao TEXT,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS eventos_institucionais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT,
    data TEXT NOT NULL,
    tipo TEXT
  );

  CREATE TABLE IF NOT EXISTS eventos_pessoais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    professor_id INTEGER NOT NULL,
    titulo TEXT NOT NULL,
    descricao TEXT,
    data TEXT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS projeto_atividades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    projeto_id INTEGER NOT NULL,
    titulo TEXT NOT NULL,
    descricao TEXT,
    data_execucao TEXT NOT NULL,
    FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS teacher_schedule (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    teacher_id INTEGER NOT NULL,
    day_of_week TEXT NOT NULL,
    class_time TEXT NOT NULL,
    class_group TEXT NOT NULL,
    subject TEXT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES professores(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS homework (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    teacher_id INTEGER NOT NULL,
    class_group TEXT NOT NULL,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    date_created TEXT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES professores(id) ON DELETE CASCADE
  );
`);

// Migration: Add avatar_set if it doesn't exist
try {
  db.prepare("SELECT avatar_set FROM configuracoes LIMIT 1").get();
} catch (e: any) {
  if (e.message.includes("no such column: avatar_set")) {
    db.exec("ALTER TABLE configuracoes ADD COLUMN avatar_set TEXT DEFAULT 'fun-emoji'");
  }
}

// Migration: Add new columns to configuracoes
try {
  db.prepare("SELECT bonus_automatico_ativo FROM configuracoes LIMIT 1").get();
} catch (e: any) {
  db.exec("ALTER TABLE configuracoes ADD COLUMN bonus_automatico_ativo INTEGER DEFAULT 0");
  db.exec("ALTER TABLE configuracoes ADD COLUMN bonus_automatico_modelo_id INTEGER");
  db.exec("ALTER TABLE configuracoes ADD COLUMN bonus_automatico_semanal INTEGER DEFAULT 0");
}

try {
  db.prepare("SELECT bonus_max_negativas FROM configuracoes LIMIT 1").get();
} catch (e: any) {
  db.exec("ALTER TABLE configuracoes ADD COLUMN bonus_max_negativas INTEGER DEFAULT 0");
}

try {
  db.prepare("SELECT bonus_disciplinas_ids FROM configuracoes LIMIT 1").get();
} catch (e: any) {
  db.exec("ALTER TABLE configuracoes ADD COLUMN bonus_disciplinas_ids TEXT DEFAULT '[]'");
  db.exec("ALTER TABLE configuracoes ADD COLUMN bonus_datas_desativadas TEXT DEFAULT '[]'");
}

try {
  db.prepare("SELECT unidade_ativa_id FROM configuracoes LIMIT 1").get();
} catch (e: any) {
  db.exec("ALTER TABLE configuracoes ADD COLUMN unidade_ativa_id INTEGER DEFAULT 1");
}

try {
  db.prepare("SELECT contagem_por_unidade FROM configuracoes LIMIT 1").get();
} catch (e: any) {
  db.exec("ALTER TABLE configuracoes ADD COLUMN contagem_por_unidade INTEGER DEFAULT 0");
  db.exec("ALTER TABLE configuracoes ADD COLUMN unidade_inicio TEXT");
  db.exec("ALTER TABLE configuracoes ADD COLUMN unidade_fim TEXT");
}

try {
  db.prepare("SELECT horario_inicio FROM horario_professor LIMIT 1").get();
} catch (e: any) {
  db.exec("ALTER TABLE horario_professor ADD COLUMN horario_inicio TEXT");
  db.exec("ALTER TABLE horario_professor ADD COLUMN horario_fim TEXT");
}

try {
  db.prepare("SELECT corrigida FROM tarefas_casa LIMIT 1").get();
} catch (e: any) {
  db.exec("ALTER TABLE tarefas_casa ADD COLUMN corrigida INTEGER DEFAULT 0");
}

try {
  db.prepare("SELECT nota FROM projeto_alunos LIMIT 1").get();
} catch (e: any) {
  if (e.message.includes("no such column: nota")) {
    db.exec("ALTER TABLE projeto_alunos ADD COLUMN nota REAL");
  }
}

try {
  db.prepare("SELECT login FROM professores LIMIT 1").get();
} catch (e: any) {
  if (e.message.includes("no such column: login")) {
    db.exec("ALTER TABLE professores ADD COLUMN login TEXT");
    db.exec("ALTER TABLE professores ADD COLUMN senha TEXT");
    db.exec("ALTER TABLE professores ADD COLUMN disciplinas_ids TEXT DEFAULT '[]'");
    db.exec("ALTER TABLE professores ADD COLUMN turmas_ids TEXT DEFAULT '[]'");
  }
}

// Seed initial developer if not exists
const devCount = db.prepare("SELECT count(*) as count FROM usuarios WHERE role = 'developer'").get() as { count: number };
if (devCount.count === 0) {
  const hashedSenha = bcrypt.hashSync("SISTEMA", 10);
  db.prepare("INSERT INTO usuarios (nome, login, senha, role) VALUES (?, ?, ?, ?)")
    .run("DESENVOLVEDOR MASTER", "SISTEMA", hashedSenha, "developer");
}

// Seed initial coordinator if not exists
const coordCount = db.prepare("SELECT count(*) as count FROM usuarios WHERE role = 'coordenador'").get() as { count: number };
if (coordCount.count === 0) {
  const hashedSenha = bcrypt.hashSync("admin123", 10);
  db.prepare("INSERT INTO usuarios (nome, login, senha, role) VALUES (?, ?, ?, ?)")
    .run("Coordenador Geral", "admin", hashedSenha, "coordenador");
}

// Seed initial config if not exists
const configCount = db.prepare("SELECT count(*) as count FROM configuracoes").get() as { count: number };
if (configCount.count === 0) {
  db.prepare(`
    INSERT INTO configuracoes (
      pergunta_seguranca, 
      resposta_seguranca, 
      unidades, 
      avatar_set, 
      bonus_automatico_ativo, 
      bonus_automatico_semanal,
      unidade_ativa_id,
      bonus_max_negativas
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)
    .run("Qual o nome da sua primeira escola?", "Escola", JSON.stringify([
      { id: 1, nome: "1ª Unidade", inicio: "2024-02-01", fim: "2024-04-30" },
      { id: 2, nome: "2ª Unidade", inicio: "2024-05-01", fim: "2024-07-31" },
      { id: 3, nome: "3ª Unidade", inicio: "2024-08-01", fim: "2024-09-30" },
      { id: 4, nome: "4ª Unidade", inicio: "2024-10-01", fim: "2024-12-31" }
    ]), 'fun-emoji', 1, 1, 1, 0);
}

const turmaCount = db.prepare("SELECT count(*) as count FROM turmas").get() as { count: number };
if (turmaCount.count === 0) {
  const t1 = db.prepare("INSERT INTO turmas (nome) VALUES (?)").run("6º Ano A").lastInsertRowid;
  const t2 = db.prepare("INSERT INTO turmas (nome) VALUES (?)").run("7º Ano B").lastInsertRowid;
  
  db.prepare("INSERT INTO disciplinas (nome) VALUES (?)").run("Matemática");
  db.prepare("INSERT INTO disciplinas (nome) VALUES (?)").run("Português");
  db.prepare("INSERT INTO disciplinas (nome) VALUES (?)").run("História");

  const alunos6 = ["Arthur", "Beatriz", "Caio", "Davi", "Eduarda", "Felipe", "Gabriel", "Helena"];
  alunos6.forEach((nome, i) => {
    const bday = `2012-03-${String(8 + i).padStart(2, '0')}`;
    db.prepare("INSERT INTO alunos (nome, avatar, turma_id, pontos, data_nascimento) VALUES (?, ?, ?, ?, ?)").run(nome, nome, t1, Math.floor(Math.random() * 20), bday);
  });

  const alunos7 = ["Isabela", "João", "Kaique", "Laura", "Miguel", "Noah", "Olivia", "Pedro"];
  alunos7.forEach((nome, i) => {
    const bday = `2011-03-${String(8 + i).padStart(2, '0')}`;
    db.prepare("INSERT INTO alunos (nome, avatar, turma_id, pontos, data_nascimento) VALUES (?, ?, ?, ?, ?)").run(nome, nome, t2, Math.floor(Math.random() * 20), bday);
  });

  db.prepare("INSERT INTO modelos_ocorrencia (tipo, descricao, pontos) VALUES (?, ?, ?)").run(1, "Participação Ativa", 2);
  db.prepare("INSERT INTO modelos_ocorrencia (tipo, descricao, pontos) VALUES (?, ?, ?)").run(1, "Tarefa Concluída", 1);
  db.prepare("INSERT INTO modelos_ocorrencia (tipo, descricao, pontos) VALUES (?, ?, ?)").run(-1, "Conversa Paralela", 1);
  db.prepare("INSERT INTO modelos_ocorrencia (tipo, descricao, pontos) VALUES (?, ?, ?)").run(-1, "Falta de Material", 2);
}

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(session({
    secret: "edupoint-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
  }));

  const PORT = 3000;

  // Auth Middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Não autenticado" });
    }
    next();
  };

  const requireRole = (role: string) => (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Não autenticado" });
    }
    if (req.session.userRole === 'developer') {
      return next();
    }
    if (req.session.userRole !== role) {
      return res.status(403).json({ error: "Acesso negado" });
    }
    next();
  };

  // Auth Routes
  app.post("/api/login", (req, res) => {
    const { login, senha } = req.body;

    // Developer Master Login
    if (login === "SISTEMA" && senha === "SISTEMA") {
      req.session.userId = -1;
      req.session.userRole = 'developer';
      req.session.userName = "DESENVOLVEDOR MASTER";
      return res.json({
        id: -1,
        nome: "DESENVOLVEDOR MASTER",
        role: 'developer'
      });
    }

    const user = db.prepare("SELECT * FROM usuarios WHERE login = ?").get(login) as any;
    
    if (!user || !bcrypt.compareSync(senha, user.senha)) {
      return res.status(401).json({ error: "Login ou senha inválidos" });
    }

    req.session.userId = user.id;
    req.session.userRole = user.role;
    req.session.userName = user.nome;
    req.session.professorId = user.professor_id;
    req.session.alunoId = user.aluno_id;

    res.json({ 
      id: user.id, 
      nome: user.nome, 
      role: user.role, 
      professor_id: user.professor_id,
      aluno_id: user.aluno_id
    });
  });

  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ error: "Erro ao sair" });
      res.clearCookie("connect.sid");
      res.json({ success: true });
    });
  });

  app.get("/api/me", (req: any, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Não autenticado" });
    }
    res.json({ 
      id: req.session.userId, 
      nome: req.session.userName, 
      role: req.session.userRole,
      professor_id: req.session.professorId
    });
  });

  try {
  db.prepare("SELECT data_nascimento FROM alunos LIMIT 1").get();
} catch (e: any) {
  if (e.message.includes("no such column: data_nascimento")) {
    db.exec("ALTER TABLE alunos ADD COLUMN data_nascimento TEXT");
  }
}

// Migration: Add professor_id to horario_professor if it doesn't exist
try {
  db.prepare("SELECT professor_id FROM horario_professor LIMIT 1").get();
} catch (e: any) {
  if (e.message.includes("no such column: professor_id")) {
    db.exec("ALTER TABLE horario_professor ADD COLUMN professor_id INTEGER REFERENCES professores(id) ON DELETE SET NULL");
  }
}

try {
  db.prepare("SELECT alerta_disciplinas_ids FROM configuracoes LIMIT 1").get();
} catch (e: any) {
  db.exec("ALTER TABLE configuracoes ADD COLUMN alerta_disciplinas_ids TEXT DEFAULT '[]'");
}

try {
  db.prepare("SELECT aula_numero FROM horario_professor LIMIT 1").get();
} catch (e: any) {
  db.exec("ALTER TABLE horario_professor ADD COLUMN aula_numero INTEGER");
}

// API Routes
  
  // Professores
app.get("/api/professores", requireAuth, (req, res) => {
  const professores = db.prepare("SELECT * FROM professores ORDER BY nome").all();
  res.json(professores);
});

app.post("/api/professores", requireRole('coordenador'), (req, res) => {
  const { nome, login, senha, disciplinas_ids } = req.body;
  
  const save = db.transaction(() => {
    const result = db.prepare("INSERT INTO professores (nome, login, senha, disciplinas_ids) VALUES (?, ?, ?, ?)")
      .run(nome, login, senha, JSON.stringify(disciplinas_ids || []));
    
    if (login && senha) {
      const hashedSenha = bcrypt.hashSync(senha, 10);
      db.prepare("INSERT INTO usuarios (nome, login, senha, role, professor_id) VALUES (?, ?, ?, ?, ?)")
        .run(nome, login, hashedSenha, 'professor', result.lastInsertRowid);
    }
    
    return result.lastInsertRowid;
  });

  const id = save();
  res.json({ id, nome, login, disciplinas_ids });
});

app.put("/api/professores/:id", requireRole('coordenador'), (req, res) => {
  const { id } = req.params;
  const { nome, login, senha, disciplinas_ids } = req.body;
  
  const update = db.transaction(() => {
    db.prepare("UPDATE professores SET nome = ?, login = ?, senha = ?, disciplinas_ids = ? WHERE id = ?")
      .run(nome, login, senha, JSON.stringify(disciplinas_ids || []), id);
    
    if (login) {
      const existingUser = db.prepare("SELECT id FROM usuarios WHERE professor_id = ?").get(id) as any;
      if (existingUser) {
        let query = "UPDATE usuarios SET nome = ?, login = ?";
        const params = [nome, login];
        if (senha) {
          query += ", senha = ?";
          params.push(bcrypt.hashSync(senha, 10));
        }
        query += " WHERE id = ?";
        params.push(existingUser.id);
        db.prepare(query).run(...params);
      } else if (senha) {
        const hashedSenha = bcrypt.hashSync(senha, 10);
        db.prepare("INSERT INTO usuarios (nome, login, senha, role, professor_id) VALUES (?, ?, ?, ?, ?)")
          .run(nome, login, hashedSenha, 'professor', id);
      }
    }
  });

  update();
  res.json({ id: Number(id), nome, login, disciplinas_ids });
});

app.delete("/api/professores/:id", requireRole('coordenador'), (req, res) => {
  const { id } = req.params;
  db.prepare("DELETE FROM professores WHERE id = ?").run(id);
  db.prepare("DELETE FROM usuarios WHERE professor_id = ?").run(id);
  res.json({ success: true });
});

// Turmas
  app.get("/api/turmas", requireAuth, (req: any, res) => {
    let rows;
    if (req.session.userRole === 'professor') {
      // Get turmas where this professor has classes
      rows = db.prepare(`
        SELECT DISTINCT t.* FROM turmas t
        JOIN horario_professor h ON h.turma_id = t.id
        WHERE h.professor_id = ?
      `).all(req.session.professorId);
    } else {
      rows = db.prepare("SELECT * FROM turmas").all();
    }
    res.json(rows);
  });
  app.post("/api/turmas", (req, res) => {
    const { nome } = req.body;
    const result = db.prepare("INSERT INTO turmas (nome) VALUES (?)").run(nome);
    res.json({ id: result.lastInsertRowid, nome });
  });
  app.delete("/api/turmas/:id", (req, res) => {
    db.prepare("DELETE FROM turmas WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Disciplinas
  app.get("/api/disciplinas", requireAuth, (req: any, res) => {
    let rows;
    if (req.session.userRole === 'professor') {
      const prof = db.prepare("SELECT disciplinas_ids FROM professores WHERE id = ?").get(req.session.professorId) as any;
      const ids = JSON.parse(prof?.disciplinas_ids || '[]');
      if (ids.length > 0) {
        rows = db.prepare(`SELECT * FROM disciplinas WHERE id IN (${ids.join(',')})`).all();
      } else {
        rows = [];
      }
    } else {
      rows = db.prepare("SELECT * FROM disciplinas").all();
    }
    res.json(rows);
  });
  app.post("/api/disciplinas", (req, res) => {
    const { nome } = req.body;
    const result = db.prepare("INSERT INTO disciplinas (nome) VALUES (?)").run(nome);
    res.json({ id: result.lastInsertRowid, nome });
  });
  app.delete("/api/disciplinas/:id", (req, res) => {
    db.prepare("DELETE FROM disciplinas WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Alunos
  app.get("/api/alunos", requireAuth, (req: any, res) => {
    let rows;
    if (req.session.userRole === 'professor') {
      // Get students from turmas where this professor teaches
      rows = db.prepare(`
        SELECT DISTINCT a.* FROM alunos a
        JOIN turmas t ON a.turma_id = t.id
        JOIN horario_professor h ON h.turma_id = t.id
        WHERE h.professor_id = ?
      `).all(req.session.professorId);
    } else {
      rows = db.prepare("SELECT * FROM alunos").all();
    }
    res.json(rows);
  });
  app.post("/api/alunos", (req, res) => {
    const { nome, avatar, turma_id, data_nascimento } = req.body;
    const result = db.prepare("INSERT INTO alunos (nome, avatar, turma_id, pontos, data_nascimento) VALUES (?, ?, ?, 0, ?)").run(nome, avatar, turma_id, data_nascimento);
    res.json({ id: result.lastInsertRowid, nome, avatar, turma_id, pontos: 0, data_nascimento });
  });
  app.put("/api/alunos/:id", (req, res) => {
    const { nome, avatar, turma_id, data_nascimento } = req.body;
    db.prepare("UPDATE alunos SET nome = ?, avatar = ?, turma_id = ?, data_nascimento = ? WHERE id = ?").run(nome, avatar, turma_id, data_nascimento, req.params.id);
    res.json({ success: true });
  });
  app.delete("/api/alunos/:id", (req, res) => {
    db.prepare("DELETE FROM alunos WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });
  app.post("/api/alunos/:id/reset", (req, res) => {
    db.prepare("UPDATE alunos SET pontos = 0 WHERE id = ?").run(req.params.id);
    db.prepare("DELETE FROM ocorrencias WHERE aluno_id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Ocorrencias
  app.get("/api/ocorrencias", (req, res) => {
    const rows = db.prepare("SELECT * FROM ocorrencias").all();
    res.json(rows);
  });
  app.post("/api/ocorrencias", (req, res) => {
    const { aluno_id, disciplina_id, tipo, descricao, pontos, data, unidade_id, type } = req.body;
    const finalType = type || (tipo === 1 ? 'positive' : 'negative');
    const result = db.prepare("INSERT INTO ocorrencias (aluno_id, disciplina_id, tipo, type, descricao, pontos, data, unidade_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
      .run(aluno_id, disciplina_id, tipo, finalType, descricao, pontos, data, unidade_id);
    
    // Update student points
    const currentPoints = db.prepare("SELECT pontos FROM alunos WHERE id = ?").get(aluno_id) as { pontos: number };
    const newPoints = currentPoints.pontos + (tipo * pontos);
    db.prepare("UPDATE alunos SET pontos = ? WHERE id = ?").run(newPoints, aluno_id);

    res.json({ id: result.lastInsertRowid, ...req.body, type: finalType });
  });
  app.put("/api/ocorrencias/:id", (req, res) => {
    const { aluno_id, disciplina_id, tipo, descricao, pontos, data, unidade_id, type } = req.body;
    const finalType = type || (tipo === 1 ? 'positive' : 'negative');
    
    // Reverse old points
    const old = db.prepare("SELECT * FROM ocorrencias WHERE id = ?").get(req.params.id) as any;
    if (old) {
      const currentPoints = db.prepare("SELECT pontos FROM alunos WHERE id = ?").get(old.aluno_id) as { pontos: number };
      const reversedPoints = currentPoints.pontos - (old.tipo * old.pontos);
      db.prepare("UPDATE alunos SET pontos = ? WHERE id = ?").run(reversedPoints, old.aluno_id);
    }

    db.prepare("UPDATE ocorrencias SET aluno_id = ?, disciplina_id = ?, tipo = ?, type = ?, descricao = ?, pontos = ?, data = ?, unidade_id = ? WHERE id = ?")
      .run(aluno_id, disciplina_id, tipo, finalType, descricao, pontos, data, unidade_id, req.params.id);
    
    // Apply new points
    const currentPoints = db.prepare("SELECT pontos FROM alunos WHERE id = ?").get(aluno_id) as { pontos: number };
    const newPoints = currentPoints.pontos + (tipo * pontos);
    db.prepare("UPDATE alunos SET pontos = ? WHERE id = ?").run(newPoints, aluno_id);

    res.json({ success: true });
  });
  app.delete("/api/ocorrencias/:id", (req, res) => {
    const old = db.prepare("SELECT * FROM ocorrencias WHERE id = ?").get(req.params.id) as any;
    if (old) {
      const currentPoints = db.prepare("SELECT pontos FROM alunos WHERE id = ?").get(old.aluno_id) as { pontos: number };
      const reversedPoints = currentPoints.pontos - (old.tipo * old.pontos);
      db.prepare("UPDATE alunos SET pontos = ? WHERE id = ?").run(reversedPoints, old.aluno_id);
    }
    db.prepare("DELETE FROM ocorrencias WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Modelos
  app.get("/api/modelos", (req, res) => {
    const rows = db.prepare("SELECT * FROM modelos_ocorrencia").all();
    res.json(rows);
  });
  app.post("/api/modelos", (req, res) => {
    const { tipo, descricao, pontos } = req.body;
    const result = db.prepare("INSERT INTO modelos_ocorrencia (tipo, descricao, pontos) VALUES (?, ?, ?)")
      .run(tipo, descricao, pontos);
    res.json({ id: result.lastInsertRowid, ...req.body });
  });
  app.delete("/api/modelos/:id", (req, res) => {
    db.prepare("DELETE FROM modelos_ocorrencia WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Config
  app.get("/api/config", (req, res) => {
    const row = db.prepare("SELECT * FROM configuracoes LIMIT 1").get();
    res.json(row);
  });
  app.put("/api/config", (req, res) => {
    const { 
      pergunta_seguranca, 
      resposta_seguranca, 
      unidades, 
      avatar_set, 
      bonus_automatico_ativo, 
      bonus_automatico_modelo_id, 
      bonus_automatico_semanal, 
      bonus_max_negativas, 
      bonus_disciplinas_ids, 
      bonus_datas_desativadas,
      unidade_ativa_id,
      contagem_por_unidade,
      unidade_inicio,
      unidade_fim,
      alerta_disciplinas_ids
    } = req.body;
    
    db.prepare(`
      UPDATE configuracoes SET 
        pergunta_seguranca = ?, 
        resposta_seguranca = ?, 
        unidades = ?, 
        avatar_set = ?, 
        bonus_automatico_ativo = ?, 
        bonus_automatico_modelo_id = ?, 
        bonus_automatico_semanal = ?, 
        bonus_max_negativas = ?, 
        bonus_disciplinas_ids = ?, 
        bonus_datas_desativadas = ?,
        unidade_ativa_id = ?,
        contagem_por_unidade = ?,
        unidade_inicio = ?,
        unidade_fim = ?,
        alerta_disciplinas_ids = ?
      WHERE id = 1
    `).run(
      pergunta_seguranca, 
      resposta_seguranca, 
      JSON.stringify(unidades), 
      avatar_set, 
      bonus_automatico_ativo ? 1 : 0, 
      bonus_automatico_modelo_id, 
      bonus_automatico_semanal ? 1 : 0, 
      bonus_max_negativas || 0, 
      bonus_disciplinas_ids || '[]', 
      bonus_datas_desativadas || '[]',
      unidade_ativa_id || 1,
      contagem_por_unidade ? 1 : 0,
      unidade_inicio,
      unidade_fim,
      alerta_disciplinas_ids || '[]'
    );
    res.json({ success: true });
  });

  // Musicas
  app.get("/api/musicas", (req, res) => {
    res.json(db.prepare("SELECT * FROM musicas").all());
  });
  app.post("/api/musicas", (req, res) => {
    const { nome, url } = req.body;
    const result = db.prepare("INSERT INTO musicas (nome, url) VALUES (?, ?)").run(nome, url);
    res.json({ id: result.lastInsertRowid, nome, url });
  });
  app.delete("/api/musicas/:id", (req, res) => {
    db.prepare("DELETE FROM musicas WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Horario
  app.get("/api/horario", (req, res) => {
    res.json(db.prepare("SELECT * FROM horario_professor").all());
  });
  app.post("/api/horario", (req, res) => {
    const { dia_semana, horario_inicio, horario_fim, turma_id, disciplina_id, professor_id, aula_numero } = req.body;
    const result = db.prepare("INSERT INTO horario_professor (dia_semana, horario_inicio, horario_fim, turma_id, disciplina_id, professor_id, aula_numero) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .run(dia_semana, horario_inicio, horario_fim, turma_id, disciplina_id, professor_id, aula_numero);
    res.json({ id: result.lastInsertRowid, ...req.body });
  });

  app.put("/api/horario/time-slot", (req, res) => {
    const { old_inicio, old_fim, new_inicio, new_fim, professor_id } = req.body;
    let query = "UPDATE horario_professor SET horario_inicio = ?, horario_fim = ? WHERE horario_inicio = ? AND horario_fim = ?";
    const params = [new_inicio, new_fim, old_inicio, old_fim];
    
    if (professor_id && professor_id !== 'all') {
      query += " AND professor_id = ?";
      params.push(professor_id);
    }

    db.prepare(query).run(...params);
    res.json({ success: true });
  });

  app.delete("/api/horario/time-slot", (req, res) => {
    const { inicio, fim, professor_id } = req.body;
    let query = "DELETE FROM horario_professor WHERE horario_inicio = ? AND horario_fim = ?";
    const params = [inicio, fim];

    if (professor_id && professor_id !== 'all') {
      query += " AND professor_id = ?";
      params.push(professor_id);
    }

    db.prepare(query).run(...params);
    res.json({ success: true });
  });
  app.delete("/api/horario/:id", (req, res) => {
    db.prepare("DELETE FROM horario_professor WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.post("/api/horario/bulk", (req, res) => {
    const { entries } = req.body;
    const save = db.transaction(() => {
      for (const e of entries) {
        // Find existing by day, aula_numero and professor
        const existing = db.prepare("SELECT id FROM horario_professor WHERE dia_semana = ? AND aula_numero = ? AND professor_id = ?")
          .get(e.dia_semana, e.aula_numero, e.professor_id);
        
        if (existing) {
          if (e.turma_id === 0 || e.disciplina_id === 0) {
            db.prepare("DELETE FROM horario_professor WHERE id = ?").run(existing.id);
          } else {
            db.prepare("UPDATE horario_professor SET turma_id = ?, disciplina_id = ?, horario_inicio = ?, horario_fim = ? WHERE id = ?")
              .run(e.turma_id, e.disciplina_id, e.horario_inicio, e.horario_fim, existing.id);
          }
        } else if (e.turma_id && e.disciplina_id) {
          db.prepare("INSERT INTO horario_professor (dia_semana, horario_inicio, horario_fim, turma_id, disciplina_id, professor_id, aula_numero) VALUES (?, ?, ?, ?, ?, ?, ?)")
            .run(e.dia_semana, e.horario_inicio, e.horario_fim, e.turma_id, e.disciplina_id, e.professor_id, e.aula_numero);
        }
      }
    });
    save();
    res.json({ success: true });
  });

  app.post("/api/horario/reset", (req, res) => {
    const { professorId } = req.body;
    if (professorId && professorId !== 'all') {
      db.prepare("DELETE FROM horario_professor WHERE professor_id = ?").run(professorId);
    } else {
      db.prepare("DELETE FROM horario_professor").run();
    }
    res.json({ success: true });
  });

  // Tarefas
  app.get("/api/tarefas", (req, res) => {
    res.json(db.prepare("SELECT * FROM tarefas_casa").all());
  });
  app.post("/api/tarefas", (req, res) => {
    const { horario_id, data, descricao, corrigida } = req.body;
    const result = db.prepare("INSERT INTO tarefas_casa (horario_id, data, descricao, corrigida) VALUES (?, ?, ?, ?)")
      .run(horario_id, data, descricao, corrigida || 0);
    res.json({ id: result.lastInsertRowid, ...req.body });
  });
  app.put("/api/tarefas/:id", (req, res) => {
    const { data, descricao, corrigida } = req.body;
    db.prepare("UPDATE tarefas_casa SET data = ?, descricao = ?, corrigida = ? WHERE id = ?")
      .run(data, descricao, corrigida || 0, req.params.id);
    res.json({ success: true });
  });
  app.delete("/api/tarefas/:id", (req, res) => {
    db.prepare("DELETE FROM tarefas_casa WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Limites de Ocorrências
  app.get("/api/limites-ocorrencias", (req, res) => {
    res.json(db.prepare("SELECT * FROM limites_ocorrencias").all());
  });

  app.post("/api/limites-ocorrencias", (req, res) => {
    const { tipo, limite, turmas_ids } = req.body;
    const t_ids = typeof turmas_ids === 'string' ? turmas_ids : JSON.stringify(turmas_ids || []);
    const result = db.prepare("INSERT INTO limites_ocorrencias (tipo, limite, turmas_ids) VALUES (?, ?, ?)")
      .run(tipo, limite, t_ids);
    res.json({ id: result.lastInsertRowid, tipo, limite, turmas_ids: t_ids });
  });

  app.put("/api/limites-ocorrencias/:id", (req, res) => {
    const { tipo, limite, turmas_ids } = req.body;
    const t_ids = typeof turmas_ids === 'string' ? turmas_ids : JSON.stringify(turmas_ids || []);
    db.prepare("UPDATE limites_ocorrencias SET limite = ?, turmas_ids = ? WHERE id = ?")
      .run(limite, t_ids, req.params.id);
    res.json({ success: true });
  });

  // Ações de Coordenação
  app.get("/api/acoes-coordenacao", (req, res) => {
    res.json(db.prepare("SELECT * FROM acoes_coordenacao").all());
  });

  app.post("/api/acoes-coordenacao", (req, res) => {
    const { aluno_id, tipo, descricao, data } = req.body;
    const result = db.prepare("INSERT INTO acoes_coordenacao (aluno_id, tipo, descricao, data) VALUES (?, ?, ?, ?)")
      .run(aluno_id, tipo, descricao, data);
    res.json({ id: result.lastInsertRowid, ...req.body });
  });

  app.put("/api/acoes-coordenacao/:id", (req, res) => {
    const { resolvido } = req.body;
    db.prepare("UPDATE acoes_coordenacao SET resolvido = ? WHERE id = ?")
      .run(resolvido, req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/acoes-coordenacao/:id", (req, res) => {
    db.prepare("DELETE FROM acoes_coordenacao WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.post("/api/acoes-coordenacao/manual", (req, res) => {
    const { aluno_id, tipo, descricao, data, texto_original } = req.body;
    const result = db.prepare("INSERT INTO acoes_coordenacao (aluno_id, tipo, descricao, data, texto_original) VALUES (?, ?, ?, ?, ?)")
      .run(aluno_id, tipo, descricao, data, texto_original);
    res.json({ id: result.lastInsertRowid, ...req.body });
  });

  app.put("/api/acoes-coordenacao/:id/resolve", (req, res) => {
    const { data_resolvido, resolucao_coordenacao } = req.body;
    db.prepare("UPDATE acoes_coordenacao SET resolvido = 1, data_resolvido = ?, resolucao_coordenacao = ? WHERE id = ?")
      .run(data_resolvido, resolucao_coordenacao, req.params.id);
    res.json({ success: true });
  });

  app.put("/api/acoes-coordenacao/:id/reopen", (req, res) => {
    db.prepare("UPDATE acoes_coordenacao SET resolvido = 0, data_resolvido = NULL WHERE id = ?")
      .run(req.params.id);
    res.json({ success: true });
  });

  // Modelos de Escrita
  app.get("/api/modelos-escrita", (req, res) => {
    res.json(db.prepare("SELECT * FROM modelos_escrita").all());
  });

  app.post("/api/modelos-escrita", (req, res) => {
    const { titulo, texto } = req.body;
    const result = db.prepare("INSERT INTO modelos_escrita (titulo, texto) VALUES (?, ?)")
      .run(titulo, texto);
    res.json({ id: result.lastInsertRowid, titulo, texto });
  });

  app.delete("/api/modelos-escrita/:id", (req, res) => {
    db.prepare("DELETE FROM modelos_escrita WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Projetos
  app.get("/api/projetos", (req, res) => {
    res.json(db.prepare("SELECT * FROM projetos").all());
  });
  app.post("/api/projetos", (req, res) => {
    const { nome, descricao, data_inicio, data_termino, professor_responsavel } = req.body;
    const result = db.prepare("INSERT INTO projetos (nome, descricao, data_inicio, data_termino, professor_responsavel) VALUES (?, ?, ?, ?, ?)")
      .run(nome, descricao, data_inicio, data_termino, professor_responsavel);
    res.json({ id: result.lastInsertRowid, ...req.body });
  });
  app.delete("/api/projetos/:id", (req, res) => {
    db.prepare("DELETE FROM projetos WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Projeto Turmas
  app.get("/api/projeto-turmas", (req, res) => {
    res.json(db.prepare("SELECT * FROM projeto_turmas").all());
  });
  app.post("/api/projeto-turmas", (req, res) => {
    const { projeto_id, nome, serie, turno } = req.body;
    const result = db.prepare("INSERT INTO projeto_turmas (projeto_id, nome, serie, turno) VALUES (?, ?, ?, ?)")
      .run(projeto_id, nome, serie, turno);
    res.json({ id: result.lastInsertRowid, ...req.body });
  });
  app.delete("/api/projeto-turmas/:id", (req, res) => {
    db.prepare("DELETE FROM projeto_turmas WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Projeto Alunos
  app.get("/api/projeto-alunos", (req, res) => {
    res.json(db.prepare("SELECT * FROM projeto_alunos").all());
  });
  app.post("/api/projeto-alunos", (req, res) => {
    const { projeto_id, projeto_turma_id, nome, identificador, pontos } = req.body;
    const result = db.prepare("INSERT INTO projeto_alunos (projeto_id, projeto_turma_id, nome, identificador, pontos) VALUES (?, ?, ?, ?, ?)")
      .run(projeto_id, projeto_turma_id, nome, identificador, pontos || 0);
    res.json({ id: result.lastInsertRowid, ...req.body });
  });
  app.put("/api/projeto-alunos/:id", requireAuth, (req, res) => {
    const { pontos, nota } = req.body;
    db.prepare("UPDATE projeto_alunos SET pontos = ?, nota = ? WHERE id = ?").run(pontos, nota, req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/projeto-alunos/:id", requireAuth, (req, res) => {
    db.prepare("DELETE FROM projeto_alunos WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Projeto Experiencias
  app.get("/api/projeto-experiencias", (req, res) => {
    const rows = db.prepare("SELECT * FROM projeto_experiencias").all() as any[];
    res.json(rows.map(r => ({ ...r, arquivos: JSON.parse(r.arquivos || '[]') })));
  });
  app.post("/api/projeto-experiencias", (req, res) => {
    const { projeto_id, data, descricao, observacoes, arquivos } = req.body;
    const result = db.prepare("INSERT INTO projeto_experiencias (projeto_id, data, descricao, observacoes, arquivos) VALUES (?, ?, ?, ?, ?)")
      .run(projeto_id, data, descricao, observacoes, JSON.stringify(arquivos || []));
    res.json({ id: result.lastInsertRowid, ...req.body });
  });
  app.put("/api/projeto-experiencias/:id", (req, res) => {
    const { data, descricao, observacoes, arquivos } = req.body;
    db.prepare("UPDATE projeto_experiencias SET data = ?, descricao = ?, observacoes = ?, arquivos = ? WHERE id = ?")
      .run(data, descricao, observacoes, JSON.stringify(arquivos || []), req.params.id);
    res.json({ success: true });
  });
  app.delete("/api/projeto-experiencias/:id", (req, res) => {
    db.prepare("DELETE FROM projeto_experiencias WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Alunos Especiais
  app.get("/api/alunos-especiais", (req, res) => {
    res.json(db.prepare("SELECT * FROM alunos_especiais").all());
  });
  app.post("/api/alunos-especiais", (req, res) => {
    const { aluno_id, turma_id, disciplina_id, plano_acompanhamento, evolucao } = req.body;
    const result = db.prepare("INSERT INTO alunos_especiais (aluno_id, turma_id, disciplina_id, plano_acompanhamento, evolucao) VALUES (?, ?, ?, ?, ?)")
      .run(aluno_id, turma_id, disciplina_id, plano_acompanhamento, evolucao);
    res.json({ id: result.lastInsertRowid, ...req.body });
  });
  app.put("/api/alunos-especiais/:id", (req, res) => {
    const { plano_acompanhamento, evolucao } = req.body;
    db.prepare("UPDATE alunos_especiais SET plano_acompanhamento = ?, evolucao = ? WHERE id = ?")
      .run(plano_acompanhamento, evolucao, req.params.id);
    res.json({ success: true });
  });
  app.delete("/api/alunos-especiais/:id", (req, res) => {
    db.prepare("DELETE FROM alunos_especiais WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Eventos Institucionais
  app.get("/api/eventos-institucionais", (req, res) => {
    res.json(db.prepare("SELECT * FROM eventos_institucionais ORDER BY data ASC").all());
  });
  app.post("/api/eventos-institucionais", (req, res) => {
    const { titulo, descricao, data, tipo } = req.body;
    const result = db.prepare("INSERT INTO eventos_institucionais (titulo, descricao, data, tipo) VALUES (?, ?, ?, ?)")
      .run(titulo, descricao, data, tipo);
    res.json({ id: result.lastInsertRowid, ...req.body });
  });
  app.delete("/api/eventos-institucionais/:id", (req, res) => {
    db.prepare("DELETE FROM eventos_institucionais WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Eventos Pessoais
  app.get("/api/eventos-pessoais", (req, res) => {
    const { professor_id } = req.query;
    if (professor_id) {
      res.json(db.prepare("SELECT * FROM eventos_pessoais WHERE professor_id = ? ORDER BY data ASC").all(professor_id));
    } else {
      res.json(db.prepare("SELECT * FROM eventos_pessoais ORDER BY data ASC").all());
    }
  });
  app.post("/api/eventos-pessoais", (req, res) => {
    const { professor_id, titulo, descricao, data } = req.body;
    const result = db.prepare("INSERT INTO eventos_pessoais (professor_id, titulo, descricao, data) VALUES (?, ?, ?, ?)")
      .run(professor_id, titulo, descricao, data);
    res.json({ id: result.lastInsertRowid, ...req.body });
  });
  app.delete("/api/eventos-pessoais/:id", (req, res) => {
    db.prepare("DELETE FROM eventos_pessoais WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });
  
  // Projeto Atividades
  app.get("/api/projeto-atividades", (req, res) => {
    res.json(db.prepare("SELECT * FROM projeto_atividades ORDER BY data_execucao ASC").all());
  });
  app.post("/api/projeto-atividades", (req, res) => {
    const { projeto_id, titulo, descricao, data_execucao } = req.body;
    const result = db.prepare("INSERT INTO projeto_atividades (projeto_id, titulo, descricao, data_execucao) VALUES (?, ?, ?, ?)")
      .run(projeto_id, titulo, descricao, data_execucao);
    res.json({ id: result.lastInsertRowid, ...req.body });
  });
  app.delete("/api/projeto-atividades/:id", (req, res) => {
    db.prepare("DELETE FROM projeto_atividades WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Automatic Bonus Trigger
  app.post("/api/trigger-bonus", (req, res) => {
    const { startDate, endDate, modeloId, disciplinaId, unidadeId, maxNegativas, disciplineIdsToCount } = req.body;
    const modelo = db.prepare("SELECT * FROM modelos_ocorrencia WHERE id = ?").get(modeloId) as any;
    if (!modelo) return res.status(400).json({ error: "Modelo não encontrado" });

    const alunosList = db.prepare("SELECT * FROM alunos").all() as any[];
    const results = [];

    const discIds = Array.isArray(disciplineIdsToCount) ? disciplineIdsToCount : [];

    for (const aluno of alunosList) {
      // Check for negative occurrences in period
      let query = "SELECT count(*) as count FROM ocorrencias WHERE aluno_id = ? AND tipo = -1 AND data >= ? AND data <= ?";
      const params: any[] = [aluno.id, startDate, endDate];

      if (discIds.length > 0) {
        query += ` AND disciplina_id IN (${discIds.join(',')})`;
      }
      
      if (unidadeId) {
        query += " AND unidade_id = ?";
        params.push(unidadeId);
      }

      const negCount = db.prepare(query).get(...params) as { count: number };
      
      if (negCount.count <= (maxNegativas || 0)) {
        // Award bonus
        const result = db.prepare("INSERT INTO ocorrencias (aluno_id, disciplina_id, tipo, descricao, pontos, data, unidade_id) VALUES (?, ?, ?, ?, ?, ?, ?)")
          .run(aluno.id, disciplinaId, modelo.tipo, `BÔNUS: ${modelo.descricao}`, modelo.pontos, endDate, unidadeId);
        
        // Update points
        const newPoints = aluno.pontos + (modelo.tipo * modelo.pontos);
        db.prepare("UPDATE alunos SET pontos = ? WHERE id = ?").run(newPoints, aluno.id);
        results.push(aluno.nome);
      }
    }

    res.json({ success: true, awardedTo: results });
  });

  // Reset Parcial
  app.post("/api/reset-parcial", requireRole('coordenador'), (req, res) => {
    const { ocorrencias, disciplinas, professores, turmas } = req.body;
    
    try {
      const reset = db.transaction(() => {
        if (ocorrencias) {
          db.prepare("DELETE FROM ocorrencias").run();
          db.prepare("UPDATE alunos SET pontos = 0").run();
        }
        if (disciplinas) {
          db.prepare("DELETE FROM disciplinas").run();
        }
        if (professores) {
          db.prepare("DELETE FROM professores").run();
          db.prepare("DELETE FROM usuarios WHERE role = 'professor'").run();
        }
        if (turmas) {
          db.prepare("DELETE FROM turmas").run();
        }
      });

      reset();
      res.json({ success: true });
    } catch (err: any) {
      console.error("Reset failed", err);
      res.status(500).json({ error: "Erro ao resetar dados: " + err.message });
    }
  });

  // Bulk Import (for Restore)
  app.post("/api/restore", (req, res) => {
    const { 
      turmas = [], 
      disciplinas = [], 
      professores = [],
      alunos = [], 
      ocorrencias = [], 
      modelos = [], 
      config = {},
      musicas = [],
      horarios = [],
      tarefas = [],
      projetos = [],
      projeto_turmas = [],
      projeto_alunos = [],
      projeto_experiencias = [],
      alunos_especiais = [],
      eventos_institucionais = [],
      eventos_pessoais = [],
      projeto_atividades = []
    } = req.body;
    
    // Transactional restore
    const restore = db.transaction(() => {
      db.prepare("DELETE FROM turmas").run();
      db.prepare("DELETE FROM disciplinas").run();
      db.prepare("DELETE FROM professores").run();
      db.prepare("DELETE FROM alunos").run();
      db.prepare("DELETE FROM ocorrencias").run();
      db.prepare("DELETE FROM modelos_ocorrencia").run();
      db.prepare("DELETE FROM configuracoes").run();
      db.prepare("DELETE FROM musicas").run();
      db.prepare("DELETE FROM horario_professor").run();
      db.prepare("DELETE FROM tarefas_casa").run();
      db.prepare("DELETE FROM limites_ocorrencias").run();
      db.prepare("DELETE FROM acoes_coordenacao").run();
      db.prepare("DELETE FROM projetos").run();
      db.prepare("DELETE FROM projeto_turmas").run();
      db.prepare("DELETE FROM projeto_alunos").run();
      db.prepare("DELETE FROM projeto_experiencias").run();
      db.prepare("DELETE FROM alunos_especiais").run();
      db.prepare("DELETE FROM eventos_institucionais").run();
      db.prepare("DELETE FROM eventos_pessoais").run();
      db.prepare("DELETE FROM projeto_atividades").run();

      for (const t of turmas) {
        const id = t.id ?? t.turmaId;
        db.prepare("INSERT INTO turmas (id, nome) VALUES (?, ?)").run(id, t.nome);
      }
      
      for (const d of disciplinas) {
        const id = d.id ?? d.disciplinaId;
        db.prepare("INSERT INTO disciplinas (id, nome) VALUES (?, ?)").run(id, d.nome);
      }

      for (const p of professores) {
        const id = p.id ?? p.professorId;
        db.prepare("INSERT INTO professores (id, nome) VALUES (?, ?)").run(id, p.nome);
      }
      
      for (const a of alunos) {
        const id = a.id ?? a.alunoId ?? a.ID;
        const nome = a.nome ?? a.name ?? a.Nome ?? "Sem Nome";
        const avatar = a.avatar ?? a.Avatar ?? a.foto ?? a.photo ?? nome;
        const turmaId = a.turma_id ?? a.turmaId ?? a.TurmaId ?? 0;
        const pontos = a.pontos ?? a.pontuacao ?? a.totalPontos ?? a.Points ?? 0;
        const dataNascimento = a.data_nascimento || a.dataNascimento || a.nascimento || a.birthDate || null;
        db.prepare("INSERT INTO alunos (id, nome, avatar, turma_id, pontos, data_nascimento) VALUES (?, ?, ?, ?, ?, ?)")
          .run(id, nome, avatar, turmaId, pontos, dataNascimento);
      }
      
      for (const o of ocorrencias) {
        const id = o.id ?? o.ocorrenciaId ?? o.registroId ?? o.ID;
        const alunoId = o.aluno_id ?? o.alunoId ?? o.AlunoId;
        const disciplinaId = o.disciplina_id ?? o.disciplinaId ?? o.DisciplinaId;
        const unidadeId = o.unidade_id ?? o.unidadeId ?? o.UnidadeId ?? 1;
        const tipo = o.tipo ?? o.Tipo ?? (o.pontos >= 0 ? 1 : -1);
        const descricao = o.descricao ?? o.description ?? o.Descricao ?? "";
        const pontos = o.pontos ?? o.Points ?? 1;
        const data = o.data ?? o.Date ?? new Date().toISOString().split('T')[0];
        db.prepare("INSERT INTO ocorrencias (id, aluno_id, disciplina_id, tipo, descricao, pontos, data, unidade_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
          .run(id, alunoId, disciplinaId, tipo, descricao, pontos, data, unidadeId);
      }
      
      for (const m of modelos) {
        const id = m.id ?? m.modeloId;
        db.prepare("INSERT INTO modelos_ocorrencia (id, tipo, descricao, pontos) VALUES (?, ?, ?, ?)")
          .run(id, m.tipo, m.descricao, m.pontos);
      }
      
      // Resilient config restore with camelCase support
      const c = config as any;
      db.prepare(`
        INSERT INTO configuracoes (
          id, pergunta_seguranca, resposta_seguranca, unidades, avatar_set,
          bonus_automatico_ativo, bonus_automatico_modelo_id, bonus_automatico_semanal,
          bonus_max_negativas, bonus_disciplinas_ids, bonus_datas_desativadas, unidade_ativa_id,
          contagem_por_unidade, unidade_inicio, unidade_fim
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        c.id || 1,
        c.pergunta_seguranca ?? c.perguntaSeguranca ?? "Qual o nome da sua primeira escola?",
        c.resposta_seguranca ?? c.respostaSeguranca ?? "Escola",
        JSON.stringify(c.unidades || [
          { id: 1, nome: "1ª Unidade", inicio: "2024-02-01", fim: "2024-04-30" },
          { id: 2, nome: "2ª Unidade", inicio: "2024-05-01", fim: "2024-07-31" },
          { id: 3, nome: "3ª Unidade", inicio: "2024-08-01", fim: "2024-09-30" },
          { id: 4, nome: "4ª Unidade", inicio: "2024-10-01", fim: "2024-12-31" }
        ]),
        c.avatar_set ?? c.avatarSet ?? 'fun-emoji',
        c.bonus_automatico_ativo ?? c.bonusAutomaticoAtivo ?? 1,
        c.bonus_automatico_modelo_id ?? c.bonusAutomaticoModeloId ?? null,
        c.bonus_automatico_semanal ?? c.bonusAutomaticoSemanal ?? 1,
        c.bonus_max_negativas ?? c.bonusMaxNegativas ?? 0,
        c.bonus_disciplinas_ids ?? c.bonusDisciplinasIds ?? '[]',
        c.bonus_datas_desativadas ?? c.bonusDatasDesativadas ?? '[]',
        c.unidade_ativa_id ?? c.unidadeAtivaId ?? 1,
        c.contagem_por_unidade ?? c.contagemPorUnidade ?? 0,
        c.unidade_inicio ?? c.unidadeInicio ?? null,
        c.unidade_fim ?? c.unidadeFim ?? null
      );

      for (const m of musicas) {
        db.prepare("INSERT INTO musicas (id, nome, url) VALUES (?, ?, ?)").run(m.id, m.nome, m.url);
      }
      
      for (const h of horarios) {
        const turmaId = h.turma_id ?? h.turmaId;
        const disciplinaId = h.disciplina_id ?? h.disciplinaId;
        const professorId = h.professor_id ?? h.professorId;
        const aulaNumero = h.aula_numero ?? h.aulaNumero;
        db.prepare("INSERT INTO horario_professor (id, dia_semana, horario_inicio, horario_fim, turma_id, disciplina_id, professor_id, aula_numero) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
          .run(h.id, h.dia_semana, h.horario_inicio, h.horario_fim, turmaId, disciplinaId, professorId, aulaNumero);
      }
      
      for (const t of tarefas) {
        const horarioId = t.horario_id ?? t.horarioId;
        db.prepare("INSERT INTO tarefas_casa (id, horario_id, data, descricao, corrigida) VALUES (?, ?, ?, ?, ?)")
          .run(t.id, horarioId, t.data, t.descricao, t.corrigida || 0);
      }

      for (const p of projetos) {
        db.prepare("INSERT INTO projetos (id, nome, descricao, data_inicio, data_termino, professor_responsavel) VALUES (?, ?, ?, ?, ?, ?)")
          .run(p.id, p.nome, p.descricao, p.data_inicio, p.data_termino, p.professor_responsavel);
      }

      for (const pt of projeto_turmas) {
        db.prepare("INSERT INTO projeto_turmas (id, projeto_id, nome, serie, turno) VALUES (?, ?, ?, ?, ?)")
          .run(pt.id, pt.projeto_id, pt.nome, pt.serie, pt.turno);
      }

      for (const pa of projeto_alunos) {
        db.prepare("INSERT INTO projeto_alunos (id, projeto_id, projeto_turma_id, nome, identificador, pontos) VALUES (?, ?, ?, ?, ?, ?)")
          .run(pa.id, pa.projeto_id, pa.projeto_turma_id, pa.nome, pa.identificador, pa.pontos || 0);
      }

      for (const pe of projeto_experiencias) {
        db.prepare("INSERT INTO projeto_experiencias (id, projeto_id, data, descricao, observacoes, arquivos) VALUES (?, ?, ?, ?, ?, ?)")
          .run(pe.id, pe.projeto_id, pe.data, pe.descricao, pe.observacoes, JSON.stringify(pe.arquivos || []));
      }

      for (const ae of alunos_especiais) {
        db.prepare("INSERT INTO alunos_especiais (id, aluno_id, turma_id, disciplina_id, plano_acompanhamento, evolucao) VALUES (?, ?, ?, ?, ?, ?)")
          .run(ae.id, ae.aluno_id, ae.turma_id, ae.disciplina_id, ae.plano_acompanhamento, ae.evolucao);
      }

      for (const ei of eventos_institucionais) {
        db.prepare("INSERT INTO eventos_institucionais (id, titulo, descricao, data, tipo) VALUES (?, ?, ?, ?, ?)")
          .run(ei.id, ei.titulo, ei.descricao, ei.data, ei.tipo);
      }

      for (const ep of eventos_pessoais) {
        db.prepare("INSERT INTO eventos_pessoais (id, professor_id, titulo, descricao, data) VALUES (?, ?, ?, ?, ?)")
          .run(ep.id, ep.professor_id, ep.titulo, ep.descricao, ep.data);
      }

      for (const pa of projeto_atividades) {
        db.prepare("INSERT INTO projeto_atividades (id, projeto_id, titulo, descricao, data_execucao) VALUES (?, ?, ?, ?, ?)")
          .run(pa.id, pa.projeto_id, pa.titulo, pa.descricao, pa.data_execucao);
      }
    });
    
    restore();
    res.json({ success: true });
  });

  // Reset All
  app.post("/api/reset-all", (req, res) => {
    const reset = db.transaction(() => {
      db.prepare("DELETE FROM turmas").run();
      db.prepare("DELETE FROM disciplinas").run();
      db.prepare("DELETE FROM alunos").run();
      db.prepare("DELETE FROM ocorrencias").run();
      db.prepare("DELETE FROM modelos_ocorrencia").run();
      db.prepare("DELETE FROM configuracoes").run();
      db.prepare("DELETE FROM musicas").run();
      db.prepare("DELETE FROM horario_professor").run();
      db.prepare("DELETE FROM tarefas_casa").run();
      db.prepare("DELETE FROM limites_ocorrencias").run();
      db.prepare("DELETE FROM acoes_coordenacao").run();
      db.prepare("DELETE FROM projetos").run();
      db.prepare("DELETE FROM projeto_turmas").run();
      db.prepare("DELETE FROM projeto_alunos").run();
      db.prepare("DELETE FROM projeto_experiencias").run();
      db.prepare("DELETE FROM alunos_especiais").run();
      db.prepare("DELETE FROM eventos_institucionais").run();
      db.prepare("DELETE FROM eventos_pessoais").run();

      // Re-seed basic config
      db.prepare(`
        INSERT INTO configuracoes (
          pergunta_seguranca, 
          resposta_seguranca, 
          unidades, 
          avatar_set,
          bonus_automatico_ativo,
          bonus_automatico_semanal,
          unidade_ativa_id,
          bonus_max_negativas,
          contagem_por_unidade
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run("Qual o nome da sua primeira escola?", "Escola", JSON.stringify([
          { id: 1, nome: "1ª Unidade", inicio: "2024-02-01", fim: "2024-04-30" },
          { id: 2, nome: "2ª Unidade", inicio: "2024-05-01", fim: "2024-07-31" },
          { id: 3, nome: "3ª Unidade", inicio: "2024-08-01", fim: "2024-09-30" },
          { id: 4, nome: "4ª Unidade", inicio: "2024-10-01", fim: "2024-12-31" }
        ]), 'fun-emoji', 1, 1, 1, 0, 0);
    });
    
    reset();
    res.json({ success: true });
  });

  // Vite middleware for development
  // Responsaveis
  app.get("/api/responsaveis", requireRole('coordenador'), (req, res) => {
    res.json(db.prepare("SELECT * FROM responsaveis ORDER BY nome").all());
  });

  app.post("/api/responsaveis", requireRole('coordenador'), (req, res) => {
    const { nome, login, senha, aluno_id } = req.body;
    const save = db.transaction(() => {
      const hashedSenha = bcrypt.hashSync(senha, 10);
      const result = db.prepare("INSERT INTO responsaveis (nome, login, senha, aluno_id) VALUES (?, ?, ?, ?)")
        .run(nome, login, hashedSenha, aluno_id);
      
      db.prepare("INSERT INTO usuarios (nome, login, senha, role, aluno_id) VALUES (?, ?, ?, ?, ?)")
        .run(nome, login, hashedSenha, 'responsavel', aluno_id);
      
      return result.lastInsertRowid;
    });
    const id = save();
    res.json({ id, nome, login, aluno_id });
  });

  app.delete("/api/responsaveis/:id", requireRole('coordenador'), (req, res) => {
    const { id } = req.params;
    const resp = db.prepare("SELECT login FROM responsaveis WHERE id = ?").get(id) as any;
    if (resp) {
      db.prepare("DELETE FROM usuarios WHERE login = ? AND role = 'responsavel'").run(resp.login);
    }
    db.prepare("DELETE FROM responsaveis WHERE id = ?").run(id);
    res.json({ success: true });
  });

  // Notas
  app.get("/api/notas", requireAuth, (req: any, res) => {
    let rows;
    if (req.session.userRole === 'responsavel') {
      rows = db.prepare("SELECT * FROM notas WHERE aluno_id = ?").all(req.session.alunoId);
    } else if (req.session.userRole === 'professor') {
      rows = db.prepare(`
        SELECT n.* FROM notas n
        JOIN alunos a ON n.aluno_id = a.id
        JOIN turmas t ON a.turma_id = t.id
        JOIN horario_professor h ON h.turma_id = t.id
        WHERE h.professor_id = ?
      `).all(req.session.professorId);
    } else {
      rows = db.prepare("SELECT * FROM notas").all();
    }
    res.json(rows);
  });

  app.post("/api/notas", requireAuth, (req, res) => {
    const { aluno_id, disciplina_id, projeto_id, valor, data, descricao } = req.body;
    const result = db.prepare("INSERT INTO notas (aluno_id, disciplina_id, projeto_id, valor, data, descricao) VALUES (?, ?, ?, ?, ?, ?)")
      .run(aluno_id, disciplina_id, projeto_id, valor, data, descricao);
    
    // Auto notification
    const aluno = db.prepare("SELECT nome FROM alunos WHERE id = ?").get(aluno_id) as any;
    const disciplina = db.prepare("SELECT nome FROM disciplinas WHERE id = ?").get(disciplina_id) as any;
    db.prepare("INSERT INTO notificacoes (tipo, data, conteudo, aluno_id) VALUES (?, ?, ?, ?)")
      .run('nota', data, `Nova nota lançada para ${aluno?.nome} em ${disciplina?.nome}: ${valor}`, aluno_id);

    res.json({ id: result.lastInsertRowid, ...req.body });
  });

  app.delete("/api/notas/:id", requireAuth, (req, res) => {
    db.prepare("DELETE FROM notas WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Notificacoes
  app.get("/api/notificacoes", requireAuth, (req: any, res) => {
    let rows;
    if (req.session.userRole === 'responsavel') {
      rows = db.prepare("SELECT * FROM notificacoes WHERE aluno_id = ? ORDER BY data DESC").all(req.session.alunoId);
    } else {
      rows = db.prepare("SELECT * FROM notificacoes ORDER BY data DESC").all();
    }
    res.json(rows);
  });

  app.post("/api/notificacoes", requireAuth, (req, res) => {
    const { tipo, data, conteudo, aluno_id, responsavel_id } = req.body;
    const result = db.prepare("INSERT INTO notificacoes (tipo, data, conteudo, aluno_id, responsavel_id) VALUES (?, ?, ?, ?, ?)")
      .run(tipo, data, conteudo, aluno_id, responsavel_id);
    res.json({ id: result.lastInsertRowid, ...req.body });
  });

  app.put("/api/notificacoes/:id/read", requireAuth, (req, res) => {
    db.prepare("UPDATE notificacoes SET lida = 1 WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Teacher Schedule
  app.get("/api/teacher_schedule", (req, res) => {
    const schedule = db.prepare("SELECT * FROM teacher_schedule").all();
    res.json(schedule);
  });

  app.post("/api/teacher_schedule", (req, res) => {
    const { teacher_id, day_of_week, class_time, class_group, subject } = req.body;
    const result = db.prepare(
      "INSERT INTO teacher_schedule (teacher_id, day_of_week, class_time, class_group, subject) VALUES (?, ?, ?, ?, ?)"
    ).run(teacher_id, day_of_week, class_time, class_group, subject);
    res.json({ id: result.lastInsertRowid });
  });

  app.delete("/api/teacher_schedule/:id", (req, res) => {
    db.prepare("DELETE FROM teacher_schedule WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Homework
  app.get("/api/homework", (req, res) => {
    const homework = db.prepare("SELECT * FROM homework").all();
    res.json(homework);
  });

  app.post("/api/homework", (req, res) => {
    const { teacher_id, class_group, subject, description, date_created } = req.body;
    const result = db.prepare(
      "INSERT INTO homework (teacher_id, class_group, subject, description, date_created) VALUES (?, ?, ?, ?, ?)"
    ).run(teacher_id, class_group, subject, description, date_created);
    res.json({ id: result.lastInsertRowid });
  });

  app.delete("/api/homework/:id", (req, res) => {
    db.prepare("DELETE FROM homework WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Reset All
  app.post("/api/reset-all", requireRole('coordenador'), (req, res) => {
    try {
      db.transaction(() => {
        db.prepare("DELETE FROM ocorrencias").run();
        db.prepare("DELETE FROM alunos").run();
        db.prepare("DELETE FROM turmas").run();
        db.prepare("DELETE FROM disciplinas").run();
        db.prepare("DELETE FROM professores").run();
        db.prepare("DELETE FROM usuarios WHERE role = 'professor'").run();
        db.prepare("DELETE FROM notas").run();
        db.prepare("DELETE FROM notificacoes").run();
        db.prepare("DELETE FROM teacher_schedule").run();
        db.prepare("DELETE FROM homework").run();
        db.prepare("DELETE FROM projetos").run();
        db.prepare("DELETE FROM modelos_ocorrencia").run();
      })();
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
