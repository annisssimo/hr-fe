import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ResumeState {
    resumeText: string;
    jobText: string;
    matchPercentage: number;
    isLoading: boolean;
}

const initialState: ResumeState = {
    resumeText: '',
    jobText: '',
    matchPercentage: 0,
    isLoading: false,
};

const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers: {
        setResumeText(state, action: PayloadAction<string>) {
            state.resumeText = action.payload;
        },
        setJobText(state, action: PayloadAction<string>) {
            state.jobText = action.payload;
        },
        setMatchPercentage(state, action: PayloadAction<number>) {
            state.matchPercentage = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
});

export const { setResumeText, setJobText, setMatchPercentage, setLoading } = resumeSlice.actions;
export default resumeSlice.reducer;
