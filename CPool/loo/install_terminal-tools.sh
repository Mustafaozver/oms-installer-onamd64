RESET_CONSOLE="\033[0m"
BACKGRUND_WHITE="\033[47m"
TEXT_BLUE="\033[34m"
STATUS_BLINK="\033[5m"
FONT_BOLD="\033[1m"

_ST_0="\033[0m\033[1m\033[44m\033[34m"

_ST="$BACKGRUND_WHITE$TEXT_BLUE$FONT_BOLD"
_FN="$RESET_CONSOLE"

echo "$_ST Terminal Uygulamaları Yüklensin Mi?                              $_FN"
sleep 1

read REPLY
echo ""
echo "Seçilen : \033[0m\033[1m\033[44m\033[34m$REPLY\033[0m"
case $REPLY in
    y|Y|e|E )
        echo "Terminal Uygulamaları Kuruluyor..."
        
        sudo chroot "$1" apt install wget -y
        sudo chroot "$1" apt install flatpak -y
        sudo chroot "$1" apt install htop -y
        sudo chroot "$1" apt install gpd -y
        sudo chroot "$1" apt install nano -y
        sudo chroot "$1" apt install git -y
        sudo chroot "$1" apt install nala -y
        sudo chroot "$1" apt install nala-legacy -y
		sudo chroot "$1" apt install wine -y
		sudo chroot "$1" apt install wine32 -y
		sudo chroot "$1" apt install libwine -y
		sudo chroot "$1" apt install synaptic -y
		sudo chroot "$1" apt install fonts-wine -y
		sudo chroot "$1" apt install neofetch -y
		sudo chroot "$1" apt install zsh -y
		sudo chroot "$1" apt install guake -y
        
        echo "Terminal Uygulamaları Kuruldu."
        ;;
    * )
        echo "Terminal Uygulamaları atlandı."
        ;;
esac

