import { createSlice } from '@reduxjs/toolkit';

// Who is signed in. `status` starts as 'loading' while the saved session is restored.
const authSlice = createSlice({
  name: 'auth',
  initialState: { status: 'loading', user: null },
  reducers: {
    signedIn: (state, action) => {
      state.status = 'signedIn';
      state.user = action.payload;
    },
    signedOut: (state) => {
      state.status = 'signedOut';
      state.user = null;
    },
  },
});

export const { signedIn, signedOut } = authSlice.actions;
export default authSlice.reducer;
