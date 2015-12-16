#!/bin/sh
apt-get update && apt-get install -y git ;
git clone https://github.com/reactioncommerce/reaction.git ;
cd reaction ;
./reaction pull ;
git clone https://github.com/elkridgelodge/sip-workflow.git ;
cd sip-workflow ;
mv sip-workflow-package packages ;
meteor add sip-workflow-package ;
cp private/data/Shops.json ../../packages/reaction-sample-data/private/data ;
