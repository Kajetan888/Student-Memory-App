import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    users: JSON.parse(localStorage.getItem('users')) || [],
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    alert: { message: '', type: 'error' },
  }),
  actions: {
    clearAlert() {
      this.alert = { message: '', type: 'error' };
    },
    fetchUser() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.user = user;
      }
    },
    signIn(email, password) {
      this.clearAlert();
      const existingUser = this.users.find(user => user.email === email && user.password === password);
      if (existingUser) {
        this.user = existingUser;
        localStorage.setItem('user', JSON.stringify(existingUser));
      } else {
        this.alert = { message: 'Invalid email or password', type: 'error' };
      }
    },
    signOut() {
      this.user = null;
      localStorage.removeItem('user');
    },
    signUp(email, password) {
      this.clearAlert();
      const existingUser = this.users.find(user => user.email === email);
      if (existingUser) {
        this.alert = { message: 'Email already exists', type: 'error' };
      } else {
        const newUser = { id: Date.now().toString(), email, password };
        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        this.user = newUser;
        localStorage.setItem('user', JSON.stringify(newUser));
        this.alert = { message: 'User registered successfully', type: 'success' };
      }
    },
    addTodo(todo) {
      this.todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    editTodo(todo) {
      var foundTodo = this.todos.find(obj => obj.id === todo.id);
      Object.assign(foundTodo, todo);
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    fetchTodos(userId) {
      return this.todos.filter(todo => todo.user_id === userId);
    },
    exportDatabase(type) {
      if (type === 'users') {
        return JSON.stringify(this.users, null, 2);
      } else if (type === 'todos') {
        const todosWithoutThumbnails = this.todos.map(({ thumbnail, ...todo }) => todo);
        return JSON.stringify(todosWithoutThumbnails, null, 2);
      }
    },
    importDatabase(type, data) {
      if (type === 'users') {
        this.users = JSON.parse(data);
        localStorage.setItem('users', JSON.stringify(this.users));
      } else if (type === 'todos') {
        this.todos = JSON.parse(data);
        localStorage.setItem('todos', JSON.stringify(this.todos));
      }
    },
  },
});