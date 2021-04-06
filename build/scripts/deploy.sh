#!/bin/bash
set -e # stops on first error

echo "" && echo "***********************************************************" && /_/build/scripts/print-step.sh "ZIP FOLDER /install"

zip_file=/bundle.zip

cd /install
zip -r $zip_file *

echo "" && echo "***********************************************************" && /_/build/scripts/print-step.sh "LOGIN TO AZURE"

echo "logging as: $AZURE_SUBSCRIPTION_USERNAME"
cmd="az login -u $AZURE_SUBSCRIPTION_USERNAME -p $AZURE_SUBSCRIPTION_PASSWORD"
eval $cmd

echo "" && echo "***********************************************************" && /_/build/scripts/print-step.sh "DEPLOY!!!"

echo "setting SCM_DO_BUILD_DURING_DEPLOYMENT"
cmd="az webapp config appsettings set -g $AZURE_RESOURCE_GROUP_NAME -n $AZURE_APP_NAME --settings SCM_DO_BUILD_DURING_DEPLOYMENT=true"
eval $cmd
echo "done"

echo "deploying zip bundle"
cmd="az webapp deployment source config-zip --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_APP_NAME --src $zip_file"
eval $cmd
echo "done"


echo "" && echo "***********************************************************" && /_/build/scripts/print-step.sh "TEST DEPLOY"

sleep 10s # it takes for Azure to bring App online
/_/build/scripts/curl-retry.sh "$AZURE_APP_URL/status"
