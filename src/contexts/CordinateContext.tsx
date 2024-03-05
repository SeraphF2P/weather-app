/* eslint-disable @typescript-eslint/no-empty-function */
import { useLocalStorage } from "@mantine/hooks";
import { PropsWithChildren, createContext } from "react";
import axiosClient from "../lib/axiosClient";

export const Context = createContext<
	ReturnType<typeof useLocalStorage<CityInfoType>>
>([{ name: "unknown", latitude: 0, longitude: 0 }, () => {}, () => {}]);

export const CordinateContext = ({ children }: PropsWithChildren) => {
	const [cityInfo, setcityInfo, clear] = useLocalStorage<CityInfoType>({
		key: "city-info",
	});
	if (cityInfo == null) {
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
	}
	return (
		<Context.Provider value={[cityInfo, setcityInfo, clear]}>
			{children}
		</Context.Provider>
	);
};
