#!/bin/bash
npm run build-only &&

rm -rf /opt/homebrew/var/web/vue-app/dist
cp -r dist /opt/homebrew/var/web/vue-app/