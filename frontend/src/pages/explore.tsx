/**
 * Page d'exploration des données
 */
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getDatasetStatistics, DatasetStatistics } from '../lib/api';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ExplorePage: React.FC = () => {
  const [stats, setStats] = useState<DatasetStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDatasetStatistics();
        setStats(data);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Erreur de connexion à l\'API');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div style={styles.loading}>
          <p>Chargement des statistiques...</p>
        </div>
      </Layout>
    );
  }

  if (error || !stats) {
    return (
      <Layout>
        <div style={styles.error}>
          <h2>❌ Erreur</h2>
          <p>{error || 'Impossible de charger les données'}</p>
        </div>
      </Layout>
    );
  }

  // Préparation des données pour les graphiques

  // Distribution de sexe
  const sexData = [
    { name: 'Hommes', value: stats.sex_distribution.male },
    { name: 'Femmes', value: stats.sex_distribution.female },
  ];

  // Taux de maladie
  const diseaseData = [
    { name: 'Sain', value: Math.round((1 - stats.disease_rate) * 100) },
    { name: 'Malade', value: Math.round(stats.disease_rate * 100) },
  ];

  // Facteurs de risque
  const riskFactorsData = [
    { name: 'Fumeurs', value: Math.round(stats.smoker_rate * 100) },
    { name: 'Hypertension', value: Math.round(stats.hypertension_rate * 100) },
  ];

  const COLORS = ['#3498db', '#e74c3c', '#f39c12', '#27ae60'];

  return (
    <Layout>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>📊 Exploration des Données</h1>
          <p style={styles.subtitle}>
            Visualisation des statistiques du dataset de santé utilisé pour l&apos;entraînement du modèle
          </p>
        </div>

        {/* Statistiques générales */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>👥</div>
            <div style={styles.statValue}>{stats.total_samples.toLocaleString()}</div>
            <div style={styles.statLabel}>Échantillons</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>📈</div>
            <div style={styles.statValue}>{Math.round(stats.disease_rate * 100)}%</div>
            <div style={styles.statLabel}>Taux de maladie</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>🎂</div>
            <div style={styles.statValue}>{Math.round(stats.age_distribution.mean)} ans</div>
            <div style={styles.statLabel}>Âge moyen</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>⚖️</div>
            <div style={styles.statValue}>{stats.bmi_distribution.mean.toFixed(1)}</div>
            <div style={styles.statLabel}>IMC moyen</div>
          </div>
        </div>

        {/* Graphiques */}
        <div style={styles.chartsSection}>
          {/* Distribution de sexe */}
          <div style={styles.chartCard}>
            <h2 style={styles.chartTitle}>Distribution par Sexe</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sexData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sexData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Distribution de maladie */}
          <div style={styles.chartCard}>
            <h2 style={styles.chartTitle}>Répartition Sain / Malade</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={diseaseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {diseaseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Facteurs de risque */}
          <div style={styles.chartCard}>
            <h2 style={styles.chartTitle}>Facteurs de Risque (%)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskFactorsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3498db" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Détails des distributions */}
        <div style={styles.detailsSection}>
          <h2 style={styles.sectionTitle}>Détails des Distributions</h2>
          
          <div style={styles.detailsGrid}>
            <div style={styles.detailCard}>
              <h3 style={styles.detailTitle}>📅 Distribution de l&apos;Âge</h3>
              <div style={styles.detailStats}>
                <div style={styles.detailStat}>
                  <span style={styles.detailLabel}>Moyenne :</span>
                  <span style={styles.detailValue}>{Math.round(stats.age_distribution.mean)} ans</span>
                </div>
                <div style={styles.detailStat}>
                  <span style={styles.detailLabel}>Écart-type :</span>
                  <span style={styles.detailValue}>{stats.age_distribution.std.toFixed(1)} ans</span>
                </div>
                <div style={styles.detailStat}>
                  <span style={styles.detailLabel}>Min :</span>
                  <span style={styles.detailValue}>{stats.age_distribution.min} ans</span>
                </div>
                <div style={styles.detailStat}>
                  <span style={styles.detailLabel}>Max :</span>
                  <span style={styles.detailValue}>{stats.age_distribution.max} ans</span>
                </div>
              </div>
            </div>

            <div style={styles.detailCard}>
              <h3 style={styles.detailTitle}>⚖️ Distribution de l&apos;IMC</h3>
              <div style={styles.detailStats}>
                <div style={styles.detailStat}>
                  <span style={styles.detailLabel}>Moyenne :</span>
                  <span style={styles.detailValue}>{stats.bmi_distribution.mean.toFixed(1)}</span>
                </div>
                <div style={styles.detailStat}>
                  <span style={styles.detailLabel}>Écart-type :</span>
                  <span style={styles.detailValue}>{stats.bmi_distribution.std.toFixed(1)}</span>
                </div>
                <div style={styles.detailStat}>
                  <span style={styles.detailLabel}>Min :</span>
                  <span style={styles.detailValue}>{stats.bmi_distribution.min.toFixed(1)}</span>
                </div>
                <div style={styles.detailStat}>
                  <span style={styles.detailLabel}>Max :</span>
                  <span style={styles.detailValue}>{stats.bmi_distribution.max.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note méthodologique */}
        <div style={styles.noteSection}>
          <h3 style={styles.noteTitle}>📝 Note Méthodologique</h3>
          <p style={styles.noteText}>
            Le dataset utilisé contient <strong>{stats.total_samples.toLocaleString()} échantillons</strong> de
            patients avec diverses caractéristiques de santé. Le modèle de Machine Learning
            a été entraîné sur 80% de ces données, avec 20% réservés pour les tests.
          </p>
          <p style={styles.noteText}>
            Les données incluent des variables démographiques (âge, sexe), des mesures physiques (IMC),
            des comportements de santé (tabagisme, activité physique), et des conditions médicales
            (hypertension, cholestérol, antécédents familiaux).
          </p>
        </div>
      </div>
    </Layout>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
    color: '#7f8c8d',
  },
  error: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: '#f8d7da',
    borderRadius: '8px',
    color: '#721c24',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    margin: '0 0 1rem 0',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#7f8c8d',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  statCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  statIcon: {
    fontSize: '3rem',
    marginBottom: '0.5rem',
  },
  statValue: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#3498db',
    margin: '0.5rem 0',
  },
  statLabel: {
    fontSize: '1rem',
    color: '#7f8c8d',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  chartsSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  chartCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  chartTitle: {
    fontSize: '1.3rem',
    color: '#2c3e50',
    margin: '0 0 1.5rem 0',
    textAlign: 'center',
  },
  detailsSection: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    margin: '0 0 1.5rem 0',
    paddingBottom: '1rem',
    borderBottom: '2px solid #ecf0f1',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  detailCard: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '6px',
  },
  detailTitle: {
    fontSize: '1.2rem',
    color: '#2c3e50',
    margin: '0 0 1rem 0',
  },
  detailStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  detailStat: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem',
    backgroundColor: 'white',
    borderRadius: '4px',
  },
  detailLabel: {
    fontSize: '0.95rem',
    color: '#7f8c8d',
  },
  detailValue: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  noteSection: {
    backgroundColor: '#e8f4f8',
    padding: '1.5rem',
    borderRadius: '8px',
    borderLeft: '4px solid #3498db',
  },
  noteTitle: {
    fontSize: '1.2rem',
    color: '#2c3e50',
    margin: '0 0 1rem 0',
  },
  noteText: {
    fontSize: '1rem',
    color: '#34495e',
    lineHeight: '1.6',
    margin: '0.5rem 0',
  },
};

export default ExplorePage;
