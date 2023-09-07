import { useDispatch, useSelector } from "react-redux"
import { IRepo } from "../models/models"
import { addToFav, removeToFav } from "../store/slices/sliceGithub"
import { RootState } from "../store/store"
import { useState } from "react"


export const ReposItem = ({ repo }: { repo: IRepo }) => {

	const favorites = useSelector((state: RootState) => state.github.favorite)
	const [isFav, setIsFav] = useState(favorites.includes(repo.html_url))

	const dispatch = useDispatch()

	const addToFavClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		dispatch(addToFav(repo.html_url))
		setIsFav(true)
	}

	const removeToFavClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		dispatch(removeToFav(repo.html_url))
		setIsFav(false)
	}

	return (
		<div className="border py-3 px-5 rounded mb-4 hover:shadow-md hover:bg-gray-200 transition-all" >
			<a href={repo.html_url} target="_blank">
				<h2 className="text-lg font-bold">{repo.full_name}</h2>
			</a>
			<p className="text-sm">
				Forks:<span className="font-bold mr-2">{repo.forks}</span>
				Watchers:<span className="font-bold ">{repo.watchers}</span>
			</p>
			<p className="text-sm font-thin ">{repo?.description}</p>
			{!isFav && <button onClick={addToFavClick} className="rounded py-2 px-4 bg-yellow-400 mt-[10px] hover:bg-yellow-300 transition-all mr-[10px]">Add</button>}
			{isFav && <button onClick={removeToFavClick} className="rounded py-2 px-4 bg-red-400 mt-[10px] hover:bg-red-300 transition-all">Remove</button>}
		</div >
	)
}