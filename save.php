<?php

$data = json_decode(file_get_contents('php://input'), true);
header('Content-type: application/json;charset=UTF-8');
echo json_encode($data);




$json = fopen('allPageInfo.txt', 'w+b');
flock($json, LOCK_SH);
fwrite($json, json_encode($data));
fclose($json);




/*

header("Content-type: text/plain; charset=UTF-8");
if (isset($_POST['request']))
{
    // ここに何かしらの処理を書く（DB登録やファイルへの書き込みなど）
    // echo "まさかここ";
    echo $_POST['request'];
}
else{
    echo 'The parameter of "request" is not found.';
}

*/


?>