ps -ux | grep `dirname $(pwd)` | awk '{print $2}' | xargs kill -9
