import { Accordion } from "./../ui/Accordion";
const WEEK_DAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];
type ForecastPropsType = {
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
export const Forecast = (props: ForecastPropsType) => {
	const dayInAWeek = new Date().getDay();
	const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
		WEEK_DAYS.slice(0, dayInAWeek)
	);
	return (
		<>
			<h2 className=" font-semibold text-4xl my-4">Daily</h2>
			<Accordion type="single" collapsible>
				<section className="   flex flex-col container p-2 mn:p-4   gap-4">
					{props.list.splice(0, 7).map((item, index) => (
						<Accordion.Item key={index} value={forecastDays[index]}>
							<Accordion.Btn className="text-sm mn:text-base   text-neutral-revert w-full flex-1 p-2 flex bg-neutral/30 backdrop-blur-md rounded-md justify-between shadow items-center">
								<img
									className=" size-10 mn:size-14"
									src={`icons/${item.weather[0].icon}.png`}
									alt="weather icon"
								/>
								<p className="   whitespace-nowrap">{forecastDays[index]}</p>
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
									<div className=" ">
										<p>Pressure:</p>
										<p>{item.main.pressure}</p>
									</div>
									<div className=" ">
										<p>Humidity : {item.main.humidity}</p>
									</div>
									<div className=" ">
										<p>Clouds : {item.clouds.all}%</p>
									</div>
									<div className=" ">
										<p>Wind speed : {item.wind.speed} m/s</p>
									</div>
									<div className=" ">
										<p>Sea level : {item.main.sea_level}m</p>
									</div>
									<div className=" ">
										<p>Feels like : {item.main.feels_like}°C</p>
									</div>
								</div>
							</Accordion.Content>
						</Accordion.Item>
					))}
				</section>
			</Accordion>
		</>
	);
};
