"use client";
import React, { useEffect, useState } from "react";
import { MapPin, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject("Geolocation not supported.");
    }
  });
};

const ServiceAvailability = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [serviceStatus, setServiceStatus] = useState("Checking...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const locations = [
      { latitude: 96.1458, longitude: 95.0882 }, // Example: Nagpur
      { latitude: 96.155, longitude: 36.095 },
    ];
    const thresholdDistance = 10; // 5km range

    getUserLocation()
      .then((location) => {
        setUserLocation(location);
        const isAvailable = locations.some(({ latitude, longitude }) => {
          return (
            haversine(
              location.latitude,
              location.longitude,
              latitude,
              longitude
            ) <= thresholdDistance
          );
        });

        setServiceStatus(
          isAvailable ? "Service Available" : "Service Not Available"
        );
        setLoading(false);
      })
      .catch(() => {
        setServiceStatus("Unable to get location");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex w-full">
      <Card className="w-full  shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="text-blue-600" />
            Check Service Availability
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {loading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="animate-spin text-gray-500" size={32} />
              <p className="mt-2 text-gray-500">Getting your location...</p>
            </div>
          ) : (
            <>
              {userLocation ? (
                <p className="text-sm text-gray-600">
                  Your Location:{" "}
                  <span className="font-medium text-gray-800">
                    {userLocation.latitude}, {userLocation.longitude}
                  </span>
                </p>
              ) : (
                <p className="text-red-500">Location not available</p>
              )}

              <div className="mt-4 flex items-center justify-center">
                {serviceStatus === "Service Available" ? (
                  <CheckCircle className="text-green-500" size={24} />
                ) : (
                  <XCircle className="text-red-500" size={24} />
                )}
                <h3 className="ml-2 font-semibold text-lg">{serviceStatus}</h3>
              </div>

              <Button
                onClick={() => window.location.reload()}
                className="mt-4 w-full cursor-pointer"
              >
                Recheck Location
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceAvailability;
