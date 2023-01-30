import React, { useState, useEffect } from "react";

const App = () => {
	const [query, setQuery] = useState("");
	const [location, setLocation] = useState<any>({});
	const [error, setError] = useState("");
	const [confirmedLocation, setConfirmedLocation] = useState<any>({});
	const [weather, setWeather] = useState<any>({});

	function formatDate(date: any) {
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const day = date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear();
		return `${day} ${month}, ${year}`;
	}

	useEffect(() => {
		if (query === "") {
			return;
		}
		try {
			fetch(
				`http://api.weatherapi.com/v1/current.json?key=b5be2422dbbf489699263217233001&q=${query}`
			)
				.then((res) => {
					if (!res.ok) {
						throw new Error("Failed to fetch weather data");
					}
					return res.json();
				})
				.then((result) => {
					setLocation(result.location);
					setError("");
				})
				.catch((error) => {
					setError(error.message);
				});
		} catch {}
	}, [query]);

	useEffect(() => {
		if (confirmedLocation.name === "") {
			return;
		}
		try {
			fetch(
				`http://api.weatherapi.com/v1/current.json?key=b5be2422dbbf489699263217233001&q=${confirmedLocation.name}`
			)
				.then((res) => {
					if (!res.ok) {
						throw new Error("Failed to fetch weather data");
					}
					return res.json();
				})
				.then((result) => {
					console.log(result);
					setWeather(result.current);
				});
		} catch {}
	}, [confirmedLocation]);

	useEffect(() => {
		if (weather.condition === undefined) return;
		if (weather.condition.text === "Sunny")
			document.body.style.backgroundImage = "url(./assets/images/sunny.jpg)";
		else if (weather.condition.text === "Partly cloudy")
			document.body.style.backgroundImage =
				"url(./assets/images/partly-cloudy.jpg)";
		else if (weather.condition.text === "Cloudy")
			document.body.style.backgroundImage = "url(./assets/images/cloudy.jpg)";
		else if (weather.condition.text === "Overcast")
			document.body.style.backgroundImage = "url(./assets/images/overcast.jpg)";
		else if (weather.condition.text === "Mist")
			document.body.style.backgroundImage = "url(./assets/images/mist.jpg)";
		else if (weather.condition.text === "Patchy rain possible")
			document.body.style.backgroundImage =
				"url(./assets/images/patchy-rain-possible.jpg)";
		else if (weather.condition.text === "Patchy snow possible")
			document.body.style.backgroundImage =
				"url(./assets/images/patchy-snow-possible.jpg)";
		else if (weather.condition.text === "Patchy sleet possible")
			document.body.style.backgroundImage =
				"url(./assets/images/patchy-sleet-possible.jpg)";
		else if (weather.condition.text === "Patchy freezing drizzle possible")
			document.body.style.backgroundImage =
				"url(./assets/images/patchy-freezing-drizzle-possible.jpg)";
		else if (weather.condition.text === "Thundery outbreaks possible")
			document.body.style.backgroundImage =
				"url(./assets/images/thundery-outbreaks-possible.jpg)";
		else if (weather.condition.text === "Blowing snow")
			document.body.style.backgroundImage =
				"url(./assets/images/blowing-snow.jpg)";
		else if (weather.condition.text === "Blizzard")
			document.body.style.backgroundImage = "url(./assets/images/blizzard.jpg)";
		else if (weather.condition.text === "Fog")
			document.body.style.backgroundImage = "url(./assets/images/fog.jpg)";
		else if (weather.condition.text === "Freezing fog")
			document.body.style.backgroundImage =
				"url(./assets/images/freezing-fog.jpg)";
		else if (weather.condition.text === "Patchy light drizzle")
			document.body.style.backgroundImage =
				"url(./assets/images/patchy-light-drizzle.jpg)";
		else if (weather.condition.text === "Light drizzle")
			document.body.style.backgroundImage =
				"url(./assets/images/light-drizzle.jpg)";
		else if (weather.condition.text === "Clear") {
			console.log("clear");
			document.body.style.backgroundImage = "url(./assets/images/clear.jpg)";
		}
	}, [weather]);

	return (
		<div className="grid grid-cols-[70%_30%] overflow-hidden">
			<div className="flex w-full h-[100vh] justify-between p-[3rem] gap-[3rem] flex-col">
				<h1 className="text-2xl text-black font-bold">
					the.<span className="text-white">weather</span>
				</h1>
				{weather.temp_c && (
					<div className="flex items-end gap-[3rem] flex-wrap">
						<div className="flex items-start">
							<p className="text-9xl text-white font-bold">
								{weather.temp_c}
								<sup>o</sup>
							</p>
						</div>
						<div className="flex flex-col text-white pb-[0.5rem]">
							<span className="text-5xl">{location.name}</span>
							<div className="text-md">{formatDate(new Date())}</div>
						</div>
						<div className="flex flex-col text-white pb-[0.5rem]">
							<img
								className="w-[50px] h-[50px]"
								src={weather.condition.icon}
								alt=""
							/>
							<span className="text-2xl">{weather.condition.text}</span>
						</div>
					</div>
				)}
			</div>
			<header className="relative h-[100vh] w-full backdrop-blur-xl bg-[#1d1e24]/20">
				<div className="flex ">
					<input
						type="text"
						placeholder="Enter city"
						className="border-b-2 border-[#45565e] p-[0.5rem_1rem] w-full h-[100px] focus:outline-none bg-transparent text-white text-xl"
						onChange={(e) => setQuery(e.target.value)}
					/>
					<div className="w-[150px] h-[100px] bg-[#d66c05] flex justify-center items-center text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							className="h-6 w-6 stroke-black"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/>
						</svg>
					</div>
				</div>
				{location.name && (
					<div className="p-[2rem_1rem] flex flex-col gap-[0.5rem]">
						<p
							className="p-[0.5rem_0] text-white cursor-pointer"
							onClick={() => setConfirmedLocation({ name: location.name })}
						>
							{location.name}, {location.region}
						</p>
					</div>
				)}
				{weather.feelslike_c && (
					<div className="p-[2rem_1rem] flex flex-col gap-[0.5rem] border-t-2 border-[#45565e]">
						<h2 className="text-3xl font-[600]">Weather Details</h2>
						<p className="text-white">
							Feels like: {weather.feelslike_c}
							<sup>o</sup>
						</p>
						<p className="text-white">
							Humidity: {weather.humidity}
							<sup>%</sup>
						</p>
						<p className="text-white">
							Wind: {weather.wind_kph}
							<sup>kph</sup>
						</p>
					</div>
				)}
			</header>
		</div>
	);
};

export default App;
