#!/bin/bash
USER=morken
REMOTE=192.168.1.2
REMOTE_PATH=/opt/node-tilt/
echo "syncing to $REMOTE:$REMOTE_PATH"
rsync -av -e ssh --exclude='node_modules' ./ ${USER}@${REMOTE}:${REMOTE_PATH}