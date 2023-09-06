import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser, ServerResponse } from '../../models/models'

export const githubApi = createApi({
	reducerPath: 'github/api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.github.com/'
	}),
	endpoints: (builder) => ({
		searchUsers: builder.query<IUser[], string>({
			query: (search: string) => ({
				url: `search/users`,
				params: {
					q: search,
					par_page: 10
				}
			}),
			transformResponse: (response: ServerResponse<IUser>) => response.items
		})
	}),
})

export const { useSearchUsersQuery } = githubApi