import { FC } from "react";

interface WeatherCardProps {
	city: string;
	weather: [{ description: string; icon: string }];
	main: {
		temp: number;
		feels_like: number;
		humidity: string;
		pressure: string;
	};
	wind: {
		speed: string;
	};
}

export const WeatherCard: FC<WeatherCardProps> = (props) => {
	return (
		<div className=" relative bg-primary/30 space-y-2 backdrop-blur-md p-4 min-w-[300px] max-w-[400px]  rounded-md shadow-md">
			<div className=" flex justify-between ">
				<div>
					<h3 className="  capitalize text-3xl">{props.city}</h3>
					<p className=" text-base">{props.weather[0].description}</p>
				</div>
				<img
					alt="weather"
					className="size-20 -z-10 absolute top-0 right-0"
					src={`icons/${props.weather[0].icon}.png`}
				/>
			</div>
			<div className="flex justify-between items-center">
				<p className="text-5xl font-semibold">
					{Math.round(props.main.temp)}°C
				</p>
				<div className="text-sm">
					<div className="flex justify-between gap-4">
						<span>Feels like</span>
						<span>{Math.round(props.main.feels_like)}°C</span>
					</div>
					<div className="flex justify-between gap-4">
						<span>Wind</span>
						<span>{props.wind.speed} m/s</span>
					</div>
					<div className="flex justify-between gap-4">
						<span>Humidity</span>
						<span>{props.main.humidity}%</span>
					</div>
					<div className="flex justify-between gap-4">
						<span>Pressure</span>
						<span>{props.main.pressure} hPa</span>
					</div>
				</div>
			</div>
		</div>
	);
};
