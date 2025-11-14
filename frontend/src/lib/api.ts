import { run } from "node:test";

const API_BASE = 'http://localhost:5000/api';

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}

export const api = {
  issues: {
    list: () => apiFetch('/issues'),
    create: (data: any) => apiFetch('/issues', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => apiFetch(`/issues/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id: string) => apiFetch(`/issues/${id}`, {
      method: 'DELETE'
    }),
    getById: (id: string) => apiFetch(`/issues/${id}`),
    listCrewIssues: () => apiFetch('/issues/crew/issues'),
  },
  vessels: {
    list: () => apiFetch('/vessels'),
    listCrewVessels: () => apiFetch('/vessels/crew/vessels'),
    create: (data: any) => apiFetch('/vessels', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => apiFetch(`/vessels/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id: string) => apiFetch(`/vessels/${id}`, {
      method: 'DELETE'
    }),
    getById: (id: string) => apiFetch(`/vessels/${id}`),
    runInspections: (id: string) => apiFetch(`/vessels/${id}/run-inspections`, {
      method: 'POST'
    }),
  },  
  users: {
    list: () => apiFetch('/users'),
    create: (data: any) => apiFetch('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => apiFetch(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id: string) => apiFetch(`/users/${id}`, {
      method: 'DELETE'
    }),
    getById: (id: string) => apiFetch(`/users/${id}`),
  },  
};
