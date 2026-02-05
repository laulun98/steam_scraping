<?php
require 'config.php';

$friendListUrl="http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${API_KEY}&steamid=${STEAM_ID}&relationship=friend";
$friendDataUrl="http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${STEAM_ID}";

$data = file_get_contents($friendListUrl);

header("Content-Type: application/json");
echo $data;