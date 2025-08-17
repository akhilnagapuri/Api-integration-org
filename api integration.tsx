"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, MapPin, Droplets, Wind, Eye, Gauge } from "lucide-react"

interface WeatherData {
  name: string
  country: string
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  visibility: number
  pressure: number
  feelsLike: number
  icon: string
}

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [city, setCity] = useState("")

  const mockWeatherData: Record<string, WeatherData> = {
    london: {
      name: "London",
      country: "GB",
      temperature: 15,
      description: "partly cloudy",
      humidity: 65,
      windSpeed: 3.2,
      visibility: 10,
      pressure: 1013,
      feelsLike: 13,
      icon: "02d",
    },
    "new york": {
      name: "New York",
      country: "US",
      temperature: 22,
      description: "clear sky",
      humidity: 45,
      windSpeed: 2.1,
      visibility: 16,
      pressure: 1020,
      feelsLike: 24,
      icon: "01d",
    },
    tokyo: {
      name: "Tokyo",
      country: "JP",
      temperature: 28,
      description: "light rain",
      humidity: 78,
      windSpeed: 1.5,
      visibility: 8,
      pressure: 1008,
      feelsLike: 31,
      icon: "10d",
    },
    paris: {
      name: "Paris",
      country: "FR",
      temperature: 18,
      description: "overcast clouds",
      humidity: 72,
      windSpeed: 2.8,
      visibility: 12,
      pressure: 1015,
      feelsLike: 17,
      icon: "04d",
    },
    sydney: {
      name: "Sydney",
      country: "AU",
      temperature: 25,
      description: "few clouds",
      humidity: 58,
      windSpeed: 4.1,
      visibility: 15,
      pressure: 1018,
      feelsLike: 26,
      icon: "02d",
    },
  }

  const fetchWeatherData = async (cityName: string) => {
    if (!cityName.trim()) return

    setLoading(true)
    setError(null)

    try {
      console.log("[v0] Fetching weather data for:", cityName)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const normalizedCity = cityName.toLowerCase().trim()
      const data = mockWeatherData[normalizedCity]

      if (!data) {
        // Generate random weather data for unknown cities
        const randomTemp = Math.floor(Math.random() * 35) + 5
        const descriptions = [
          "clear sky",
          "few clouds",
          "scattered clouds",
          "broken clouds",
          "shower rain",
          "rain",
          "thunderstorm",
          "snow",
          "mist",
        ]
        const icons = ["01d", "02d", "03d", "04d", "09d", "10d", "11d", "13d", "50d"]
        const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)]
        const randomIcon = icons[Math.floor(Math.random() * icons.length)]

        setWeatherData({
          name: cityName.charAt(0).toUpperCase() + cityName.slice(1),
          country: "XX",
          temperature: randomTemp,
          description: randomDesc,
          humidity: Math.floor(Math.random() * 40) + 40,
          windSpeed: Math.round((Math.random() * 5 + 1) * 10) / 10,
          visibility: Math.floor(Math.random() * 10) + 5,
          pressure: Math.floor(Math.random() * 50) + 1000,
          feelsLike: randomTemp + Math.floor(Math.random() * 6) - 3,
          icon: randomIcon,
        })
      } else {
        setWeatherData(data)
      }

      console.log("[v0] Weather data loaded successfully")
    } catch (err) {
      console.error("[v0] Weather API error:", err)
      setError("Failed to fetch weather data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchWeatherData(city)
  }

  // Load default city on mount
  useEffect(() => {
    fetchWeatherData("London")
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Weather Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Get real-time weather information for any city worldwide</p>
          <Badge variant="outline" className="mt-2">
            Demo Mode - Try: London, New York, Tokyo, Paris, Sydney
          </Badge>
        </div>

        {/* Search Form */}
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="p-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter city name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={loading}>
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Weather Data */}
        {weatherData && !loading && (
          <div className="space-y-6">
            {/* Main Weather Card */}
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <CardTitle className="text-2xl">
                    {weatherData.name}, {weatherData.country}
                  </CardTitle>
                </div>
                <CardDescription className="capitalize text-lg">{weatherData.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-2xl">☀️</span>
                  </div>
                  <div className="text-6xl font-bold text-blue-600 dark:text-blue-400">{weatherData.temperature}°C</div>
                </div>
                <Badge variant="secondary" className="text-sm">
                  Feels like {weatherData.feelsLike}°C
                </Badge>
              </CardContent>
            </Card>

            {/* Weather Details Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Humidity</CardTitle>
                  <Droplets className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{weatherData.humidity}%</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wind Speed</CardTitle>
                  <Wind className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{weatherData.windSpeed} m/s</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Visibility</CardTitle>
                  <Eye className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{weatherData.visibility} km</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pressure</CardTitle>
                  <Gauge className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{weatherData.pressure} hPa</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-8">
          Demo Weather Dashboard - Simulated weather data for demonstration
        </div>
      </div>
    </div>
  )
}
