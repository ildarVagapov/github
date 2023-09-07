import { useEffect, useState } from "react"
import { useLazyGetUserReposQuery, useSearchUsersQuery } from "../store/api/github.api"
import { useDebounce } from "../hooks/debounce"
import { ReposItem } from "../components/ReposItem"


export const Home = () => {

	const [text, setText] = useState('')
	const [dropdown, setDropdown] = useState(false)
	const debounce = useDebounce(text)
	const { isLoading, isError, data } = useSearchUsersQuery(debounce, { skip: debounce.length < 3, refetchOnFocus: false })
	const [fetchRepos, { data: repos, isLoading: loadingRepos }] = useLazyGetUserReposQuery()

	useEffect(() => {
		setDropdown(text.length > 0)
	}, [debounce, text])

	const handlerClick = (username: string) => {
		fetchRepos(username)
		setDropdown(false)
	}


	return (
		<>
			<main className="flex justify-center mx-auto h-screen w-screen ">
				{isError && <p>Произошла ошибка </p>}

				<div className="relative w-[550px]" >
					<input
						type="text"
						placeholder="Поиск пользователей"
						className="border rounded-[2px] mt-10 w-full h-[42px] py-2 px-4 mb-2 focus:outline-none focus:ring-1 focus:ring-black"
						value={text}
						onChange={e => setText(e.target.value)}
					/>
					{
						dropdown &&
						<ul className="list-none absolute right-0 overflow-auto left-0 max-h-[200px] bg-white shadow-md top-[92px]  py-[10px]">
							{isLoading && <p>Загрузка...</p>}
							{!data?.length
								? <li className="px-[5px]">Такого пользователя нет</li>
								: data.map(user => (
									<li
										onClick={() => handlerClick(user.login)}
										className="py-[5px] hover:bg-slate-800 hover:text-white px-[10px] transition-colors cursor-pointer "
										key={user.id}>{user.login}
									</li>
								))}
						</ul>
					}

					<div className="container mt-[30px]">
						{loadingRepos && <p className="text-center">Загрузка репозиторий...</p>}
						{repos?.map(repo => <ReposItem repo={repo} />)}
					</div>
				</div>

			</main>
		</>
	)
}