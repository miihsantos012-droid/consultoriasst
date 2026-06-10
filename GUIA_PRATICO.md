/**
 * Guia Prático de Desenvolvimento
 * Primeiros passos para começar a codificar
 */

# 🚀 Guia Prático: Começando a Desenvolver

## 1️⃣ Estrutura Inicial (Concluída ✅)

Você já tem:
- ✅ Tipos TypeScript (`src/types/index.ts`)
- ✅ Constantes NHO-011 (`src/constants/nho-011.ts`)
- ✅ Lógica de Conformidade (`src/utils/conformidade.ts`)
- ✅ Validações (`src/utils/validation.ts`)
- ✅ Helpers (`src/utils/helpers.ts`)
- ✅ Store Zustand (`src/store/avaliacaoStore.ts`)
- ✅ Custom Hooks (`src/hooks/useForm.ts`, `src/hooks/useConformidade.ts`)
- ✅ Componentes (`FormularioPontoMedicao.tsx`, `CardConformidade.tsx`, `ListaPontosMedicao.tsx`)

## 2️⃣ Próximas Etapas

### Passo 1: Configure o App.tsx

```typescript
// src/App.tsx
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

// Importar sua primeira tela (vamos criar)
import { HomeScreen } from '@screens/HomeScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
```

### Passo 2: Crie sua Primeira Tela

```typescript
// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAvaliacaoStore } from '@store/avaliacaoStore';
import { Avaliacao } from '@types/index';
import { generateId } from '@utils/helpers';

export const HomeScreen = () => {
  const store = useAvaliacaoStore();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  const handleCriarAvaliacao = () => {
    const novaAvaliacao: Avaliacao = {
      id: generateId(),
      data_criacao: new Date().toISOString(),
      data_atualizacao: new Date().toISOString(),
      status: 'em_coleta',
      colaborador: {
        nome: '',
        funcao: '',
        setor: '',
      },
      dados_avaliacao: {
        fonte_geradora: '',
        jornada: '',
        tempo_exposicao_minutos: 0,
      },
      pontos_medicao: [],
      media_lux: 0,
      conformidade: {} as any,
      sincronizado: false,
      usuario_id: 'user123', // TODO: Obter do Firebase Auth
    };
    
    store.criarAvaliacao(novaAvaliacao);
    setMostrarFormulario(true);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>SST Consultoria</Text>
      <Text style={styles.subtitulo}>Gestão de Iluminância NHO-011</Text>
      
      <TouchableOpacity
        style={styles.botao}
        onPress={handleCriarAvaliacao}
      >
        <Text style={styles.textoBotao}>➕ Nova Avaliação</Text>
      </TouchableOpacity>
      
      {/* TODO: Adicionar lista de avaliações existentes */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginBottom: 32,
  },
  botao: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
```

### Passo 3: Crie uma Tela de Coleta

```typescript
// src/screens/ColetaDadosScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useAvaliacaoStore } from '@store/avaliacaoStore';
import { FormularioPontoMedicao } from '@components/FormularioPontoMedicao';
import { ListaPontosMedicao } from '@components/ListaPontosMedicao';
import { CardConformidade } from '@components/CardConformidade';
import { useConformidade } from '@hooks/useConformidade';
import { LIMITES_ILUMINANCIA } from '@constants/nho-011';
import { generateId } from '@utils/helpers';

export const ColetaDadosScreen = () => {
  const store = useAvaliacaoStore();
  const avaliacaoAtual = store.avaliacaoAtual;
  const [adicionandoPonto, setAdicionandoPonto] = React.useState(false);
  
  if (!avaliacaoAtual) {
    return (
      <View style={styles.container}>
        <Text>Nenhuma avaliação selecionada</Text>
      </View>
    );
  }
  
  const {
    media,
    desviaoPadrao,
    minimo,
    maximo,
    resultado,
  } = useConformidade(
    avaliacaoAtual.pontos_medicao,
    LIMITES_ILUMINANCIA.TRABALHO_GERAL
  );
  
  const handleAdicionarPonto = async (novoPonto: any) => {
    store.adicionarPontoMedicao({
      ...novoPonto,
      id: generateId(),
      avaliacao_id: avaliacaoAtual.id,
      timestamp: new Date().toISOString(),
    });
    setAdicionandoPonto(false);
  };
  
  return (
    <ScrollView style={styles.container}>
      {/* Mostrar Formulário ou Botão para Adicionar */}
      {adicionandoPonto ? (
        <FormularioPontoMedicao
          onSubmit={handleAdicionarPonto}
          equipamentos={[]} // TODO: Buscar equipamentos
          numeroSequencia={avaliacaoAtual.pontos_medicao.length + 1}
          onCancel={() => setAdicionandoPonto(false)}
        />
      ) : (
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => setAdicionandoPonto(true)}
        >
          <Text style={styles.textoBotao}>➕ Adicionar Ponto</Text>
        </TouchableOpacity>
      )}
      
      {/* Lista de Pontos */}
      <ListaPontosMedicao
        pontos={avaliacaoAtual.pontos_medicao}
        onRemover={(id) => store.removerPontoMedicao(id)}
      />
      
      {/* Resultado de Conformidade */}
      {resultado && avaliacaoAtual.pontos_medicao.length > 0 && (
        <CardConformidade
          resultado={resultado.conformidade}
          media={media}
          desviaoPadrao={desviaoPadrao}
          minimo={minimo}
          maximo={maximo}
          numeroPontos={avaliacaoAtual.pontos_medicao.length}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  botaoAdicionar: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
```

## 3️⃣ Funcionalidades Importantes para Implementar

### A. SQLite para Persistência Local
```typescript
// src/services/sqlite/database.ts
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('consultoriasst.db');

export async function inicializarBanco() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS avaliacoes (
          id TEXT PRIMARY KEY,
          usuario_id TEXT,
          data_criacao TEXT,
          data_atualizacao TEXT,
          status TEXT,
          colaborador TEXT,
          dados_avaliacao TEXT,
          media_lux REAL,
          conformidade TEXT,
          sincronizado INTEGER,
          json_completo TEXT
        );`,
        [],
        () => resolve(true),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

export async function salvarAvaliacao(avaliacao: Avaliacao) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT OR REPLACE INTO avaliacoes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          avaliacao.id,
          avaliacao.usuario_id,
          avaliacao.data_criacao,
          avaliacao.data_atualizacao,
          avaliacao.status,
          JSON.stringify(avaliacao.colaborador),
          JSON.stringify(avaliacao.dados_avaliacao),
          avaliacao.media_lux,
          JSON.stringify(avaliacao.conformidade),
          avaliacao.sincronizado ? 1 : 0,
          JSON.stringify(avaliacao),
        ],
        () => resolve(true),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}
```

### B. Hook para Avaliações
```typescript
// src/hooks/useAvaliacao.ts
import { useCallback } from 'react';
import { useAvaliacaoStore } from '@store/avaliacaoStore';
import { Avaliacao } from '@types/index';
import { salvarAvaliacao } from '@services/sqlite/database';

export function useAvaliacao() {
  const store = useAvaliacaoStore();
  
  const salvarLocalmente = useCallback(async () => {
    if (store.avaliacaoAtual) {
      await salvarAvaliacao(store.avaliacaoAtual);
    }
  }, [store.avaliacaoAtual]);
  
  const criarNovaAvaliacao = useCallback((dados: Partial<Avaliacao>) => {
    const novaAvaliacao: Avaliacao = {
      id: generateId(),
      data_criacao: new Date().toISOString(),
      data_atualizacao: new Date().toISOString(),
      status: 'em_coleta',
      sincronizado: false,
      usuario_id: 'user123',
      media_lux: 0,
      conformidade: {} as any,
      pontos_medicao: [],
      ...dados,
    } as Avaliacao;
    
    store.criarAvaliacao(novaAvaliacao);
    return novaAvaliacao;
  }, [store]);
  
  return {
    ...store,
    salvarLocalmente,
    criarNovaAvaliacao,
  };
}
```

## 4️⃣ Checklist de Implementação

- [ ] App.tsx funcionando com HomeScreen
- [ ] Tela de Coleta de Dados com Formulário
- [ ] SQLite configurado e funcionando
- [ ] Dados persistindo localmente
- [ ] Cálculos de conformidade exibindo corretamente
- [ ] Listagem de avaliações prévias
- [ ] Exportação de relatório em PDF
- [ ] Autenticação Firebase
- [ ] Sincronização com Backend
- [ ] Testes unitários
- [ ] Build para produção

## 5️⃣ Comandos Úteis

```bash
# Iniciar desenvolvimento
npm start

# Verificar tipos TypeScript
npx tsc --noEmit

# Testar (se configurado)
npm test

# Builds
npm run android
npm run ios
npm run web
```

## 6️⃣ Dicas Importantes

1. **Use TypeScript**: Aproveite a tipagem para evitar bugs
2. **Teste componentes isolados**: Use Storybook ou crie um arquivo de test
3. **Mantenha componentes pequenos**: Cada componente = uma responsabilidade
4. **Documente com comentários**: Especialmente em funções complexas
5. **Use console.log com cuidado**: Prefira ferramentas de debug em produção
6. **Validação de entrada**: Sempre valide dados de entrada
7. **Tratamento de erros**: Implemente try/catch apropriado
8. **Performance**: Otimize listas com memo e useMemo

## 📚 Estrutura de Pastas Recomendada

Você tem um arquivo completo em `ESTRUTURA_PASTAS.md` com orientações detalhadas.

## 📞 Próximas Perguntas?

Sinta-se livre para fazer mais perguntas sobre:
- Implementação de componentes específicos
- Configuração de navegação com React Navigation
- Sincronização com Firebase
- Testes e debugging
- Otimizações de performance
- Como conectar com backend

## 🎯 Resumo do que foi feito

### Arquivos Criados:

1. **Tipos e Interfaces** (`src/types/index.ts`)
   - Avaliacao, PontoMedicao, Equipamento
   - ConformidadeResultado, DadosColaborador

2. **Constantes NHO-011** (`src/constants/nho-011.ts`)
   - Limites de iluminância por categoria
   - Tolerâncias e funções de validação

3. **Lógica de Conformidade** (`src/utils/conformidade.ts`)
   - Cálculos: média, desvio padrão, uniformidade
   - Determinação de conformidade com norma

4. **Validações** (`src/utils/validation.ts`)
   - Validação de formulários
   - Sanitização de entrada

5. **Helpers** (`src/utils/helpers.ts`)
   - Funções auxiliares gerais
   - UUID, formatação, etc

6. **Store Zustand** (`src/store/avaliacaoStore.ts`)
   - Gerenciamento de estado global
   - CRUD de avaliações e pontos

7. **Custom Hooks**
   - `useForm.ts` - Gerenciamento de formulários
   - `useConformidade.ts` - Cálculos reativos

8. **Componentes React Native**
   - `FormularioPontoMedicao.tsx` - Form otimizado para campo
   - `CardConformidade.tsx` - Exibição de resultado
   - `ListaPontosMedicao.tsx` - Lista visual de pontos

9. **Documentação**
   - `README.md` - Visão geral do projeto
   - `ESTRUTURA_PASTAS.md` - Guia de organização
   - `GUIA_PRATICO.md` - Este guia!

### Próximos Passos:
1. Criar telas (screens)
2. Configurar React Navigation
3. Integrar com Firebase
4. Implementar SQLite para offline
5. Adicionar testes
6. Build para produção

Bom desenvolvimento! 🎉
