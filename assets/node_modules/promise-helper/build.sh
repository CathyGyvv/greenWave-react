#!/bin/bash
envType=$1
# node version
nvm --version && nvm install 0.11.14 && nvm use 0.11.14
echo "node `node -v`"
echo "npm `npm -v`"

function catchError () {
  if [ 0 -ne $1 ]; then
    echo "!!!! Error: $2"
    exit $1
  fi
}

declare __ENV__=local

case $envType in
    daily )
    # 日常
    __ENV__="daily"
    ;;
    prepub )
    # 预发
    __ENV__="prepub"
    ;;
    # 生产
    publish )
    __ENV__="publish"
    ;;
esac
echo "----------- ${__ENV__} env -------------------"
if [ -e ./etc/config.${__ENV__}.yaml ]; then
  cp ./etc/config.${__ENV__}.yaml ./etc/config.yaml
fi

for path in ./addon/*/*
do
  is_env_match=`echo ${path}| grep config.${__ENV__}.yaml | awk '{ print $0 }'`
  if [ "0${is_env_match}1" = "01" ]; then
    continue
  fi
  cp_path=`echo ${path}|sed -e "s/.${__ENV__}././g"`
  cp $path $cp_path
done


echo "------------- start make release -----------"
make release
catchError $? 'make failed'
echo "--------------make sucesss---------------------"

exit 0