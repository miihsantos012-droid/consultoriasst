/**
 * Hook Customizado para Gerenciamento de Formulários
 * Fornece funcionalidades completas de formulário com validação
 */

import { useState, useCallback, useRef } from 'react';

interface UseFormState<T> {
  values: T;
  errors: Record<keyof T, string | undefined>;
  touched: Record<keyof T, boolean>;
}

interface UseFormOptions<T> {
  initialValues: T;
  onSubmit?: (values: T) => Promise<void> | void;
  validate?: (values: T) => Record<keyof T, string | undefined>;
}

/**
 * Hook para gerenciamento de formulários
 */
export function useForm<T extends Record<string, any>>(
  options: UseFormOptions<T>
): {
  values: T;
  errors: Record<keyof T, string | undefined>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  handleChange: (field: keyof T, value: any) => void;
  handleBlur: (field: keyof T) => void;
  handleSubmit: () => Promise<void>;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string) => void;
  reset: () => void;
  resetField: (field: keyof T) => void;
} {
  const { initialValues, onSubmit, validate } = options;
  
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string | undefined>>({} as any);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as any);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialValuesRef = useRef(initialValues);
  
  // Calcula erros
  const validateForm = useCallback(
    (valuesToValidate: T = values): Record<keyof T, string | undefined> => {
      if (!validate) return {} as any;
      return validate(valuesToValidate);
    },
    [values, validate]
  );
  
  // Verifica se o formulário é válido
  const isValid = Object.values(errors).every((error) => !error);
  
  // Verifica se o formulário foi modificado
  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValuesRef.current);
  
  // Manipula mudança de campo
  const handleChange = useCallback(
    (field: keyof T, value: any) => {
      const newValues = { ...values, [field]: value };
      setValues(newValues);
      
      // Valida apenas o campo modificado se ele foi tocado
      if (touched[field]) {
        const newErrors = validateForm(newValues);
        setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
      }
    },
    [values, touched, validateForm]
  );
  
  // Manipula blur do campo
  const handleBlur = useCallback(
    (field: keyof T) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      
      const newErrors = validateForm();
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    },
    [validateForm]
  );
  
  // Manipula envio do formulário
  const handleSubmit = useCallback(async () => {
    setTouched(
      Object.keys(values).reduce((acc, key) => {
        acc[key as keyof T] = true;
        return acc;
      }, {} as Record<keyof T, boolean>)
    );
    
    const validationErrors = validateForm();
    setErrors(validationErrors);
    
    const formIsValid = Object.values(validationErrors).every((error) => !error);
    
    if (formIsValid && onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validateForm, onSubmit]);
  
  // Define valor de campo
  const setFieldValue = useCallback(
    (field: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    },
    []
  );
  
  // Define erro de campo
  const setFieldError = useCallback(
    (field: keyof T, error: string) => {
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    []
  );
  
  // Reseta o formulário
  const reset = useCallback(() => {
    setValues(initialValuesRef.current);
    setErrors({} as any);
    setTouched({} as any);
    setIsSubmitting(false);
  }, []);
  
  // Reseta campo individual
  const resetField = useCallback((field: keyof T) => {
    setValues((prev) => ({
      ...prev,
      [field]: initialValuesRef.current[field],
    }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setTouched((prev) => ({ ...prev, [field]: false }));
  }, []);
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    reset,
    resetField,
  };
}
