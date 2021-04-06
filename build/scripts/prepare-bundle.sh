#!/bin/bash
set -e # stops on first error

echo "" && echo "***********************************************************" && /_/build/scripts/print-step.sh "CLEAN OUT DIR"
# recreates output directory, count content of /out folder
mkdir -p /out 
cd /out && rm -rf ./* && mkdir src


echo "" && echo "***********************************************************" && /_/build/scripts/print-step.sh "COPYING PRODUCTION FILES TO /out"

rm -rf /_/app/node_modules

cp -r /_/app/src/* /out/src
cp /_/app/package-lock.json /out/package-lock.json
cp /_/app/package.json /out/package.json

mkdir /install
cp -r /out/* /install

