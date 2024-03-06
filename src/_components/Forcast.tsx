import { PuffLoader } from "react-spinners";
import useSWR from "swr";
import { useCoordinatesState } from "../contexts/hooks";
import axiosClient from "../lib/axiosClient";
import { NoContent } from "../ui/NoContent";
import { Accordion } from "./../ui/Accordion";
const WEEK_DAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
] as const;

export const Forecast = () => {
	const { cityInfo } = useCoordinatesState();

	const fetcher = async (url: string) => {
		return await axiosClient.OPENWETHER_API.get(url).then((res) => res.data);
	};
	const { data: forecast, isLoading } = useSWR<ForecastApiOutput>(
		cityInfo.name !== "unknown" &&
			`/forecast?lat=${cityInfo.latitude}&lon=${cityInfo.longitude}`,
		fetcher
	);
	const dayInAWeek = new Date().getDay();
	const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
		WEEK_DAYS.slice(0, dayInAWeek)
	);
	return (
		<>
			<h2 className=" font-semibold text-4xl my-4">Daily</h2>
			<Accordion asChild type="multiple">
				<section className="relative h-full remove-scroll-bar  overflow-y-scroll flex flex-col  w-full    gap-4">
					{isLoading ? (
						<div className=" absolute inset-0  h-full flex justify-center items-center">
							<PuffLoader loading={true} className=" size-60" color="#ffff00" />
						</div>
					) : (
						<>
							{forecast && forecast?.list.length > 0 ? (
								forecast.list.splice(0, 7).map((item, index) => (
									<Accordion.Item key={index} value={forecastDays[index]}>
										<Accordion.Btn className="text-sm mn:text-base   text-neutral-revert w-full flex-1 p-2 flex bg-neutral/30 backdrop-blur-md rounded-md justify-between shadow items-center">
											<img
												className=" size-10 mn:size-14"
												src={`icons/${item.weather[0].icon}.png`}
												alt="weather icon"
											/>
											<p className="   whitespace-nowrap">
												{forecastDays[index]}
											</p>
											<p className="   whitespace-nowrap">
												{item.weather[0].description}
											</p>
											<p className="   whitespace-nowrap">
												{Math.round(item.main.temp_max)}/
												{Math.round(item.main.temp_min)}°C
											</p>
										</Accordion.Btn>
										<Accordion.Content asChild>
											<div className="grid grid-cols-2 p-2  bg-primary/30 overflow-hidden data-[state=open]:animate-[slideDown_300ms_ease-out] data-[state=closed]:animate-[slideUp_300ms_ease-out]     ">
												<div>
													<p>Pressure : {item.main.pressure}</p>
												</div>
												<div>
													<p>Humidity : {item.main.humidity}</p>
												</div>
												<div>
													<p>Clouds : {item.clouds.all}%</p>
												</div>
												<div>
													<p>Wind speed : {item.wind.speed} m/s</p>
												</div>
												<div>
													<p>Sea level : {item.main.sea_level}m</p>
												</div>
												<div>
													<p>Feels like : {item.main.feels_like}°C</p>
												</div>
											</div>
										</Accordion.Content>
									</Accordion.Item>
								))
							) : (
								<NoContent caption="no forcast is available" />
							)}
						</>
					)}
				</section>
			</Accordion>
		</>
	);
};
