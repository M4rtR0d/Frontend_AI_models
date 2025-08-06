import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Model } from '../types';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  // Modelo principal actual
  const neuralNetworkModel: Model = {
    id: '1',
    name: 'Red Neuronal - Predicción de Nota',
    type: 'neural_network',
    description: 'Modelo de red neuronal para predecir la nota final de un estudiante a partir de sus características académicas y personales.',
    accuracy: 76.9,
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'inactive': return '#6b7280';
      case 'training': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'training': return 'Entrenando';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="home">
      <div className="dashboard-container">
        <div className="home-header">
          <h1>👋 ¡Modelos de I.A. entrenados!</h1>
          <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: 12 }}>
            Aquí puedes consultar y gestionar los modelos de Machine Learning disponibles en el sistema.<br />
          </p>
          <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={() => navigate('/models')}>
            Ver todos los modelos
          </button>
        </div>
        {/* Métricas rápidas del modelo */}
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', margin: '32px 0 24px 0' }}>
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(102,126,234,0.08)', padding: 20, minWidth: 160, textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>🤖</div>
            <div style={{ fontWeight: 600, fontSize: 18 }}>1</div>
            <div style={{ color: '#64748b', fontSize: 14 }}>Modelo disponible</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(102,126,234,0.08)', padding: 20, minWidth: 160, textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>🎯</div>
            <div style={{ fontWeight: 600, fontSize: 18 }}>{neuralNetworkModel.accuracy}%</div>
            <div style={{ color: '#64748b', fontSize: 14 }}>Rango de Precisión</div>
          </div>
          
        </div>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 32 }}>
          {/* Sección Modelos Supervisados */}
          <div style={{ flex: 1, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(102,126,234,0.08)', padding: 24 }}>
            <h2 style={{ marginBottom: 16, color: '#2563eb', textAlign: 'center' }}>Modelos Supervisados</h2>
            <div className="model-card" style={{ marginBottom: 16 }}>
              <div className="model-header">
                <div className="model-info">
                  <h3>{neuralNetworkModel.name}</h3>
                  <p className="model-description">{neuralNetworkModel.description}</p>
                </div>
                <div className="model-status">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(neuralNetworkModel.status) }}
                  >
                    {getStatusText(neuralNetworkModel.status)}
                  </span>
                </div>
              </div>
              <div className="model-details">
                <div className="detail-item">
                  <span className="detail-label">Tipo:</span>
                  <span className="detail-value">{neuralNetworkModel.type}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Sección Modelos No Supervisados */}
          <div style={{ flex: 1, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(102,126,234,0.08)', padding: 24 }}>
            <h2 style={{ marginBottom: 16, color: '#2563eb', textAlign: 'center' }}>Modelos No Supervisados</h2>
            <p style={{ color: '#64748b' }}>No hay modelos no supervisados registrados aún.</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Home; 