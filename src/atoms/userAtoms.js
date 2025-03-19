import { atom } from 'jotai';

// Load user from localStorage
const storedUser = JSON.parse(localStorage.getItem('user')) || null;

// Create the atom with initial value from localStorage
export const userAtom = atom(storedUser);
