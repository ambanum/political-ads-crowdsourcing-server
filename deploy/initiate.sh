#!/bin/bash
set -e

### Configuration ###

SERVER=cloud@disinfo.quaidorsay.fr
REMOTE_SCRIPT_PATH=/tmp/deploy-political-ads-crowdsourcing-server.sh


### Library ###

function run()
{
  echo "Running: $@"
  "$@"
}


### Automation steps ###

run scp $KEYARG deploy/work.sh $SERVER:$REMOTE_SCRIPT_PATH
echo
echo "---- Running deployment script on remote server ----"
run ssh $SERVER bash $REMOTE_SCRIPT_PATH

echo "Fine!"
