RESET_CONSOLE="\033[0m"
BACKGRUND_WHITE="\033[47m"
TEXT_BLUE="\033[34m"
STATUS_BLINK="\033[5m"
FONT_BOLD="\033[1m"

_ST_0="\033[0m\033[1m\033[44m\033[34m"

_ST="$BACKGRUND_WHITE$TEXT_BLUE$FONT_BOLD"
_FN="$RESET_CONSOLE"

echo " => İmaj ($3) alınıyor..."
sleep 1

sudo chroot "$1" update-initramfs -u
sudo umount -lf -R "$1"/* 2>/dev/null
sudo chroot "$1" apt autoremove
sudo rm -f "$1"/root/.bash_history
sudo rm -rf "$1"/var/lib/apt/lists/*
find "$1"/var/log/ -type f | xargs rm -f

sudo mksquashfs "$1" "$2"/filesystem.$3.squashfs -comp gzip -wildcards

echo " => İmaj ($3) alındı."

