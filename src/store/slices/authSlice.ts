import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<string>) {
            state.token = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload); // persist token
        },
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token'); // clear token
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
