const corsProxy = 'https://cors-anywhere.herokuapp.com/';
const apiURL = 'http://saumondeluxe.ddns.net:63246/';

const connectionENDPOINT = (id, password) => {
    // Encode special characters in password
    const encodedPassword = encodeURIComponent(password);
    return `uvsq/bulletin/${id}+${encodedPassword}`;
};
const edtENDPOINT = (classe, startdate, endate) => `uvsq/edt/${classe}+${startdate}+${endate}`;

// Partie connection
export const connection = async (id, password) => {
    try {
        const response = await fetch(corsProxy + apiURL + connectionENDPOINT(id, password), {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            return { error: `Erreur de connexion (${response.status})` };
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Connection error:', error);
        return { error: 'Impossible de se connecter au serveur' };
    }
}

// Partie emploi du temps
export const edt = async (classe, startdate, endate) => {
    try {
        const response = await fetch(corsProxy + apiURL + edtENDPOINT(classe, startdate, endate), {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            return { error: `Erreur de récupération (${response.status})` };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('EDT error:', error);
        return { error: 'Impossible de récupérer l\'emploi du temps' };
    }
}