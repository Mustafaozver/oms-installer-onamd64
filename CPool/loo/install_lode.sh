RESET_CONSOLE="\033[0m"
BACKGRUND_WHITE="\033[47m"
TEXT_BLUE="\033[34m"
STATUS_BLINK="\033[5m"
FONT_BOLD="\033[1m"

_ST_0="\033[0m\033[1m\033[44m\033[34m"

_ST="$BACKGRUND_WHITE$TEXT_BLUE$FONT_BOLD"
_FN="$RESET_CONSOLE"

echo "$_ST Minimal Desktop LightDM ve OpenBox Yüklensin Mi?                              $_FN"
sleep 1

read REPLY
echo ""
echo "Seçilen : \033[0m\033[1m\033[44m\033[34m$REPLY\033[0m"
case $REPLY in
    y|Y|e|E )
        echo "Minimal Desktop LightDM ve OpenBox Kuruluyor..."
        
        sudo chroot "$1" apt install lightdm -y
        sudo chroot "$1" apt install openbox -y
        sudo dpkg-reconfigure lightdm
        
        echo "Minimal Desktop LightDM ve OpenBox Kuruldu."
        ;;
    * )
        echo "Minimal Desktop LightDM ve OpenBox atlandı."
        ;;
esac

