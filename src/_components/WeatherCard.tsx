import useSWR from "swr";
import axiosClient from "../lib/axiosClient";
import { PuffLoader } from "react-spinners";

export const WeatherCard = ({
	cityInfo,
}: {
	cityInfo: {
		name: string;
		latitude: number;
		longitude: number;
	};
}) => {
	const fetcher = async (url: string) => {
		return await axiosClient.OPENWETHER_API.get(url).then((res) => res.data);
	};
	const { data: weather, isLoading } = useSWR<WeatherApiOutput>(
		cityInfo && `/weather?lat=${cityInfo.latitude}&lon=${cityInfo.longitude}`,
		fetcher
	);
	console.log("weather", weather);
	console.log("cityInfo", cityInfo);
	return (
		<div className=" relative bg-primary/30 space-y-2 backdrop-blur-md p-4 w-full   rounded-md shadow-md">
			{isLoading ? (
				<div className="  flex h-40 justify-center items-center">
					<PuffLoader loading={true} className=" size-60" color="#ffff00" />
				</div>
			) : (
				weather && (
					<>
						<div className=" flex justify-between ">
							<div>
								<h3 className="  capitalize text-3xl">{cityInfo.name}</h3>
								<p className=" text-base">{weather.weather[0].description}</p>
							</div>
							<img
								alt="weather"
								className="size-20 -z-10 absolute top-0 right-0"
								src={`icons/${weather.weather[0].icon}.png`}
							/>
						</div>
						<div className="flex justify-between items-center">
							<p className="text-5xl font-semibold">
								{Math.round(weather.main.temp)}°C
							</p>
							<div className="text-sm">
								<div className="flex justify-between gap-4">
									<span>Feels like</span>
									<span>{Math.round(weather.main.feels_like)}°C</span>
								</div>
								<div className="flex justify-between gap-4">
									<span>Wind</span>
									<span>{weather.wind.speed} m/s</span>
								</div>
								<div className="flex justify-between gap-4">
									<span>Humidity</span>
									<span>{weather.main.humidity}%</span>
								</div>
								<div className="flex justify-between gap-4">
									<span>Pressure</span>
									<span>{weather.main.pressure} hPa</span>
								</div>
							</div>
						</div>
					</>
				)
			)}
		</div>
	);
};
