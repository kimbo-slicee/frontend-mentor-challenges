export function getRandomLocation() {
    const locations = [
        "San Francisco, CA",
        "Berlin, Germany",
        "Tokyo, Japan",
        "Casablanca, Morocco",
        "New York, USA",
        "Paris, France",
        "Toronto, Canada",
        "Lisbon, Portugal",
        "Sydney, Australia",
        "Dubai, UAE",
        "Seoul, South Korea",
        "Stockholm, Sweden",
        "London, UK",
        "Rome, Italy",
    ];

    const randomIndex = Math.floor(Math.random() * locations.length);
    return locations[randomIndex];
}
