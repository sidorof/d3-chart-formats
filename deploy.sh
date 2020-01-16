#!/usr/bin/env sh
set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:sidorof/d3-chart-formats.git master:gh-pages

cd -
