#!/bin/sh
apt-get update && apt-get install -y git
git clone https://github.com/reactioncommerce/reaction.git reaction
./reaction/reaction pull
git clone https://github.com/elkridgelodge/sip-workflow.git reaction/packages/sip-workflow
echo ""
echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
echo "@@@ Everything install OK? @@@"
echo "@@@ If so, next steps are: @@@"
echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
echo ""
echo "cd reaction"
echo "meteor add sip-workflow"
echo "./reaction"
