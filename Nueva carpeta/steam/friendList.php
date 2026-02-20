<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once 'config.php';

header('Content-Type: application/json');

$friendListUrl = "http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key={$API_KEY}&steamid={$STEAM_ID}&relationship=friend";

$response = file_get_contents($friendListUrl);

if ($response === false) {
    echo json_encode([
        'error' => 'No se pudo obtener la lista de amigos'
    ]);
    exit;
}

$data = json_decode($response, true);

echo json_encode($data);
exit;
