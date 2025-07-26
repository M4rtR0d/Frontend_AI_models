import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../pages/Home.css'
import StudentPredictor from "../components/StudentPredictor";

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

const ModelDetail: React.FC = () => {
    const { id } = useParams();
    const model = MODELS.find(model => model.id === id);

    if (!model) {
        return <div>Modelo no encontrado</div>;
    }

    return (
        <div className="dashboard-container">
        <div className="home-header">
            <h1>{model.name}</h1>
            <p>{model.description}</p>

        </div>
        <div className="model-card" style={{ maxWidth: 700, margin: '0 auto' }}>
            <div className="model-details" style={{ marginBottom: 16 }}>
            <div className="detail-item"><span className="detail-label">Tipo:</span> <span className="detail-value">{model.type}</span></div>
            <div className="detail-item"><span className="detail-label">Precisión:</span> <span className="detail-value">{(model.accuracy).toFixed(1)}%</span></div>
            <div className="detail-item"><span className="detail-label">Creado:</span> <span className="detail-value">{model.createdAt}</span></div>
            <div className="detail-item"><span className="detail-label">Actualizado:</span> <span className="detail-value">{model.updatedAt}</span></div>
            </div>
            <h3 style={{ marginTop: 24 }}>Ejemplo de uso</h3>
            <StudentPredictor/>
        </div>
        </div>
    )
}

export default ModelDetail