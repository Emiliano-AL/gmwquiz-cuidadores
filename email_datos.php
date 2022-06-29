<?php

// Function to get the user IP address
function getUserIP() {
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if (isset($_SERVER['HTTP_X_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if (isset($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
    else if (isset($_SERVER['HTTP_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if (isset($_SERVER['HTTP_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if (isset($_SERVER['REMOTE_ADDR']))
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}

$json = file_get_contents('php://input');
$post = json_decode($json, true);
$post['ip'] = getUserIP();
$post['code']= "Kk3Npv8IGsel71Drj8GlOwbHGnq8R8c4";

$ch = curl_init('https://sm2.xtrg.net/api/leads');

$token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE5YzEzNWZhMzYyZTk4MmFiNTQ5NjcyZDg5NWNiN2JiYzQ0ZTkyY2Y1NGQzOTEyMzI5YWNlZjE3YzVhNWVlNTEyNWJiMjRmMzQyNjI4MzIzIn0.eyJhdWQiOiIzIiwianRpIjoiMTljMTM1ZmEzNjJlOTgyYWI1NDk2NzJkODk1Y2I3YmJjNDRlOTJjZjU0ZDM5MTIzMjlhY2VmMTdjNWE1ZWU1MTI1YmIyNGYzNDI2MjgzMjMiLCJpYXQiOjE1NzAyNDUzOTYsIm5iZiI6MTU3MDI0NTM5NiwiZXhwIjoyMzU5MjUwMTk2LCJzdWIiOiIiLCJzY29wZXMiOltdfQ.Xqw8e7EyRsNRPK-HXwm1lDqHLIByRTO_6LvuSdHv-r27CLR-iw5MeOHhPB3HNRlXxubbjYPy7ZTy2r4EEAHpdMHsXFu1p0BmeUdxTuQ5axUs7w-RXwAJPND98KXWjWEYQNOYFCfxQxVaHkAcFKZvj8dGTG8R-c2SNYdPQNCldVcVddIm6nF7LWyXIXpaEV2IW09Ivh9IZiSVCUYztMGfmW9Kzwnoe_5D2FxXliMDL4x25qScsGRT4nEmgyCD8cPNbbo_hjlYW5HNfWcbmVjMCA7DnL8PBvbteLe7dKDR0Zbhmzn9RUevmG9IBkW1JeAs7to80GLoYSu3x3XPi3p27457dLFFJhvgx5ibk4xVhuCms_bXus4595DYW7anImR8QV6CC8ujH4N9aO7Ru5lyBrfUf5Qiflt5MLwMcQJwMCU-UInb5hkCVifk5_pk2o3Z0oA8z-FTj7d8m5ygmkK8NCIVki41sdLuCc7WDb7-64-XCIjd8A2JkjydjsZpUqKHVfLAkX5lM-HzK58LCMUivj1qwwZsolGlwA5plERfvAVfhmOwgHKQ66iqzk-FjzeSGttiVsKYsPDVdI6-3QHx5cvxrZEP_sZr6-txglX5hfuJCmG_Fjm-lX0EwgNWko6JY9AEIbCfs8X43opmRYh2yh4oA4IIRZVVO-exwvaNTjk";
$authorization = "Authorization: Bearer " . $token;
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', $authorization));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($post));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // Skip SSL Verification

$response = curl_exec($ch);
curl_close($ch);

$response = json_decode($response, true);

echo json_encode($response);
