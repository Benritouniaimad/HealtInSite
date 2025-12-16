/**
 * PatientForm.tsx
 * Formulaire de saisie des données patient pour la prédiction de risque
 */
import React, { useState, FormEvent } from 'react';
import { PatientFormData } from '../types/prediction';

interface PatientFormProps {
  onSubmit: (data: PatientFormData) => void;
  isLoading: boolean;
}

const PatientForm: React.FC<PatientFormProps> = ({ onSubmit, isLoading }) => {
  // État local du formulaire avec valeurs par défaut
  const [formData, setFormData] = useState<PatientFormData>({
    age: 45,
    sex: 'M',
    bmi: 25.0,
    smoker: 'no',
    physical_activity_level: 'medium',
    hypertension: 0,
    cholesterol_level: 'normal',
    family_history: 0,
  });

  // Gestion du changement des champs du formulaire
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    // Gérer les checkboxes différemment
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked ? 1 : 0
      }));
    } else if (name === 'age' || name === 'bmi') {
      // Convertir en nombre pour age et bmi
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Soumission du formulaire
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.formTitle}>Données Patient</h2>
      
      {/* Age */}
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="age">
          Âge (années)
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          min="0"
          max="120"
          required
          style={styles.input}
          disabled={isLoading}
        />
      </div>

      {/* Sexe */}
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="sex">
          Sexe
        </label>
        <select
          id="sex"
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          required
          style={styles.select}
          disabled={isLoading}
        >
          <option value="M">Masculin</option>
          <option value="F">Féminin</option>
        </select>
      </div>

      {/* BMI */}
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="bmi">
          IMC (BMI)
        </label>
        <input
          type="number"
          id="bmi"
          name="bmi"
          value={formData.bmi}
          onChange={handleChange}
          min="10"
          max="50"
          step="0.1"
          required
          style={styles.input}
          disabled={isLoading}
        />
      </div>

      {/* Fumeur */}
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="smoker">
          Fumeur
        </label>
        <select
          id="smoker"
          name="smoker"
          value={formData.smoker}
          onChange={handleChange}
          required
          style={styles.select}
          disabled={isLoading}
        >
          <option value="no">Non</option>
          <option value="yes">Oui</option>
        </select>
      </div>

      {/* Niveau d'activité physique */}
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="physical_activity_level">
          Activité Physique
        </label>
        <select
          id="physical_activity_level"
          name="physical_activity_level"
          value={formData.physical_activity_level}
          onChange={handleChange}
          required
          style={styles.select}
          disabled={isLoading}
        >
          <option value="low">Faible</option>
          <option value="medium">Moyenne</option>
          <option value="high">Élevée</option>
        </select>
      </div>

      {/* Hypertension */}
      <div style={styles.formGroup}>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="hypertension"
            checked={formData.hypertension === 1}
            onChange={handleChange}
            style={styles.checkbox}
            disabled={isLoading}
          />
          <span style={styles.checkboxText}>Hypertension</span>
        </label>
      </div>

      {/* Niveau de cholestérol */}
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="cholesterol_level">
          Cholestérol
        </label>
        <select
          id="cholesterol_level"
          name="cholesterol_level"
          value={formData.cholesterol_level}
          onChange={handleChange}
          required
          style={styles.select}
          disabled={isLoading}
        >
          <option value="normal">Normal</option>
          <option value="high">Élevé</option>
        </select>
      </div>

      {/* Antécédents familiaux */}
      <div style={styles.formGroup}>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="family_history"
            checked={formData.family_history === 1}
            onChange={handleChange}
            style={styles.checkbox}
            disabled={isLoading}
          />
          <span style={styles.checkboxText}>Antécédents Familiaux</span>
        </label>
      </div>

      {/* Bouton de soumission */}
      <button
        type="submit"
        style={{
          ...styles.submitButton,
          ...(isLoading ? styles.submitButtonDisabled : {})
        }}
        disabled={isLoading}
      >
        {isLoading ? 'Analyse en cours...' : 'Prédire le Risque'}
      </button>
    </form>
  );
};

// Styles CSS-in-JS
const styles: { [key: string]: React.CSSProperties } = {
  form: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
  },
  formTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '20px',
    marginTop: '0',
  },
  formGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#475569',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    outline: 'none',
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    outline: 'none',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    marginRight: '8px',
  },
  checkboxText: {
    fontSize: '14px',
    color: '#475569',
    fontWeight: '500',
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '8px',
  },
  submitButtonDisabled: {
    backgroundColor: '#94a3b8',
    cursor: 'not-allowed',
  },
};

export default PatientForm;
