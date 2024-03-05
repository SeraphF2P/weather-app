import { useClickOutside, useDebouncedState } from "@mantine/hooks";
import { useState } from "react";
import useSWR from "swr";
import { useCordinateState } from "../contexts/hooks";
import axiosClient from "../lib/axiosClient";
import { Btn } from "../ui/Btn";
import { Icon } from "../ui/Icons";

export const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useDebouncedState("", 500);
	const searchResualtRef = useClickOutside(() => {
		setIsOpen(false);
	});
	const searchForCities = async (url: string) => {
		return await axiosClient.GEO_API.get(url).then((res) => res.data);
	};
	const { data } = useSWR<{
		data: (CityInfoType & { id: number; countryCode: string })[];
	}>(`/cities?minPopulation=1000000&namePrefix=${search}`, searchForCities, {
		keepPreviousData: true,
		revalidateOnMount: false,
	});
	const [, setcityInfo] = useCordinateState();
	const cities = data?.data;
	return (
		<header className=" z-40 fixed w-full  p-4  ">
			<div className=" relative flex justify-center items-center container">
				<div
					className={
						"max-w-[320px] rounded-sm h-12  relative  bg-neutral  flex w-full  items-center"
					}
				>
					<input
						className="  px-2 placeholder:capitalize  bg-transparent  absolute inset-0"
						type="text"
						placeholder="enter city name"
						onChange={(e) => {
							setIsOpen(true);
							setSearch(e.target.value);
						}}
					/>
					<Icon.search className=" absolute right-2 fill-neutral-revert size-8 " />
				</div>
				{isOpen && (
					<div
						ref={searchResualtRef}
						className=" top-full  mt-8 absolute w-full max-w-[400px] flex flex-col gap-2"
					>
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
							<div className=" text-neutral-revert rounded-sm p-2 bg-sky-300">
								city not found
							</div>
						)}
					</div>
				)}
			</div>
		</header>
	);
};
