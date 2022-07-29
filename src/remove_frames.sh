# ./remove_frames.sh [file_path] [max_frame]

declare -i frameCount
declare -i maxFrame
declare -i frameCycle
declare -i delaySecond

ceiling() {
  result=$(( ($1 + $2 - 1) / $2 ))
  echo $result
}

# Get the number of frames
frameCount=`gifsicle $1 -I | head -n 1 | awk '{print $3}'`
maxFrame=$2
frameCycle=$(ceiling $frameCount $maxFrame)

if [ $frameCycle = 0 ]
then
  frameCycle=1
fi

delaySecondStr=`gifsicle $1 -I | tail -1 | awk '{print $4}'`
delaySecond=$(printf %.0f $(echo "${delaySecondStr%s} * 100 * $frameCycle" | bc -l))

data=$(cat -)

echo $data | gifsicle --no-warnings --no-app-extensions --unoptimize --delay $delaySecond $(seq -f "#%g" 0 $frameCycle $(($frameCount - 1))) --output ./testgif.gif