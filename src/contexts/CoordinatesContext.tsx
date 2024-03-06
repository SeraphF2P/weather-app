/* eslint-disable @typescript-eslint/no-empty-function */
import { useLocalStorage } from "@mantine/hooks";
import { PropsWithChildren, createContext, useEffect } from "react";
import axiosClient from "../lib/axiosClient";

export const Context = createContext<{
	cityInfo: CityInfoType;
	setcityInfo: (val: CityInfoType) => void;
	getCurrentPosition: () => void;
}>({
	cityInfo: { name: "unknown", latitude: 0, longitude: 0 },
	setcityInfo: () => {},
	getCurrentPosition: () => {},
});

export const CoordinatesContext = ({ children }: PropsWithChildren) => {
	const [cityInfo, setcityInfo] = useLocalStorage<CityInfoType>({
		key: "city-info",
		defaultValue: {
			name: "unknown",
			latitude: 0,
			longitude: 0,
		},
	});
	const getCurrentPosition = () => {
		navigator.geolocation.getCurrentPosition(async (data) => {
			const latitude = data.coords.latitude;
			const longitude = data.coords.longitude;
			await axiosClient.LOCATIONIQ_API.get("", {
				params: {
					lat: latitude,
					lon: longitude,
				},
			}).then((res) => {
				if (res.data?.address?.city) {
					setcityInfo({ name: res.data.address.city, latitude, longitude });
				}
			});
		});
	};
	useEffect(() => {
		if (cityInfo.name == "unknown") {
			getCurrentPosition();
		}
	});
	return (
		<Context.Provider value={{ cityInfo, setcityInfo, getCurrentPosition }}>
			{children}
		</Context.Provider>
	);
};
