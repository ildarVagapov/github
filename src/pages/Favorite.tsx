import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { removeToFav } from "../store/slices/sliceGithub"

export const Favorite = () => {

	const fav = useSelector((state: RootState) => state.github.favorite)
	const dispatch = useDispatch()

	return (
		<div className="flex justify-center mx-auto h-screen w-screen mt-[50px]  ">
			<div className="flex flex-col">
				{fav.map(f => (
					<>
						<a target="_blank" className="hover:text-slate-500 transition-colors font-medium mb-[10px]" href={f}>{f}</a>
						<button onClick={() => dispatch(removeToFav(f))}>удалить</button>
					</>
				))}
			</div>
		</div>
	)
}