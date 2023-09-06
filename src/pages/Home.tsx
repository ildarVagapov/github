import { useEffect, useState } from "react"
import { Header } from "../components/Header"
import { useSearchUsersQuery } from "../store/api/github.api"
import { useDebounce } from "../hooks/debounce"


export const Home = () => {

	const [text, setText] = useState('')
	const debounce = useDebounce(text)
	const { isLoading, isError, data } = useSearchUsersQuery(debounce, { skip: debounce.length < 3 })

	useEffect(() => {

	}, [debounce])

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

					<ul className="list-none absolute right-0 overflow-auto left-0 max-h-[200px] bg-white shadow-md top-[92px] px-[10px] py-[10px]">
						{isLoading && <p>Загрузка...</p>}
						{data?.map(user => (
							<li key={user.id}>{user.login}</li>
						))}
					</ul>
				</div>


			</main>
		</>
	)
}