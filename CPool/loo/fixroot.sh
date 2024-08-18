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

sudo chroot "$1" apt update
##sudo chroot "$1" apt upgrade -y
sudo chroot "$1" apt --fix-missing update
sudo chroot "$1" apt --fix-broken install -y
sudo chroot "$1" apt autoremove
sudo chroot "$1" apt clean
sudo chroot "$1" update-initramfs -u

echo " => Kurgusal ortam ayarlandı."

