trap 'kill $(jobs -pr)' SIGINT SIGTERM EXIT

~/.deno/bin/file_server -p 4507 --cors &
xdg-open http://0.0.0.0:4507/test.html

sleep 5