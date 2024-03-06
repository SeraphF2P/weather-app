import { useClickOutside, useDebouncedState } from "@mantine/hooks";
import { useState } from "react";
import useSWR from "swr";
import { useCoordinatesState } from "../contexts/hooks";
import axiosClient from "../lib/axiosClient";
import { Btn } from "../ui/Btn";
import { Icon } from "../ui/Icons";
import { Modale } from "../ui/Modale";

export const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useDebouncedState("", 500);
	const searchResualtRef = useClickOutside(() => {
		setIsOpen(false);
	});
	const searchForCities = async (url: string) => {
		return await axiosClient.GEO_API.get(url).then((res) => res.data);
	};
	const { data, isLoading } = useSWR<{
		data: (CityInfoType & { id: number; countryCode: string })[];
	}>(`/cities?minPopulation=1000000&namePrefix=${search}`, searchForCities, {
		keepPreviousData: true,
		revalidateOnMount: false,
		revalidateOnFocus: true,
		revalidateIfStale: false,
	});
	const { setcityInfo, getCurrentPosition } = useCoordinatesState();

	const cities = data?.data;
	return (
		<header className=" z-40 fixed w-full  p-4  ">
			<div className="max-w-[320px] relative flex justify-center items-center mx-auto">
				<Modale open={isOpen} onOpenChange={setIsOpen}>
					<Modale.Content
						onOpenAutoFocus={(e) => e.preventDefault()}
						className="  -translate-y-8 opacity-0  absolute top-full mt-4 w-full  flex flex-col gap-2"
						ref={searchResualtRef}
					>
						{!isLoading && (
							<>
								{cities?.map((city) => {
									return (
										<Btn
											key={city.id}
											onClick={() => {
												setcityInfo({
													name: city.name,
													latitude: city.latitude,
													longitude: city.longitude,
												});
												setIsOpen(false);
											}}
											className=" text-neutral-revert rounded-sm p-2 shadow-md bg-sky-300"
										>
											<p>
												{city.name},{city.countryCode}
											</p>
										</Btn>
									);
								})}
								{cities?.length === 0 && (
									<div className=" text-center text-neutral-revert rounded-sm p-2 bg-sky-300">
										city not found
									</div>
								)}
							</>
						)}
						{isLoading && (
							<div
								autoFocus={false}
								className=" text-center text-neutral-revert rounded-sm p-2 bg-sky-300"
							>
								loading
							</div>
						)}
					</Modale.Content>
				</Modale>
				<div
					className={
						" rounded-sm  justify-between  relative  bg-neutral h-12  flex w-full  items-center"
					}
				>
					<input
						className="  px-2 placeholder:capitalize  w-full h-full bg-transparent  "
						type="text"
						placeholder="enter city name"
						onFocus={() => setIsOpen(true)}
						onChange={(e) => {
							const value = e.target.value;
							setSearch(value);
							setIsOpen(value !== "");
						}}
					/>
					<Btn
						onClick={getCurrentPosition}
						variant="ghost"
						className=" p-1  h-full aspect-square "
					>
						<Icon.globe className=" fill-neutral-revert size-7 " />
					</Btn>
				</div>
			</div>
		</header>
	);
};
