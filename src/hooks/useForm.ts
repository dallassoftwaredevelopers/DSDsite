import { useState, useCallback } from 'react';
import { LABELS } from '@/app/labels';

type ValidationRuleForFormField<T> = {
  [K in keyof T]?: {
    isFieldRequired?: boolean;
    validationRegexPattern?: RegExp;
    minimumCharacterLength?: number;
    maximumCharacterLength?: number;
    customValidationFunction?: (fieldValue: T[K]) => string | undefined;
  }[];
};

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRuleForFormField<T> = {}
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((fieldName: keyof T, fieldValue: T[keyof T]) => {
    setValues(prev => ({ ...prev, [fieldName]: fieldValue }));
    
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
    }
  }, [errors]);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValue(name as keyof T, value);
  }, [setValue]);

  const validate = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    
    Object.entries(validationRules).forEach(([field, rules]) => {
      const fieldKey = field as keyof T;
      const fieldValue = values[fieldKey];
      
      rules?.forEach(rule => {
        if (rule.isFieldRequired && (!fieldValue || String(fieldValue).trim() === '')) {
          newErrors[fieldKey] = `${String(field)}${LABELS.validation.fieldRequiredSuffix}`;
          return;
        }
        
        if (rule.validationRegexPattern && !rule.validationRegexPattern.test(String(fieldValue))) {
          newErrors[fieldKey] = `${String(field)}${LABELS.validation.invalidFormatSuffix}`;
          return;
        }
        
        if (rule.maximumCharacterLength && String(fieldValue).length > rule.maximumCharacterLength) {
          newErrors[fieldKey] = `${String(field)}${LABELS.validation.tooLongPrefix}${rule.maximumCharacterLength}${LABELS.validation.charactersText}`;
          return;
        }
        
        if (rule.customValidationFunction) {
          const customError = rule.customValidationFunction(fieldValue);
          if (customError) {
            newErrors[fieldKey] = customError;
            return;
          }
        }
      });
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validationRules]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    setValue,
    validate,
    reset,
  };
}
