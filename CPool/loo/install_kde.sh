RESET_CONSOLE="\033[0m"
BACKGRUND_WHITE="\033[47m"
TEXT_BLUE="\033[34m"
STATUS_BLINK="\033[5m"
FONT_BOLD="\033[1m"

_ST_0="\033[0m\033[1m\033[44m\033[34m"

_ST="$BACKGRUND_WHITE$TEXT_BLUE$FONT_BOLD"
_FN="$RESET_CONSOLE"

echo "$_ST KDE Plasma Yüklensin Mi?                              $_FN"
sleep 1

read REPLY
echo ""
echo "Seçilen : \033[0m\033[1m\033[44m\033[34m$REPLY\033[0m"
case $REPLY in
    y|Y|e|E )
        echo "KDE Plasma Kuruluyor..."
        
        sudo chroot "$1" apt install kde-full -y
        sudo chroot "$1" apt install plasma-workspace-wayland -y
        sudo chroot "$1" apt install kubuntu-desktop -y
        sudo chroot "$1" apt install plasma-desktop -y
        sudo chroot "$1" apt install samba -y
        
        sudo chroot "$1" apt install kwin-bismuth -y
        
        sudo chroot "$1" apt install qt5-style-kvantum -y
        sudo chroot "$1" apt install qt5-style-kvantum-themes -y
        
        sudo dpkg-reconfigure sddm
        
        echo "KDE Plasma Kuruldu."
        ;;
    * )
        echo "KDE Plasma atlandı."
        ;;
esac

