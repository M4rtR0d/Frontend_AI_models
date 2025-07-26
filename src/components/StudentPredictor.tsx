import React, { useState } from 'react';
import './StudentPredictor.css';
import { predictStudentGrade } from '../services/api';

// Tipos
interface FormData {
  school: string;
  sex: string;
  age: number;
  address: string;
  famsize: string;
  Pstatus: string;
  Medu: number;
  Fedu: number;
  Mjob: string;
  Fjob: string;
  reason: string;
  guardian: string;
  traveltime: number;
  studytime: number;
  failures: number;
  schoolsup: string;
  famsup: string;
  paid: string;
  activities: string;
  nursery: string;
  higher: string;
  internet: string;
  romantic: string;
  famrel: number;
  freetime: number;
  goout: number;
  Dalc: number;
  Walc: number;
  health: number;
  absences: number;
  G1: number;
  G2: number;
}

// Configuración de codificación
const ENCODING = {
  school: { GP: 0, MS: 1 },
  sex: { F: 0, M: 1 },
  address: { U: 0, R: 1 },
  famsize: { LE3: 0, GT3: 1 },
  Pstatus: { T: 0, A: 1 },
  Mjob: { teacher: 0, health: 1, services: 2, at_home: 3, other: 4 },
  Fjob: { teacher: 0, health: 1, services: 2, at_home: 3, other: 4 },
  reason: { home: 0, reputation: 1, course: 2, other: 3 },
  guardian: { mother: 0, father: 1, other: 2 },
  schoolsup: { no: 0, yes: 1 },
  famsup: { no: 0, yes: 1 },
  paid: { no: 0, yes: 1 },
  activities: { no: 0, yes: 1 },
  nursery: { no: 0, yes: 1 },
  higher: { no: 0, yes: 1 },
  internet: { no: 0, yes: 1 },
  romantic: { no: 0, yes: 1 }
} as const;

// Estado inicial
const INITIAL_STATE: FormData = {
  school: 'GP', sex: 'F', age: 16, address: 'U', famsize: 'GT3', Pstatus: 'T',
  Medu: 2, Fedu: 2, Mjob: 'other', Fjob: 'other', reason: 'home', guardian: 'mother',
  traveltime: 1, studytime: 2, failures: 0, schoolsup: 'no', famsup: 'no', paid: 'no',
  activities: 'no', nursery: 'no', higher: 'yes', internet: 'yes', romantic: 'no',
  famrel: 4, freetime: 3, goout: 3, Dalc: 1, Walc: 1, health: 3, absences: 0, G1: 10, G2: 10,
};

const StudentPredictor: React.FC = () => {
  const [form, setForm] = useState<FormData>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const encodeFeatures = (data: FormData): number[] => {
    return [
      ENCODING.school[data.school as keyof typeof ENCODING.school],
      ENCODING.sex[data.sex as keyof typeof ENCODING.sex],
      Number(data.age),
      ENCODING.address[data.address as keyof typeof ENCODING.address],
      ENCODING.famsize[data.famsize as keyof typeof ENCODING.famsize],
      ENCODING.Pstatus[data.Pstatus as keyof typeof ENCODING.Pstatus],
      Number(data.Medu),
      Number(data.Fedu),
      ENCODING.Mjob[data.Mjob as keyof typeof ENCODING.Mjob],
      ENCODING.Fjob[data.Fjob as keyof typeof ENCODING.Fjob],
      ENCODING.reason[data.reason as keyof typeof ENCODING.reason],
      ENCODING.guardian[data.guardian as keyof typeof ENCODING.guardian],
      Number(data.traveltime),
      Number(data.studytime),
      Number(data.failures),
      ENCODING.schoolsup[data.schoolsup as keyof typeof ENCODING.schoolsup],
      ENCODING.famsup[data.famsup as keyof typeof ENCODING.famsup],
      ENCODING.paid[data.paid as keyof typeof ENCODING.paid],
      ENCODING.activities[data.activities as keyof typeof ENCODING.activities],
      ENCODING.nursery[data.nursery as keyof typeof ENCODING.nursery],
      ENCODING.higher[data.higher as keyof typeof ENCODING.higher],
      ENCODING.internet[data.internet as keyof typeof ENCODING.internet],
      ENCODING.romantic[data.romantic as keyof typeof ENCODING.romantic],
      Number(data.famrel),
      Number(data.freetime),
      Number(data.goout),
      Number(data.Dalc),
      Number(data.Walc),
      Number(data.health),
      Number(data.absences),
      // Features derivados
      //Number(data.G1),
      //Number(data.G2),
      (Number(data.G1) + Number(data.G2)) / 2, // Promedio G1 y G2
      //Number(data.G2) - Number(data.G1), // Mejora entre periodos
      Number(data.Dalc) + Number(data.Walc), // Consumo total de alcohol
      //Number(data.absences) / (Number(data.studytime) + 1) // Ratio ausencias/estudio
    ];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const features = encodeFeatures(form);
      console.log('Features enviados:', features, 'Cantidad:', features.length);

      const data = await predictStudentGrade(features);
      if (typeof data.predicted_grade === 'number') {
        setResult(`Nota predicha: ${data.predicted_grade.toFixed(2)}`);
      } else {
        setError('La API no devolvió una nota válida. Verifica el backend.');
      }
      } catch (err: any) {
        setError(err.message || 'No se pudo conectar con la API. Verifica que el backend esté corriendo.');
      } finally {
        setLoading(false);
      }

  };

  return (
    <div className="student-predictor-card">
      <h3 className="predictor-title">🔮 Predicción de nota para estudiante</h3>
      
      <form onSubmit={handleSubmit} className="predictor-form">
        <div className="predictor-grid">
          {/* Columna 1 - Información personal y familiar */}
          <div className="predictor-col">
            <label>
              Colegio
              <select name="school" value={form.school} onChange={handleChange}>
                <option value="GP">Gabriel Pereira</option>
                <option value="MS">Mousinho da Silveira</option>
              </select>
            </label>
            
            <label>
              Sexo
              <select name="sex" value={form.sex} onChange={handleChange}>
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
              </select>
            </label>
            
            <label>
              Edad
              <input type="number" name="age" min={15} max={22} value={form.age} onChange={handleChange} />
            </label>
            
            <label>
              Dirección
              <select name="address" value={form.address} onChange={handleChange}>
                <option value="U">Urbana</option>
                <option value="R">Rural</option>
              </select>
            </label>
            
            <label>
              Tamaño de familia
              <select name="famsize" value={form.famsize} onChange={handleChange}>
                <option value="LE3">≤3</option>
                <option value="GT3">&gt;3</option>
              </select>
            </label>
            
            <label>
              Estado de padres
              <select name="Pstatus" value={form.Pstatus} onChange={handleChange}>
                <option value="T">Juntos</option>
                <option value="A">Separados</option>
              </select>
            </label>
            
            <label>
              Educación madre
              <input type="number" name="Medu" min={0} max={4} value={form.Medu} onChange={handleChange} />
            </label>
            
            <label>
              Educación padre
              <input type="number" name="Fedu" min={0} max={4} value={form.Fedu} onChange={handleChange} />
            </label>
            
            <label>
              Trabajo madre
              <select name="Mjob" value={form.Mjob} onChange={handleChange}>
                <option value="teacher">Docente</option>
                <option value="health">Salud</option>
                <option value="services">Servicios</option>
                <option value="at_home">En casa</option>
                <option value="other">Otro</option>
              </select>
            </label>
            
            <label>
              Trabajo padre
              <select name="Fjob" value={form.Fjob} onChange={handleChange}>
                <option value="teacher">Docente</option>
                <option value="health">Salud</option>
                <option value="services">Servicios</option>
                <option value="at_home">En casa</option>
                <option value="other">Otro</option>
              </select>
            </label>
            
            <label>
              Razón de colegio
              <select name="reason" value={form.reason} onChange={handleChange}>
                <option value="home">Cerca de casa</option>
                <option value="reputation">Reputación</option>
                <option value="course">Curso</option>
                <option value="other">Otro</option>
              </select>
            </label>
            
            <label>
              Tutor
              <select name="guardian" value={form.guardian} onChange={handleChange}>
                <option value="mother">Madre</option>
                <option value="father">Padre</option>
                <option value="other">Otro</option>
              </select>
            </label>
            
            <label>
              Tiempo de viaje
              <input type="number" name="traveltime" min={1} max={4} value={form.traveltime} onChange={handleChange} />
            </label>
            
            <label>
              Tiempo de estudio semanal
              <input type="number" name="studytime" min={1} max={4} value={form.studytime} onChange={handleChange} />
            </label>
            
            <label>
              Reprobaciones
              <input type="number" name="failures" min={0} max={4} value={form.failures} onChange={handleChange} />
            </label>
          </div>

          {/* Columna 2 - Actividades y notas */}
          <div className="predictor-col">
            <label>
              Apoyo escolar
              <select name="schoolsup" value={form.schoolsup} onChange={handleChange}>
                <option value="yes">Sí</option>
                <option value="no">No</option>
              </select>
            </label>
            
            <label>
              Apoyo familiar
              <select name="famsup" value={form.famsup} onChange={handleChange}>
                <option value="yes">Sí</option>
                <option value="no">No</option>
              </select>
            </label>
            
            <label>
              Clases pagadas
              <select name="paid" value={form.paid} onChange={handleChange}>
                <option value="yes">Sí</option>
                <option value="no">No</option>
              </select>
            </label>
            
            <label>
              Actividades extraescolares
              <select name="activities" value={form.activities} onChange={handleChange}>
                <option value="yes">Sí</option>
                <option value="no">No</option>
              </select>
            </label>
            
            <label>
              Guardería
              <select name="nursery" value={form.nursery} onChange={handleChange}>
                <option value="yes">Sí</option>
                <option value="no">No</option>
              </select>
            </label>
            
            <label>
              Quiere educación superior
              <select name="higher" value={form.higher} onChange={handleChange}>
                <option value="yes">Sí</option>
                <option value="no">No</option>
              </select>
            </label>
            
            <label>
              Internet en casa
              <select name="internet" value={form.internet} onChange={handleChange}>
                <option value="yes">Sí</option>
                <option value="no">No</option>
              </select>
            </label>
            
            <label>
              Relación amorosa
              <select name="romantic" value={form.romantic} onChange={handleChange}>
                <option value="yes">Sí</option>
                <option value="no">No</option>
              </select>
            </label>
            
            <label>
              Relación familiar
              <input type="number" name="famrel" min={1} max={5} value={form.famrel} onChange={handleChange} />
            </label>
            
            <label>
              Tiempo libre
              <input type="number" name="freetime" min={1} max={5} value={form.freetime} onChange={handleChange} />
            </label>
            
            <label>
              Salir con amigos
              <input type="number" name="goout" min={1} max={5} value={form.goout} onChange={handleChange} />
            </label>
            
            <label>
              Alcohol entre semana
              <input type="number" name="Dalc" min={1} max={5} value={form.Dalc} onChange={handleChange} />
            </label>
            
            <label>
              Alcohol fin de semana
              <input type="number" name="Walc" min={1} max={5} value={form.Walc} onChange={handleChange} />
            </label>
            
            <label>
              Salud
              <input type="number" name="health" min={1} max={5} value={form.health} onChange={handleChange} />
            </label>
            
            <label>
              Inasistencias
              <input type="number" name="absences" min={0} max={93} value={form.absences} onChange={handleChange} />
            </label>
            
            <label>
              Nota primer periodo (G1)
              <input type="number" name="G1" min={0} max={20} value={form.G1} onChange={handleChange} />
            </label>
            
            <label>
              Nota segundo periodo (G2)
              <input type="number" name="G2" min={0} max={20} value={form.G2} onChange={handleChange} />
            </label>
          </div>
        </div>

        <div className="predictor-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Prediciendo...' : 'Predecir'}
          </button>
        </div>
      </form>

      {result && (
        <div className="prediction-result">
          {result}
        </div>
      )}
      
      {error && (
        <div className="prediction-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default StudentPredictor; 