import { useCoordinatesState } from "../contexts/hooks";
import { NoContent } from "../ui/NoContent";
import { Forecast } from "./Forcast";
import { WeatherCard } from "./WeatherCard";

export const Main = () => {
	const { cityInfo } = useCoordinatesState();
	return (
		<>
			<main className=" sm:shadow relative   h-screen  flex pt-24 max-w-[420px] mx-auto px-4 mn:px-8 flex-col  items-center">
				<img
					className=" absolute  inset-0 -z-10  object-cover w-full h-full "
					src="layer-1.jpg"
				/>
				{cityInfo.name === "unknown" ? (
					<NoContent caption="sorry this app is not supportet in your country" />
				) : (
					<>
						<WeatherCard />
						<Forecast />
					</>
				)}
			</main>
		</>
	);
};
