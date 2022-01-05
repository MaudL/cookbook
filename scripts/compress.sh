#!/bin/sh
set -e

DIRECTORY=`dirname $0`

mogrify -strip -quality 85% -resize 512x512 "$DIRECTORY/../static/img/*.jpg"
