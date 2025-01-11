import { getFlightData } from '../../../utils/db'

export async function GET() {
  try {
    const flightData = await getFlightData()
    return new Response(JSON.stringify(flightData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json' 
      }
    })
  } catch (error) {
    console.log("Api error: ", error)
    return new Response("Error fetching flight data", {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
