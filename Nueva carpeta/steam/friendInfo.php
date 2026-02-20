<?php
header("Content-Type: application/json");

require "config.php";

/*coge el id desde que se escoge en index.html
file_get_contents("php://input") -> lee el cuerpo de la petición htttp (llega tal cual como txt)
PARSE_STR: lo convierte en un array de php
*/
parse_str(file_get_contents("php://input"), $post);

if (!isset($post['steamid'])) {
    echo json_encode(["error" => "steamid no recibido"]);
    exit;
}

$steamid = $post['steamid'];
$url = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=$API_KEY&steamids=$steamid";

$json = file_get_contents($url);

echo $json;