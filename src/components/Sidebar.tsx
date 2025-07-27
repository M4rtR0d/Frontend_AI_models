import React from 'react';
import './Sidebar.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faList,  
} from '@fortawesome/free-solid-svg-icons';
// Si usas React Router DOM para la navegación
import { Link } from 'react-router-dom';

interface SidebarProps {
  // Puedes pasar props si necesitas controlar el estado del sidebar (abierto/cerrado)
}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-brand">DevSenior Dashboard</span>
      </div>
      <ul className="sidebar-nav">
        {/* Utiliza <Link> si estás usando React Router para la navegación */}
        <li className="sidebar-nav-item active">
          <Link to="/dashboard">
            <FontAwesomeIcon icon={faChartPie} className="nav-icon" />
            Dashboard
          </Link>
        </li>
        <li className="sidebar-nav-item">
          <Link to="/models">
            <FontAwesomeIcon icon={faList} className="nav-icon" />
            Lista de Modelos
          </Link>
        </li>
        
      </ul>
      {/* Puedes agregar un fondo dinámico aquí si lo deseas */}
      <div className="sidebar-background">
        {/*  */}
      </div>
    </div>
  );
};

export default Sidebar;