export interface Model {
    id: string,
    name: string,
    type: 'neural_network' | 'randon_forest'| 'linear_regression'|  'svm';
    description: string,
    accuracy?: number,
    status: 'active' | 'inactive' | 'training',
    createdAt: string,
    updatedAt: string
}

export interface SidebarItem {
    id: string,
    label: string,
    icon: string
    path: string
    activo?: boolean
}

export interface DashboardStats {
    totalModels: number,
    activeModels: number,
    avarageAccuracy: number,
    lastUpdate: string
}