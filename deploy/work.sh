#!/bin/bash
set -e

### Configuration ###

REPO_DIR=/home/cloud/political-ads-crowdsourcing-server
GIT_URL=git@github.com:ambanum/political-ads-crowdsourcing-server.git

### Automation steps ###

set -x

eval "$(ssh-agent -s)" && ssh-add ~/.ssh/id_rsa_deploy_key
# Pull latest code
if [[ -e $REPO_DIR ]]; then
  cd $REPO_DIR
  git pull
else
  git clone $GIT_URL $REPO_DIR
fi

# Install dependencies
cd $REPO_DIR
npm install --production
npm prune --production

# Restart app
forever restart app/server.js || forever start app/server.js
