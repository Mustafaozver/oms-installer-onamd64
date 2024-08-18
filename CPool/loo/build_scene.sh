RESET_CONSOLE="\033[0m"
BACKGRUND_WHITE="\033[47m"
TEXT_BLUE="\033[34m"
STATUS_BLINK="\033[5m"
FONT_BOLD="\033[1m"

_ST_0="\033[0m\033[1m\033[44m\033[34m"

_ST="$BACKGRUND_WHITE$TEXT_BLUE$FONT_BOLD"
_FN="$RESET_CONSOLE"

echo " => Kurgusal ortam ayarlanıyor..."
sleep 1

sudo mount --rbind /sys "$1"/sys
sudo mount --make-rslave "$1"/sys

sudo mount --rbind /dev "$1"/dev
sudo mount --make-rslave "$1"/dev

sudo mount --rbind /proc "$1"/proc
sudo mount --make-rslave "$1"/proc

## for dir in sys dev proc ; do sudo mount --rbind /"$dir" "$1"/"$dir" && mount --make-rslave "$1"/"$dir" ; done

echo " => Kurgusal ortam ayarlandı."

