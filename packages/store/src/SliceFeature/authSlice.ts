import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import axios from "axios";
import app from "./firebase"

interface AuthState {
    user: User | null;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: false
};

const auth = getAuth(app);

// Check user authentication state (runs on app startup)
export const checkAuthState = createAsyncThunk("auth/checkAuth", async () => {
    return new Promise<User | null>((resolve) => {
        onAuthStateChanged(auth, async (firebaseUser) => {
            resolve(firebaseUser || null);
        });
    });
});

// Login user via API
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }: { email: string; password: string }) => {
        const res = await axios.post("http://localhost:5000/api/v1/login", { email, password }, { withCredentials: true });
        return res.data.user;
    }
);

// Logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    await axios.post("http://localhost:5000/api/v1/logout", {}, { withCredentials: true });
    await signOut(auth); // Sign out from Firebase as well
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle authentication state check
        builder.addCase(checkAuthState.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(checkAuthState.fulfilled, (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(checkAuthState.rejected, (state) => {
            state.loading = false;
        });

        // Handle login
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(loginUser.rejected, (state) => {
            state.loading = false;
        });

        // Handle logout
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
        });
    }
});

export default authSlice.reducer;
