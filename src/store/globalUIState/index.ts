import { createSlice } from '@reduxjs/toolkit';

type TGlobalUIState = {
    showSidebar: boolean;
};

const initialState: TGlobalUIState = {
    showSidebar: false,
};

const globalUiStateSlice = createSlice({
    name: 'globalUIState',
    initialState,
    reducers: {
        SHOW_SIDEBAR: (state) => {
            const sidebar = document.querySelector('#sidebar')! as HTMLElement;
            sidebar.style.display = 'block';
            state.showSidebar = !state.showSidebar;
        },

        HIDE_SIDEBAR: (state) => {
            const sidebar = document.querySelector('#sidebar')! as HTMLElement;
            sidebar.style.display = 'none';
            state.showSidebar = !state.showSidebar;
        },
    },
});

export const { SHOW_SIDEBAR, HIDE_SIDEBAR } = globalUiStateSlice.actions;
export default globalUiStateSlice.reducer;
