import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "./api/github.api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { reducerGithub } from "./slices/sliceGithub";

export const store = configureStore({
	reducer: {
		[githubApi.reducerPath]: githubApi.reducer,
		github: reducerGithub
	},
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(githubApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)