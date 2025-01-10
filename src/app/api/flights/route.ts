import { getFlightData } from '@/utils/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const flightData = getFlightData()
  return NextResponse.json(flightData)
}
