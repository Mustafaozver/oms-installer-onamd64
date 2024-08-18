RESET_CONSOLE="\033[0m"
BACKGRUND_WHITE="\033[47m"
TEXT_BLUE="\033[34m"
STATUS_BLINK="\033[5m"
FONT_BOLD="\033[1m"

_ST_0="\033[0m\033[1m\033[44m\033[34m"

_ST="$BACKGRUND_WHITE$TEXT_BLUE$FONT_BOLD"
_FN="$RESET_CONSOLE"

echo " => GENERIC Kernel yükleniyor..."
sleep 1

sudo chroot "$1" apt install linux-image-generic -y
sudo chroot "$1" update-initramfs -u

echo " => GENERIC Kernel yüklendi."

