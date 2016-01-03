<?php

echo "hey d00d";
echo "scrubs";

/* make the API call */
$request = new FacebookRequest(
  $session,
  'GET',
  '/{friend-list-id}'
);
$response = $request->execute();
$graphObject = $response->getGraphObject();
/* handle the result */
?>