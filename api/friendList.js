// /api/friendList.js
export default async function handler(req, res) {
  // Solo permitimos GET (puedes cambiarlo a POST si quieres)
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const API_KEY = process.env.STEAM_API_KEY;
  const STEAM_ID = process.env.STEAM_ID;

  console.log("API_KEY:", API_KEY);
  console.log("STEAM_ID:", STEAM_ID);

  if (!API_KEY || !STEAM_ID) {
    return res.status(500).json({ 
      error: "Missing API_KEY or STEAM_ID", 
      API_KEY, 
      STEAM_ID 
    });
  }

  try {
    const url = `https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${API_KEY}&steamid=${STEAM_ID}&relationship=friend`;
    const response = await fetch(url);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
