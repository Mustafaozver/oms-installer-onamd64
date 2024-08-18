RESET_CONSOLE="\033[0m"
BACKGRUND_WHITE="\033[47m"
TEXT_BLUE="\033[34m"
STATUS_BLINK="\033[5m"
FONT_BOLD="\033[1m"

_ST_0="\033[0m\033[1m\033[44m\033[34m"

_ST="$BACKGRUND_WHITE$TEXT_BLUE$FONT_BOLD"
_FN="$RESET_CONSOLE"

echo " => Alt Dizinler inşaa ediliyor..."
sleep 1

sudo mkdir -p "$1"/boot
sudo mkdir -p "$1"/home
sudo mkdir -p "$1"/etc
sudo mkdir -p "$1"/dev
sudo mkdir -p "$1"/proc
sudo mkdir -p "$1"/sys
sudo mkdir -p "$1"/opt
sudo mkdir -p "$1"/run
sudo mkdir -p "$1"/srv
sudo mkdir -p "$1"/var
sudo mkdir -p "$1"/root
sudo mkdir -p "$1"/mnt
sudo mkdir -p "$1"/usr
sudo mkdir -p "$1"/bin
sudo mkdir -p "$1"/sbin
sudo mkdir -p "$1"/tmp
sudo mkdir -p "$1"/lib
sudo mkdir -p "$1"/lib32
sudo mkdir -p "$1"/lib64
sudo mkdir -p "$1"/media

sudo mkdir -p "$1"/0

echo " => Alt Dizinler inşaa edildi."


