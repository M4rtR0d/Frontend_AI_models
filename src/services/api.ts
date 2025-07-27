const API_BASE_URL = 'https://backend-rn-sac4-embigxbvf0cffbev.centralus-01.azurewebsites.net'

export async function predictStudentGrade(features: number[]): Promise<{ predicted_grade: number }> {
    const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features }),
    })
    if (!response.ok) {
        throw new Error('Ocurrio un error en la solicitud');
    }
    return response.json();
}