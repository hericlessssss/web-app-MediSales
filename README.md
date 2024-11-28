# Controle de Visitação Médica

Um sistema moderno e eficiente para gerenciamento de visitas médicas, desenvolvido com React, Supabase e TailwindCSS.

## Intuito da Aplicação

Este sistema foi desenvolvido para facilitar o controle e gerenciamento de visitas médicas, permitindo:
- Gerenciamento de médicos e suas informações
- Agendamento de visitas
- Sistema de avisos e notificações
- Comentários e feedback sobre visitas
- Interface responsiva e intuitiva

## Tecnologias Utilizadas

- Frontend: React.js, TailwindCSS
- Backend: Supabase
- Autenticação: Supabase Auth
- Estado: Zustand
- Notificações: React Hot Toast
- Roteamento: React Router DOM

## Configurações Iniciais

### 1. Configuração do Supabase

1. Crie uma conta no [Supabase](https://supabase.com)
2. Crie um novo projeto
3. No SQL Editor, execute o seguinte script para criar as tabelas necessárias:

\`\`\`sql
-- Criar tabela de médicos
CREATE TABLE medicos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  neighborhood TEXT,
  phone TEXT,
  crm TEXT UNIQUE NOT NULL,
  specialty TEXT,
  products JSONB,
  schedule JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Criar tabela de eventos
CREATE TABLE eventos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  doctor_id UUID REFERENCES medicos(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Criar tabela de comentários
CREATE TABLE medicoscomentarios (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  doctor_id UUID REFERENCES medicos(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Criar tabela de avisos
CREATE TABLE muralavisos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  attachments JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);
\`\`\`

### 2. Configuração do Ambiente

1. Clone o repositório:
\`\`\`bash
git clone <REPO_URL>
cd medical-visitation-control
\`\`\`

2. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

3. Copie o arquivo .env.example para .env:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Configure as variáveis de ambiente no arquivo .env com suas credenciais do Supabase:
\`\`\`
VITE_SUPABASE_URL=sua-url-do-supabase
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-do-supabase
\`\`\`

### 3. Executando Localmente

\`\`\`bash
npm run dev
\`\`\`

O aplicativo estará disponível em http://localhost:5173

### 4. Publicação no Netlify

1. Faça login no [Netlify](https://www.netlify.com)
2. Conecte seu repositório
3. Configure as variáveis de ambiente:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
4. Deploy!

## Funcionalidades

- 🔐 Autenticação segura
- 👨‍⚕️ Gestão de médicos
- 📅 Agendamento de visitas
- 📢 Sistema de avisos
- 💬 Comentários e feedback
- 🌓 Tema claro/escuro
- 📱 Design responsivo

## Contribuindo

1. Fork o projeto
2. Crie sua Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit suas mudanças (\`git commit -m 'Add some AmazingFeature'\`)
4. Push para a Branch (\`git push origin feature/AmazingFeature\`)
5. Abra um Pull Request

## Licença

Distribuído sob a licença MIT. Veja \`LICENSE\` para mais informações.