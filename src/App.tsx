import { useClickOutside } from "@mantine/hooks";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { Forecast } from "./_components/Forcast";
import { WeatherCard } from "./_components/WeatherCard";
import axiosClient from "./lib/axiosClient";
import { Btn } from "./ui/Btn";
import { ContentInput } from "./ui/ContentInput";

type CityInfoType = {
	id: number;
	name: string;
	countryCode: string;
	latitude: number;
	longitude: number;
};
function App() {
	const [cities, setCities] = useState<CityInfoType[]>([]);
	const [searchIsOpen, setsearchIsOpen] = useState(false);
	const [wetherForecast, setWetherForecast] = useState<{
		city: string;
		current: {
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
		};
		forecast: {
			list: {
				main: {
					feels_like: number;
					temp_min: number;
					temp_max: number;
					pressure: number;
					sea_level: number;
					humidity: number;
				};
				weather: [
					{
						id: number;
						main: string;
						description: string;
						icon: string;
					}
				];
				clouds: {
					all: number;
				};
				wind: {
					speed: number;
				};
			}[];
		};
	}>();
	const searchForCities = async (value: string) => {
		setsearchIsOpen(true);
		await axiosClient.GEO_API.get<AxiosResponse<CityInfoType[]>>(
			`/cities?minPopulation=1000000&namePrefix=${value}`
		)
			.then((res) => {
				console.log(res.data);
				setCities(
					res.data.data.map((city) => {
						return {
							id: city.id,
							name: city.name,
							countryCode: city.countryCode,
							latitude: city.latitude,
							longitude: city.longitude,
						};
					})
				);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getWeatherForecast = async ({
		city,
		latitude,
		longitude,
	}: {
		city: string;
		latitude: number;
		longitude: number;
	}) => {
		setsearchIsOpen(false);
		const getForecast = axiosClient.OPENWETHER_API.get(
			`/forecast?lat=${latitude}&lon=${longitude}&units=metric`
		);
		const getCurrentWeather = axiosClient.OPENWETHER_API.get(
			`/weather?lat=${latitude}&lon=${longitude}&units=metric`
		);
		await Promise.all([getCurrentWeather, getForecast])
			.then(async (res) => {
				const weather = await res[0].data;
				const forecast = await res[1].data;
				console.log(forecast);
				setWetherForecast({
					city: city,
					current: weather,
					forecast: forecast,
				});
			})
			.catch((err) => console.error(err));
	};

	const searchResualtRef = useClickOutside(() => {
		setsearchIsOpen(false);
	});
	return (
		<>
			<header className=" z-40 fixed w-full bg-primary/40 shadow-sm p-4  ">
				<div className=" relative flex justify-center items-center container">
					<ContentInput
						resetOnSubmit={false}
						isValidating={false}
						mutate={searchForCities}
					/>
					{searchIsOpen && (
						<div
							ref={searchResualtRef}
							className=" top-full  mt-8 absolute w-full max-w-[400px] flex flex-col gap-2"
						>
							{cities.map((city) => {
								return (
									<Btn
										key={city.id}
										onClick={() =>
											getWeatherForecast({
												city: city.name,
												latitude: city.latitude,
												longitude: city.longitude,
											})
										}
										className=" text-neutral-revert rounded-sm p-2 bg-sky-300"
									>
										<p>
											{city.name},{city.countryCode}
										</p>
									</Btn>
								);
							})}
							{cities?.length === 0 && (
								<div className=" text-neutral-revert rounded-sm p-2 bg-sky-300">
									city not found
								</div>
							)}
						</div>
					)}
				</div>
			</header>
			<main className="min-h-screen flex pt-24  flex-col  items-center">
				{wetherForecast?.current && (
					<WeatherCard city={wetherForecast.city} {...wetherForecast.current} />
				)}

				{wetherForecast?.forecast && (
					<Forecast list={wetherForecast.forecast.list} />
				)}
			</main>
		</>
	);
}

export default App;
