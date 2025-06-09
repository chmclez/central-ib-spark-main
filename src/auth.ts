export type User = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
};

const defaultUsers: User[] = [
  { name: 'Admin', email: 'admin@ib.com', password: 'AdminPass123!', role: 'admin' },
  { name: 'Talal Al Chammat', email: 'talalm26@ib.com', password: 'LoveIB26!', role: 'user' },
  { name: 'Abdelrahman Mohammed', email: 'abrahm26@ib.com', password: 'LoveIB26!', role: 'user' },
  { name: 'Ali Hinai', email: 'alim26@ib.com', password: 'LoveIB26!', role: 'user' }
];

const USERS_KEY = 'ib-central-users';
const CURRENT_USER_KEY = 'ib-central-current-user';

function loadUsers(): User[] {
  const stored = localStorage.getItem(USERS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as User[];
    } catch (_) {
      return defaultUsers;
    }
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  return defaultUsers;
}

export function login(email: string, password: string): User | null {
  const users = loadUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  }
  return null;
}

export function getCurrentUser(): User | null {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as User;
    } catch (_) {
      return null;
    }
  }
  return null;
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}