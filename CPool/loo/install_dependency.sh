RESET_CONSOLE="\033[0m"
BACKGRUND_WHITE="\033[47m"
TEXT_BLUE="\033[34m"
STATUS_BLINK="\033[5m"
FONT_BOLD="\033[1m"

_ST_0="\033[0m\033[1m\033[44m\033[34m"

_ST="$BACKGRUND_WHITE$TEXT_BLUE$FONT_BOLD"
_FN="$RESET_CONSOLE"

echo "$_ST Kurulum Araçları Yüklensin Mi?                              $_FN"
sleep 1

read REPLY
echo ""
echo "Seçilen : \033[0m\033[1m\033[44m\033[34m$REPLY\033[0m"
case $REPLY in
    y|Y|e|E )
        echo "Kurulum Araçları Yükleniyor..."
        
        sudo chroot "$1" apt update -y
        sudo chroot "$1" apt install debootstrap -y
        sudo chroot "$1" apt install grub-efi-amd64 -y
        sudo chroot "$1" apt install grub-pc-bin -y
        sudo chroot "$1" apt install grub-efi -y
        sudo chroot "$1" apt install grub2 -y
        sudo chroot "$1" apt install arch-install-scripts -y
        sudo chroot "$1" apt install xorriso -y
        sudo chroot "$1" apt install squashfs-tools -y
        sudo chroot "$1" apt install mtools -y
        sudo chroot "$1" apt install devscripts -y
        
        echo "Kurulum Araçları Yüklendi."
        ;;
    * )
        echo "Kurulum Araçları atlandı."
        ;;
esac

