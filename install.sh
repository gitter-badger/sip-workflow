#!/bin/sh
apt-get update && apt-get install -y git
git clone https://github.com/reactioncommerce/reaction.git $HOME/reaction
$HOME/reaction/reaction pull
git clone https://github.com/elkridgelodge/sip-workflow.git $HOME/reaction/sip-workflow
mv $HOME/reaction/sip-workflow/sip-workflow-package $HOME/reaction/packages
meteor add sip-workflow-package
cp $HOME/reaction/sip-workflow/private/data/Shops.json $HOME/reaction/packages/reaction-sample-data/private/data
$HOME/reaction/reaction
