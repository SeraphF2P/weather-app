import { useCordinateState } from "../contexts/hooks";
import { Icon } from "../ui/Icons";
import { Forecast } from "./Forcast";
import { WeatherCard } from "./WeatherCard";

export const Main = () => {
	const [cityInfo] = useCordinateState();
	return (
		<>
			<main className=" sm:shadow relative  h-screen  flex pt-24 max-w-[420px] mx-auto px-4 mn:px-8 flex-col  items-center">
				<img
					className=" absolute  inset-0 -z-10  object-cover w-full h-full "
					src="layer-1.jpg"
				/>
				{!cityInfo ? (
					<div className=" flex flex-col gap-4 bg-primary/20 rounded-sm backdrop-blur-md w-full h-60 justify-center items-center">
						<Icon.exclamation className="size-20" />
						<p className=" text-lg">no content</p>
					</div>
				) : (
					<>
						<WeatherCard cityInfo={cityInfo} />
						<Forecast cityInfo={cityInfo} />
					</>
				)}
			</main>
		</>
	);
};
