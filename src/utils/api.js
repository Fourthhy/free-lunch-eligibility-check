const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const KITCHEN_STAFF_API_KEY = import.meta.env.VITE_KITCHEN_STAFF_API_KEY;

const handleApiResponse = async (response) => {
    // For 204 No Content, we can't call .json(), so we return a simple success object
    if (response.status === 204) {
        return { success: true, data: {} };
    }
    const data = await response.json();
    if (!response.ok) {
        const errorMessage = data.error?.message || `Request failed with status ${response.status}`;
        throw new Error(errorMessage);
    }
    return data;
};

// --- AUTH API ---
// For login/logout where tokens aren't sent with the request
export const authApi = {
    login: async (email, password) => {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        return handleApiResponse(response);
    },
    googleLogin: async (firebaseIdToken) => {
        const response = await fetch(`${BASE_URL}/auth/google-login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: firebaseIdToken }),
        });
        return handleApiResponse(response);
    },
   
    requestPasswordReset: async (email) => {
        const response = await fetch(`${BASE_URL}/auth/request-password-reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        return handleApiResponse(response);
    },

    resetPassword: async (email, resetCode, newPassword) => {
        const response = await fetch(`${BASE_URL}/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, resetCode, newPassword }),
        });
        return handleApiResponse(response);
    }
};

// Generic object for making authenticated requests for Admins
export const adminApi = {
    get: async (endpoint) => {
        const token = localStorage.getItem('adminAuthToken');
        if (!token) throw new Error('Authentication token not found.');

        const url = `${BASE_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        const response = await fetch(url, { method: 'GET', headers });
        return handleApiResponse(response);
    },

    post: async (endpoint, body) => {
        const token = localStorage.getItem('adminAuthToken');
        if (!token) throw new Error('Authentication token not found.');

        const url = `${BASE_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });
        return handleApiResponse(response);
    },

    put: async (endpoint, body) => {
        const token = localStorage.getItem('adminAuthToken');
        if (!token) throw new Error('Authentication token not found.');

        const url = `${BASE_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body),
        });
        return handleApiResponse(response);
    },
    patch: async (endpoint, body) => {
        const token = localStorage.getItem('adminAuthToken');
        if (!token) throw new Error('Authentication token not found.');
        const url = `${BASE_URL}${endpoint}`;
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
        const response = await fetch(url, { method: 'PATCH', headers: headers, body: JSON.stringify(body) });
        return handleApiResponse(response);
    },

    delete: async (endpoint) => {
        const token = localStorage.getItem('adminAuthToken');
        if (!token) throw new Error('Authentication token not found.');

        const url = `${BASE_URL}${endpoint}`;
        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        const response = await fetch(url, { method: 'DELETE', headers });
        return handleApiResponse(response);
    },
    changePassword: async (oldPassword, newPassword) => {
        const token = localStorage.getItem('adminAuthToken');
        if (!token) throw new Error('Authentication token not found.');

        const url = `${BASE_URL}/auth/change-password`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({ oldPassword, newPassword }),
        });
        return handleApiResponse(response);
    }
};

// --- PUBLIC-FACING FUNCTIONS ---

export const getPublicPrograms = async () => {
    const url = `${BASE_URL}/programs`;
    const headers = { 'Content-Type': 'application/json' };
    const response = await fetch(url, { method: 'GET', headers });
    return handleApiResponse(response);
};

export const checkStudentEligibility = async (studentId) => {
    const url = `${BASE_URL}/eligibility/${studentId}`;
    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': KITCHEN_STAFF_API_KEY,
    };

    try {
        const response = await fetch(url, { method: 'GET', headers });
        const data = await response.json();
        return {
            ok: response.ok,
            status: response.status,
            data,
        };
    } catch (error) {
        return {
            ok: false,
            status: 500,
            data: {
                success: false,
                error: { message: 'Network error or server is unreachable.' },
            },
        };
    }
};