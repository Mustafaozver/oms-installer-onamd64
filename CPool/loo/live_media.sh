RESET_CONSOLE="\033[0m"
BACKGRUND_WHITE="\033[47m"
TEXT_BLUE="\033[34m"
STATUS_BLINK="\033[5m"
FONT_BOLD="\033[1m"

_ST_0="\033[0m\033[1m\033[44m\033[34m"

_ST="$BACKGRUND_WHITE$TEXT_BLUE$FONT_BOLD"
_FN="$RESET_CONSOLE"

echo "$_ST LIVE Ortam Gereklilikleri Yüklensin Mi?                              $_FN"
sleep 1

read REPLY
echo ""
echo "Seçilen : \033[0m\033[1m\033[44m\033[34m$REPLY\033[0m"
case $REPLY in
    y|Y|e|E )
        echo "LIVE Ortam Gereklilikleri Kuruluyor..."
        
        sudo chroot "$1" apt install live-boot -y
        sudo chroot "$1" apt install live-boot-initramfs-tools -y
        sudo chroot "$1" apt install extlinux -y
        sudo chroot "$1" update-initramfs -u
        
        echo "LIVE Ortam Gereklilikleri Kuruldu."
        ;;
    * )
        echo "LIVE Ortam Gereklilikleri atlandı."
        ;;
esac

