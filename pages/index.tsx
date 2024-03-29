import { useEffect } from "react"
import { Navbar } from "../components/navbar/Navbar"
import Head from "next/head"
import { useToast } from "@chakra-ui/toast"
import { Hero } from "../components/hero/Hero"

const Home: React.FC = () => {
	const toast = useToast()

	useEffect(() => {
		const cookieItem = window.localStorage.getItem("cookie-info")
		const analyticsItem = window.localStorage.getItem("analytics-info")
		if (!cookieItem) {
			toast({
				status: "info",
				title: "Cookies & data",
				description:
					"This website stores cookies and data in your browser for a better user experience.",
				isClosable: true,
				onCloseComplete: () =>
					window.localStorage.setItem("cookie-info", String(true)),
				duration: 5000,
				position: "bottom-left",
				variant: "solid",
				id: 1,
			})
		}
		if (!analyticsItem) {
			setTimeout(() => {
				toast({
					status: "info",
					title: "Analytics",
					description:
						"This website collects anonymous analytics data, which is used to improve the application.",
					isClosable: true,
					onCloseComplete: () =>
						window.localStorage.setItem("analytics-info", String(true)),
					duration: 5000,
					position: "bottom-left",
					variant: "solid",
					id: 2,
				})
			}, 6000)
		}
	})

	return (
		<>
			<Head>
				<title>Index - Pinterface</title>
				<meta name="viewport" content="width=device-width"></meta>
			</Head>
			<Navbar />
			<Hero />
		</>
	)
}
export default Home
