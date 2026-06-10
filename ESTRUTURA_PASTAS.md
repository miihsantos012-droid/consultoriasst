# Estrutura de Pasta - SST Consultoria App

Este documento explica como organizar os arquivos do seu projeto React Native.

## Diretórios Principais

### `/src/components`
Componentes React Native reutilizáveis e presentacionais.

```
components/
├── FormularioPontoMedicao.tsx    # Form para coleta de um ponto de medição
├── CardConformidade.tsx          # Exibe resultado de conformidade
├── ListaPontosMedicao.tsx         # Lista de pontos coletados
├── HeaderAvaliacao.tsx           # Header com dados do colaborador
├── PickerEquipamento.tsx         # Seletor de equipamento
└── AlertaConformidade.tsx        # Alerta visual de conformidade
```

**Responsabilidades**: Layout, estilos, props, callbacks simples.

---

### `/src/screens`
Telas completas da aplicação (conectadas ao store).

```
screens/
├── HomeScreen.tsx                # Tela inicial com listagem
├── CriarAvaliacaoScreen.tsx      # Criar nova avaliação
├── ColetaDadosScreen.tsx         # Coleta de pontos em campo
├── RelatorioScreen.tsx           # Exibição de resultado
├── ConfiguracaoScreen.tsx        # Configurações
└── SincronizacaoScreen.tsx       # Status de sincronização
```

**Responsabilidades**: Orquestração, lógica de negócio, conexão com store.

---

### `/src/hooks`
Custom Hooks para lógica reutilizável.

```
hooks/
├── useForm.ts                    # Gerenciamento de formulário
├── useConformidade.ts            # Cálculos de conformidade
├── useAvaliacao.ts               # Acesso ao store de avaliações
├── useSincronizacao.ts           # Lógica de sync com Firebase
└── usePermissoes.ts              # Gerenciamento de permissões
```

**Responsabilidades**: Lógica independente de componentes, estado local.

---

### `/src/store`
Estado global com Zustand.

```
store/
├── avaliacaoStore.ts             # Store principal de avaliações
├── usuarioStore.ts               # Store de dados do usuário
├── sincronizacaoStore.ts         # Store de status de sync
└── index.ts                       # Exportações centralizadas
```

**Responsabilidades**: Estado global, ações, seletores.

---

### `/src/services`
Integração com APIs e bancos de dados.

```
services/
├── firebase/
│   ├── auth.ts                   # Autenticação
│   ├── database.ts               # Leitura/escrita de dados
│   └── storage.ts                # Armazenamento de arquivos
├── sqlite/
│   ├── database.ts               # Inicialização do SQLite
│   ├── avaliacoes.ts             # CRUD de avaliações
│   └── pontosMedicao.ts          # CRUD de pontos
└── api/
    ├── client.ts                 # Cliente Axios configurado
    └── endpoints.ts              # URLs e chamadas de API
```

**Responsabilidades**: Comunicação com backend, persistência.

---

### `/src/utils`
Funções utilitárias e helpers.

```
utils/
├── conformidade.ts               # Cálculos NHO-011
├── validation.ts                 # Validações de formulário
├── formatacao.ts                 # Formatação de dados
├── datas.ts                      # Manipulação de datas
└── file.ts                       # Operações com arquivos
```

**Responsabilidades**: Funções puras, sem estado, reutilizáveis.

---

### `/src/constants`
Constantes da aplicação.

```
constants/
├── nho-011.ts                    # Limites e categorias NHO-011
├── cores.ts                      # Paleta de cores
├── textos.ts                     # Strings/mensagens
└── config.ts                     # Configurações gerais
```

**Responsabilidades**: Valores imutáveis, configurações.

---

### `/src/types`
Definições de tipos TypeScript.

```
types/
├── index.ts                      # Tipos principais
├── api.ts                        # Tipos de requisições/respostas
└── componentes.ts                # Props de componentes
```

**Responsabilidades**: Interfaces e types, documentação via tipos.

---

### `/src/navigation`
Configuração de navegação (React Navigation).

```
navigation/
├── RootNavigator.tsx             # Stack principal
├── AuthNavigator.tsx             # Stack de autenticação
├── AvaliacaoNavigator.tsx        # Stack de avaliação
└── linking.ts                    # Deep linking
```

**Responsabilidades**: Estrutura de navegação, rotas.

---

## Estrutura Completa de Exemplo

```
consultoriasst/
│
├── src/
│   ├── App.tsx                    # Ponto de entrada
│   ├── index.tsx                  # Inicialização Expo
│   │
│   ├── components/
│   │   ├── FormularioPontoMedicao.tsx
│   │   ├── CardConformidade.tsx
│   │   ├── ListaPontosMedicao.tsx
│   │   ├── HeaderAvaliacao.tsx
│   │   ├── PickerEquipamento.tsx
│   │   ├── AlertaConformidade.tsx
│   │   └── index.ts               # Exportações centralizadas
│   │
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── CriarAvaliacaoScreen.tsx
│   │   ├── ColetaDadosScreen.tsx
│   │   ├── RelatorioScreen.tsx
│   │   ├── ConfiguracaoScreen.tsx
│   │   ├── SincronizacaoScreen.tsx
│   │   └── index.ts
│   │
│   ├── navigation/
│   │   ├── RootNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── AvaliacaoNavigator.tsx
│   │   ├── linking.ts
│   │   └── types.ts
│   │
│   ├── hooks/
│   │   ├── useForm.ts
│   │   ├── useConformidade.ts
│   │   ├── useAvaliacao.ts
│   │   ├── useSincronizacao.ts
│   │   ├── usePermissoes.ts
│   │   └── index.ts
│   │
│   ├── store/
│   │   ├── avaliacaoStore.ts
│   │   ├── usuarioStore.ts
│   │   ├── sincronizacaoStore.ts
│   │   └── index.ts
│   │
│   ├── services/
│   │   ├── firebase/
│   │   │   ├── auth.ts
│   │   │   ├── database.ts
│   │   │   ├── storage.ts
│   │   │   └── index.ts
│   │   ├── sqlite/
│   │   │   ├── database.ts
│   │   │   ├── avaliacoes.ts
│   │   │   ├── pontosMedicao.ts
│   │   │   └── index.ts
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── endpoints.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── utils/
│   │   ├── conformidade.ts
│   │   ├── validation.ts
│   │   ├── formatacao.ts
│   │   ├── datas.ts
│   │   ├── file.ts
│   │   └── index.ts
│   │
│   ├── constants/
│   │   ├── nho-011.ts
│   │   ├── cores.ts
│   │   ├── textos.ts
│   │   ├── config.ts
│   │   └── index.ts
│   │
│   └── types/
│       ├── index.ts
│       ├── api.ts
│       └── componentes.ts
│
├── .expo/                         # Configuração Expo
├── app.json                       # Configuração app Expo
├── tsconfig.json                  # Configuração TypeScript
├── package.json                   # Dependências
├── README.md                      # Documentação
└── .gitignore
```

## 🎯 Boas Práticas

### Arquivos index.ts
Use arquivos `index.ts` para centralizar exportações:

```typescript
// src/components/index.ts
export { FormularioPontoMedicao } from './FormularioPontoMedicao';
export { CardConformidade } from './CardConformidade';
export { ListaPontosMedicao } from './ListaPontosMedicao';

// Uso em outro arquivo
import { FormularioPontoMedicao, CardConformidade } from '@components';
```

### Importações com Aliases
Configure no `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@components/*": ["components/*"],
      "@screens/*": ["screens/*"],
      "@hooks/*": ["hooks/*"],
      "@utils/*": ["utils/*"],
      "@services/*": ["services/*"],
      "@constants/*": ["constants/*"],
      "@types/*": ["types/*"],
      "@store/*": ["store/*"]
    }
  }
}
```

Benefícios:
- Importações mais limpas
- Refatoração facilitada
- Évita `../../../../` em caminhos

### Componentes e Screens
- **Components**: Componentes "burros" sem lógica de estado
- **Screens**: Componentes "inteligentes" com lógica e navegação

### Hooks Customizados
Agrupe lógica relacionada em hooks:

```typescript
// useAvaliacao.ts
export function useAvaliacao() {
  const store = useAvaliacaoStore();
  
  const criarAvaliacao = useCallback((...) => {
    // lógica
  }, []);
  
  return { criarAvaliacao, ... };
}
```

## 📦 Organização por Feature (Alternativa)

Se o projeto crescer, considere organizar por feature:

```
src/
├── features/
│   ├── avaliacao/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── types.ts
│   ├── relatorio/
│   │   ├── components/
│   │   ├── screens/
│   │   └── ...
│   ├── auth/
│   │   ├── components/
│   │   ├── services/
│   │   └── ...
│   └── shared/
│       ├── components/
│       ├── hooks/
│       ├── utils/
│       └── types.ts
```

---

Este guia oferece uma estrutura escalável e profissional para seu projeto!
