
delaySecondStr=`cat - | gifsicle -I | tail -1 | awk '{print $4}'`
delaySecond=$(printf %.0f $(echo "${delaySecondStr%s} * 100" | bc -l))

echo $delaySecond