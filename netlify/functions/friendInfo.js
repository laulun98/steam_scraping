exports.handler = async function (event, context) {

  const API_KEY = process.env.STEAM_API_KEY;

  const { steamid } = JSON.parse(event.body);

  const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${steamid}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching player info" })
    };
  }
};