/**
 * PredictionForm - Formulaire de saisie des données patient
 */
import React, { useState } from 'react';
import { PatientData, predictRisk, PredictionResult } from '../lib/api';

interface PredictionFormProps {
  onResult: (result: PredictionResult) => void;
  onError: (error: string) => void;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onResult, onError }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PatientData>({
    age: 45,
    sex: 'M',
    bmi: 25.0,
    smoker: 'no',
    physical_activity_level: 'moderate',
    hypertension: 0,
    cholesterol_level: 'normal',
    family_history: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Conversion des valeurs selon le type
    let processedValue: any = value;
    
    if (name === 'age') {
      processedValue = parseInt(value);
    } else if (name === 'bmi') {
      processedValue = parseFloat(value);
    } else if (name === 'hypertension' || name === 'family_history') {
      processedValue = parseInt(value) as 0 | 1;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await predictRisk(formData);
      onResult(result);
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.message || 'Erreur de connexion à l\'API';
      onError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGrid}>
        {/* Âge */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Âge (ans)
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min={18}
              max={100}
              required
              style={styles.input}
            />
          </label>
        </div>

        {/* Sexe */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Sexe
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
          </label>
        </div>

        {/* BMI */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            IMC (Indice de Masse Corporelle)
            <input
              type="number"
              name="bmi"
              value={formData.bmi}
              onChange={handleChange}
              min={15}
              max={50}
              step={0.1}
              required
              style={styles.input}
            />
          </label>
        </div>

        {/* Fumeur */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Fumeur
            <select
              name="smoker"
              value={formData.smoker}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="no">Non</option>
              <option value="yes">Oui</option>
            </select>
          </label>
        </div>

        {/* Activité physique */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Niveau d&apos;activité physique
            <select
              name="physical_activity_level"
              value={formData.physical_activity_level}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="low">Faible</option>
              <option value="moderate">Modéré</option>
              <option value="high">Élevé</option>
            </select>
          </label>
        </div>

        {/* Hypertension */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Hypertension
            <select
              name="hypertension"
              value={formData.hypertension}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value={0}>Non</option>
              <option value={1}>Oui</option>
            </select>
          </label>
        </div>

        {/* Cholestérol */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Niveau de cholestérol
            <select
              name="cholesterol_level"
              value={formData.cholesterol_level}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="normal">Normal</option>
              <option value="high">Élevé</option>
            </select>
          </label>
        </div>

        {/* Antécédents familiaux */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Antécédents familiaux
            <select
              name="family_history"
              value={formData.family_history}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value={0}>Non</option>
              <option value={1}>Oui</option>
            </select>
          </label>
        </div>
      </div>

      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? 'Analyse en cours...' : 'Analyser le risque'}
      </button>
    </form>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    width: '100%',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    marginBottom: '2.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1E5BA8',
    marginBottom: '0.75rem',
    letterSpacing: '0.3px',
  },
  input: {
    marginTop: '0.5rem',
    padding: '0.9rem 1rem',
    border: '2px solid #E1E8ED',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: 'white',
  },
  select: {
    marginTop: '0.5rem',
    padding: '0.9rem 1rem',
    border: '2px solid #E1E8ED',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: 'white',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    padding: '1.3rem',
    background: 'linear-gradient(135deg, #2E7DD2 0%, #4A90E2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.15rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(46, 125, 210, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
};

export default PredictionForm;
