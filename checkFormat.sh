#!/bin/bash 
 
# ./node_modules/.bin/standard --verbose | ./node_modules/.bin/snazzy

./node_modules/.bin/standard 'assets/components/**/*.js' 'assets/components/**/*.jsx' 'assets/pages/**/*.js' 'assets/pages/**/*.jsx' 'assets/store/**/*.js' 'assets/store/**/*.jsx' --fix | ./node_modules/.bin/snazzy

if [[ $? -ne 0 ]]; then
  echo 'JavaScript Standard Style errors were detected. Aborting commit.'
  exit 1
else
  echo 'Nothing is error'
fi