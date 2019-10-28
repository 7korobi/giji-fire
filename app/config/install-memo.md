
# root setup.
```
sudo su
useradd 7korobi
passwd 7korobi
usermod -aG wheel 7korobi

cd /home/7korobi
cp -r /home/centos/.ssh .
chown 7korobi .ssh
chown 7korobi .ssh/*
cd ~

yum install git lftp zip unzip  bzip2 gcc gcc-c++ openssl-devel readline-devel zlib-devel sqlite-devel

```

# home setup.

```
git clone https://github.com/creationix/nvm.git ~/.nvm
source ~/.nvm/nvm.sh

git clone https://github.com/sstephenson/rbenv.git ~/.rbenv
mkdir .rbenv/plugins
cd .rbenv/plugins
git clone https://github.com/sstephenson/ruby-build.git
cd ~

git clone git@github.com:7korobi/giji-sow-api.git
git clone git@github.com:7korobi/giji_rails.git
mv giji_rails giji-rails

cd giji-rails
bundle update

cd giji-sow-api
npm install -g yarn
yarn

```