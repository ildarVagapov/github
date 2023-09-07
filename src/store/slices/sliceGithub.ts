import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const KEY_RFC = 'rfc'

interface Favorite {
	favorite: string[]
}

const initialState: Favorite = {
	favorite: JSON.parse(localStorage.getItem(KEY_RFC) ?? '[]')
}

const sliceGithub = createSlice({
	name: 'github',
	initialState,
	reducers: {
		addToFav: (state, action: PayloadAction<string>) => {
			state.favorite.push(action.payload)
			localStorage.setItem(KEY_RFC, JSON.stringify(state.favorite))
		},
		removeToFav: (state, action: PayloadAction<string>) => {
			state.favorite = state.favorite.filter(f => f !== action.payload)
			localStorage.setItem(KEY_RFC, JSON.stringify(state.favorite))
		},
	}
})

export const { addToFav, removeToFav } = sliceGithub.actions
export const reducerGithub = sliceGithub.reducer