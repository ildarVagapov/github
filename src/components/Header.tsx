import { Link } from "react-router-dom"

export const Header = () => {
	return (
		<div className="flex justify-between px-[50px] py-[15px] text-white bg-gray-800 ">
			<h3 className="font-bold">GitHub Search</h3>
			<div>
				<Link className="p-[20px]" to="/">Home</Link>
				<Link to="/favorite">Favorite</Link>
			</div>
		</div>
	)
}