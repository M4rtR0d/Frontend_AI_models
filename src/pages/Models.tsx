import React from "react";
import { useNavigate } from "react-router-dom";
import '../pages/Home.css'

const MODELS = [
    {
        id: "neural_network",
        name: 'Red Neuronal - Predicción de Nota',
        type: 'neural_network',
        description: 'Modelo de red neuronal profunda para predecir la nota final de un estudiante a partir de sus características académicas y personales.',
        status: 'active',
        accuracy: 76.9,
        createdAt: '2025-07-15',
        updatedAt: '2025-07-20'
    },
    {
        id: "linear_regression",
        name: 'Regresión Lineal - Predicción de Nota',
        type: 'linear_regression',
        description: 'Modelo de regresión lineal para predecir la nota final de un estudiante a partir de sus características académicas y personales.',
        status: 'inactive',
        accuracy: 0,
        createdAt: '2025-07-10',
        updatedAt: '2025-07-18'
    }

    
];

const Models: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
      <div className="home-header">
        <h1>🤖 Modelos Disponibles</h1>
        <p>Selecciona un modelo para ver detalles y probar una predicción.</p>
      </div>
      <div className="models-grid" style={{ display: 'grid', gap: 32, gridTemplateColumns: '1fr', maxWidth: 700, margin: '0 auto' }}>
        {MODELS.map(model => (
          <div key={model.id} className="model-card" style={{ position: 'relative' }}>
            <div className="model-header" style={{ marginBottom: 12 }}>
              <div className="model-info">
                <h3>{model.name}</h3>
                <p className="model-description">{model.description}</p>
              </div>
              <div className="model-status">
                <span className="status-badge" style={{ background: '#10b981' }}>{model.status}</span>
              </div>
            </div>
            <div className="model-details" style={{ marginBottom: 16 }}>
              <div className="detail-item"><span className="detail-label">Tipo:</span> <span className="detail-value">{model.type}</span></div>
              <div className="detail-item"><span className="detail-label">Precisión:</span> <span className="detail-value">{(model.accuracy).toFixed(1)}%</span></div>
              <div className="detail-item"><span className="detail-label">Creado:</span> <span className="detail-value">{model.createdAt}</span></div>
              <div className="detail-item"><span className="detail-label">Actualizado:</span> <span className="detail-value">{model.updatedAt}</span></div>
            </div>
            <button className="btn btn-primary" onClick={() => navigate(`/models/${model.id}`)}>
              Ver detalles
            </button>
          </div>
        ))}
      </div>
    </div>
    )
}

export default Models