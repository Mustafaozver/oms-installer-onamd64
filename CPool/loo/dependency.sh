RESET_CONSOLE="\033[0m"
BACKGRUND_WHITE="\033[47m"
TEXT_BLUE="\033[34m"
STATUS_BLINK="\033[5m"
FONT_BOLD="\033[1m"

_ST_0="\033[0m\033[1m\033[44m\033[34m"

_ST="$BACKGRUND_WHITE$TEXT_BLUE$FONT_BOLD"
_FN="$RESET_CONSOLE"

echo " => Gerekli Paketler Yükleniyor..."
sleep 1

sudo apt update -y
sudo apt install debootstrap -y
sudo apt install grub-efi-amd64 -y
sudo apt install arch-install-scripts -y
sudo apt install xorriso squashfs-tools mtools grub-pc-bin grub-efi devscripts -y

echo " => Gerekli Paketler Yüklendi."

