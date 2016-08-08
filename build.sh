#bin/bash
rm -rf output
electron-packager . --platform=darwin --arch=x64 --icon=icon.icns --out=output --extend-info=logcat.plist
