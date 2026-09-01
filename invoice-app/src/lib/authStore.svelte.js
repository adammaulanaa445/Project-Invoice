const USERS_KEY = 'invoicekita_users';

function loadUsers() {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(list) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}

function generateToken() {
  return 'tok_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
}

function saveSession(user, token) {
  localStorage.setItem('auth_token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

export const authStore = {
  // Daftar akun baru. Lempar Error kalau email sudah dipakai.
  register(name, email, password) {
    const users = loadUsers();
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      throw new Error('Email sudah terdaftar. Silakan login.');
    }

    const newUser = { id: 'usr_' + Date.now(), name, email, password };
    users.push(newUser);
    saveUsers(users);

    const publicUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    saveSession(publicUser, generateToken());
    return publicUser;
  },

  // Login. Lempar Error kalau email/password salah.
  login(email, password) {
    const users = loadUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found || found.password !== password) {
      throw new Error('Email atau password salah.');
    }

    const publicUser = { id: found.id, name: found.name, email: found.email };
    saveSession(publicUser, generateToken());
    return publicUser;
  },

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
};