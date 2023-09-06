import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "./api/github.api";

export const store = configureStore({
	reducer: {
		[githubApi.reducerPath]: githubApi.reducer
	},
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(githubApi.middleware),
})