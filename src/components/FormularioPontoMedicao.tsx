/**
 * Componente de Formulário para Cadastro de Ponto de Medição
 * Otimizado para uso em campo com UI/UX simplificada
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { PontoMedicao, Equipamento } from '@types/index';
import { sanitizarIluminancia, validarPontoMedicao } from '@utils/validation';
import { useForm } from '@hooks/useForm';

interface FormularioPontoMedicaoProps {
  onSubmit: (ponto: Omit<PontoMedicao, 'id' | 'timestamp' | 'avaliacao_id'>) => Promise<void> | void;
  equipamentos: Equipamento[];
  numeroSequencia: number;
  onCancel?: () => void;
}

interface FormValues {
  numero: number;
  descricao: string;
  valor_lux: string;
  equipamento_id: string;
  observacoes: string;
}

/**
 * Componente de Formulário para Ponto de Medição
 */
export const FormularioPontoMedicao: React.FC<FormularioPontoMedicaoProps> = ({
  onSubmit,
  equipamentos,
  numeroSequencia,
  onCancel,
}) => {
  const [isSelectingEquipamento, setIsSelectingEquipamento] = useState(false);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState<Equipamento | undefined>();
  
  // Validação do formulário
  const validar = (values: FormValues) => {
    const erros: Record<keyof FormValues, string | undefined> = {
      numero: undefined,
      descricao: undefined,
      valor_lux: undefined,
      equipamento_id: undefined,
      observacoes: undefined,
    };
    
    if (!values.descricao.trim()) {
      erros.descricao = 'Descrição é obrigatória';
    } else if (values.descricao.length < 3) {
      erros.descricao = 'Descrição deve ter pelo menos 3 caracteres';
    }
    
    const { valido, valor } = sanitizarIluminancia(values.valor_lux);
    if (!valido) {
      erros.valor_lux = 'Iluminância inválida (0 a 100000 lux)';
    }
    
    if (!values.equipamento_id) {
      erros.equipamento_id = 'Equipamento é obrigatório';
    }
    
    return erros;
  };
  
  // Hook do formulário
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    initialValues: {
      numero: numeroSequencia,
      descricao: '',
      valor_lux: '',
      equipamento_id: '',
      observacoes: '',
    },
    validate: validar,
    onSubmit: async (formValues) => {
      const { valido, valor } = sanitizarIluminancia(formValues.valor_lux);
      
      if (!valido || valor === undefined) {
        Alert.alert('Erro', 'Valor de iluminância inválido');
        return;
      }
      
      const ponto: Omit<PontoMedicao, 'id' | 'timestamp' | 'avaliacao_id'> = {
        numero: formValues.numero,
        descricao: formValues.descricao.trim(),
        valor_lux: valor,
        equipamento_id: formValues.equipamento_id,
        observacoes: formValues.observacoes.trim() || undefined,
      };
      
      await onSubmit(ponto);
      reset();
      setEquipamentoSelecionado(undefined);
    },
  });
  
  const selecionarEquipamento = (equipamento: Equipamento) => {
    setEquipamentoSelecionado(equipamento);
    handleChange('equipamento_id', equipamento.id);
    setIsSelectingEquipamento(false);
  };
  
  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Novo Ponto de Medição</Text>
        <Text style={styles.subtitulo}>Ponto #{numeroSequencia}</Text>
      </View>
      
      {/* Descrição */}
      <View style={styles.campo}>
        <Text style={styles.label}>Descrição do Ponto *</Text>
        <TextInput
          style={[
            styles.input,
            touched.descricao && errors.descricao ? styles.inputErro : undefined,
          ]}
          placeholder="Ex: Área próxima à entrada"
          value={values.descricao}
          onChangeText={(text) => handleChange('descricao', text)}
          onBlur={() => handleBlur('descricao')}
          editable={!isSubmitting}
          placeholderTextColor="#999"
        />
        {touched.descricao && errors.descricao && (
          <Text style={styles.mensagemErro}>{errors.descricao}</Text>
        )}
      </View>
      
      {/* Iluminância em Lux */}
      <View style={styles.campo}>
        <Text style={styles.label}>Iluminância (lux) *</Text>
        <View style={styles.inputGroup}>
          <TextInput
            style={[
              styles.inputNumerico,
              touched.valor_lux && errors.valor_lux ? styles.inputErro : undefined,
            ]}
            placeholder="0"
            value={values.valor_lux}
            onChangeText={(text) => handleChange('valor_lux', text)}
            onBlur={() => handleBlur('valor_lux')}
            keyboardType="decimal-pad"
            editable={!isSubmitting}
            placeholderTextColor="#999"
          />
          <Text style={styles.unidade}>lux</Text>
        </View>
        {touched.valor_lux && errors.valor_lux && (
          <Text style={styles.mensagemErro}>{errors.valor_lux}</Text>
        )}
      </View>
      
      {/* Equipamento */}
      <View style={styles.campo}>
        <Text style={styles.label}>Equipamento *</Text>
        <TouchableOpacity
          style={[
            styles.botaoSelecao,
            touched.equipamento_id && errors.equipamento_id ? styles.inputErro : undefined,
          ]}
          onPress={() => setIsSelectingEquipamento(true)}
          disabled={isSubmitting}
        >
          <Text
            style={[
              styles.textoSelecao,
              !equipamentoSelecionado && styles.textoSelecaoVazio,
            ]}
          >
            {equipamentoSelecionado
              ? `${equipamentoSelecionado.modelo} (${equipamentoSelecionado.numero})`
              : 'Selecionar equipamento'}
          </Text>
        </TouchableOpacity>
        {touched.equipamento_id && errors.equipamento_id && (
          <Text style={styles.mensagemErro}>{errors.equipamento_id}</Text>
        )}
      </View>
      
      {/* Observações */}
      <View style={styles.campo}>
        <Text style={styles.label}>Observações (opcional)</Text>
        <TextInput
          style={[styles.input, styles.inputMultilinha]}
          placeholder="Adicione notas sobre este ponto de medição"
          value={values.observacoes}
          onChangeText={(text) => handleChange('observacoes', text)}
          onBlur={() => handleBlur('observacoes')}
          multiline
          numberOfLines={3}
          editable={!isSubmitting}
          placeholderTextColor="#999"
        />
      </View>
      
      {/* Botões de Ação */}
      <View style={styles.botoes}>
        <TouchableOpacity
          style={[styles.botaoCancelar, isSubmitting && styles.botaoDisabled]}
          onPress={onCancel || reset}
          disabled={isSubmitting}
        >
          <Text style={styles.textoBotaoCancelar}>
            {isSubmitting ? 'Processando...' : 'Cancelar'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.botaoEnviar, isSubmitting && styles.botaoDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textoBotaoEnviar}>Adicionar Ponto</Text>
          )}
        </TouchableOpacity>
      </View>
      
      {/* Modal de Seleção de Equipamento */}
      <Modal
        visible={isSelectingEquipamento}
        transparent
        animationType="slide"
        onRequestClose={() => setIsSelectingEquipamento(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>Selecionar Equipamento</Text>
              <TouchableOpacity
                onPress={() => setIsSelectingEquipamento(false)}
                style={styles.botaoFechar}
              >
                <Text style={styles.textoFechar}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalLista}>
              {equipamentos.filter((e) => e.ativo).map((equipamento) => (
                <TouchableOpacity
                  key={equipamento.id}
                  style={[
                    styles.itemEquipamento,
                    equipamentoSelecionado?.id === equipamento.id &&
                      styles.itemEquipamentoSelecionado,
                  ]}
                  onPress={() => selecionarEquipamento(equipamento)}
                >
                  <View>
                    <Text style={styles.nomeEquipamento}>{equipamento.modelo}</Text>
                    <Text style={styles.detalhesEquipamento}>
                      Número: {equipamento.numero}
                    </Text>
                    <Text style={styles.detalhesEquipamento}>
                      Calibrado: {equipamento.dataUltimalCalibracao}
                    </Text>
                  </View>
                  {equipamentoSelecionado?.id === equipamento.id && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// ============================================
// Estilos
// ============================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  campo: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  inputErro: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  },
  inputNumerico: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unidade: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    paddingVertical: 12,
  },
  inputMultilinha: {
    textAlignVertical: 'top',
    minHeight: 80,
  },
  botaoSelecao: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  textoSelecao: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  textoSelecaoVazio: {
    color: '#999',
  },
  mensagemErro: {
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 4,
    fontWeight: '500',
  },
  botoes: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 16,
    gap: 12,
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoEnviar: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoDisabled: {
    opacity: 0.6,
  },
  textoBotaoCancelar: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  textoBotaoEnviar: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  botaoFechar: {
    padding: 8,
  },
  textoFechar: {
    fontSize: 24,
    color: '#999',
  },
  modalLista: {
    padding: 16,
  },
  itemEquipamento: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemEquipamentoSelecionado: {
    backgroundColor: '#E8F4FF',
    borderColor: '#007AFF',
  },
  nomeEquipamento: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  detalhesEquipamento: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  checkmark: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
