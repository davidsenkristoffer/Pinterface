import { useRouter } from "next/router"
import { useEffect } from "react"
import { Navbar } from "../components/navbar/Navbar"
import { Dashboard } from "../components/dashboard/Dashboard"
import Head from "next/head"
import { GetServerSidePropsContext } from "next"
import { ParsedUrlQuery } from "querystring"
import { getAppCookies, verifyToken } from "../util/jwttoken"
import { connectToDatabase } from "../util/mongodb"
import { CircularProgress } from "@chakra-ui/react"

type DashboardProps = {
	profile: any
	devices: any
}

const DashboardPage: React.FC<DashboardProps> = ({ profile, devices }) => {
	const router = useRouter()
	useEffect(() => {
		if (!profile) {
			router.push("/login?error=1&red=dashboard", "/login")
		}
	}, [profile, router])

	return (
		<>
			<Head>
				<title>Dashboard - Pinterface</title>
				<meta name="viewport" content="width=device-width" />
			</Head>
			<Navbar profile={profile} />
			{/*TODO: Sjekk på utgått cookie*/}
			{profile ? (
				<Dashboard devices={devices} />
			) : (
				<>
					<CircularProgress isIndeterminate size="xl" />
				</>
			)}
		</>
	)
}
export default DashboardPage

export async function getServerSideProps(
	context: GetServerSidePropsContext<ParsedUrlQuery>
) {
	const { req } = context
	const { token } = getAppCookies(req)
	const profile: any = token ? verifyToken(token.split(" ")[1]) : null
	const { db } = await connectToDatabase()
	const data: Array<any> =
		profile &&
		(await db
			.collection("devices")
			.find({ usernameRef: profile.username })
			.toArray())

	return {
		props: {
			profile,
			devices: JSON.parse(JSON.stringify(data)),
		},
	}
}
