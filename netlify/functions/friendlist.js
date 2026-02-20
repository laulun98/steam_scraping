exports.handler = async function (event, context) {
  const API_KEY = process.env.STEAM_API_KEY;
  const STEAM_ID = process.env.STEAM_ID;

  console.log("API_KEY:", API_KEY);
  console.log("STEAM_ID:", STEAM_ID);

  if (!API_KEY || !STEAM_ID) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing API_KEY or STEAM_ID", API_KEY, STEAM_ID })
    };
  }

  try {
    const url = `https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${API_KEY}&steamid=${STEAM_ID}&relationship=friend`;
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};