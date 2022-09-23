#!/bin/bash

wget https://github.com/mozilla/geckodriver/releases/download/v0.31.0/geckodriver-v0.31.0-linux64.tar.gz
tar -xvzf geckodriver-v0.31.0-linux64.tar.gz
chmod +x geckodriver
mv geckodriver /usr/local/bin/
export PATH=$PATH:/usr/local/bin/geckodriver

yarn migrate:dev
yarn seed:dev
yarn run:dev