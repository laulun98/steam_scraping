// /api/friendList.js
export default async function handler(req, res) {
  // Solo permitimos POST (si quieres GET, se puede cambiar)
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const API_KEY = process.env.STEAM_API_KEY;

  try {
    // En Vercel, el body ya viene parseado si es JSON
    const { steamid } = req.body;

    if (!steamid) {
      return res.status(400).json({ error: "steamid is required" });
    }

    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${steamid}`;

    const response = await fetch(url);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching player info" });
  }
}