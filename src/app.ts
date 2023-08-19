import axios from "axios";
import "dotenv/config";

require("dotenv").config({ path: __dirname + "/./../.env" });

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${process.env.GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      const coordinates = response.data.results[0].geometry.location;
    })
    .catch((err) => {
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
