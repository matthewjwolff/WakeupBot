# WakeupBot
A GroupMe bot that tells people to wake up

## Installation Requirements
A installation of a Node runtime (node.js or io.js) including the https package (should be in the base installation)

## Running
The command `node srv.js` will run the included script. If you're on a UNIX-like environment and want that to run in the background, just do `node srv.js & disown`. `&` makes the process run in the backgrond and `disown` makes it persist when you detatch your console session.

## SystemD and Services
`wakeupbot.service` is a systemd service file that can be started with `systemctl start wakeupbot.service` or enabled on boot with `systemctl start wakeupbot.service`. You will probably want to move `wakeupbot.service` to the appropriate directory on your machine (likely `/etc/systemd/system/`)
