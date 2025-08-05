const API_BASE_URL = 'https://backend-rn-sac-frgnbfdph9aaatcn.centralus-01.azurewebsites.net'

export async function predictStudentGrade(features: number[]): Promise<{ predicted_grade: number }> {
    try {
        const response = await fetch(`${API_BASE_URL}/predict`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ features }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error en predictStudentGrade:', error);
        throw error;
    }
}