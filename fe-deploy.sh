# @Author: wrma
# @Date:   2018-03-13 21:38:26
# @Last Modified by:   wrma
# @Last Modified time: 2018-03-13 22:30:57
#!/bin/sh

GIT_HOME=/developer/git-repository/
DEST_PATH=/product/front/

if [ ! -n "$1" ]; 
then
	echo -e "Please input a project name!You can input as follows"
	echo -e "./fe-deploy.sh admin-fe"
	exit
fi

if [ $1 = "admin-fe" ]; 
then
	echo -e "----------------Enter Project---------------"
	cd $GIT_HOME$1
else
	echo -e "Invalid Project Name!"
	exit
fi

# clean dist
echo -e "----------------Clean Dist---------------"
rm -rf ./dist

echo -e "----------------Git Pull---------------"
git pull

echo -e "----------------Yarn Install---------------"
yarn

echo -e "----------------Yarn Run Dist---------------"
yarn run dist

if [ -d "./dist" ];
then 
	echo -e "----------------clean Dest---------------"
	rm -rf $DEST_PATH/dist

	echo -e "----------------copy Dest---------------"
	cp -R ./dist $DEST_PATH/$1/

	echo -e "----------------Deploy Success---------------"
else 
	echo -e "----------------Deploy Fail---------------"
fi
