"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
const js_api_loader_1 = require("@googlemaps/js-api-loader");
require("dotenv").config({ path: __dirname + "/./../.env" });
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const loader = new js_api_loader_1.Loader({
    apiKey: GOOGLE_API_KEY,
    version: "weekly",
});
const form = document.querySelector("form");
const addressInput = document.getElementById("address");
function searchAddressHandler(event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;
    axios_1.default
        .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
        .then((response) => {
        if (response.data.status !== "OK") {
            throw new Error("Could not fetch location!");
        }
        const coordinates = response.data.results[0].geometry.location;
        loader.load().then(() => {
            const map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: coordinates.lat, lng: coordinates.lng },
                zoom: 16,
            });
            new google.maps.Marker({ position: coordinates, map });
        });
    })
        .catch((err) => {
        alert(err.message);
        console.log(err);
    });
}
form.addEventListener("submit", searchAddressHandler);
//# sourceMappingURL=app.js.map