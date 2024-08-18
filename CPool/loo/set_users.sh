RESET_CONSOLE="\033[0m"
BACKGRUND_WHITE="\033[47m"
TEXT_BLUE="\033[34m"
STATUS_BLINK="\033[5m"
FONT_BOLD="\033[1m"

_ST_0="\033[0m\033[1m\033[44m\033[34m"

_ST="$BACKGRUND_WHITE$TEXT_BLUE$FONT_BOLD"
_FN="$RESET_CONSOLE"

echo " => Kullanıcılar Yapılandırılıyor..."
sleep 1

echo "USER : \033[1m\033[34m$2\033[0m"
echo "PASS : \033[1m\033[34m$3\033[0m"
sleep 1

sudo chroot "$1" useradd -mG sudo $2
echo -e "$3\n$3\n" | sudo chroot "$1" passwd
echo -e "$3\n$3\n" | sudo chroot "$1" passwd $2

echo " => Kullanıcılar Yapılandırıldı."


echo "$_ST Şifre Sorgusu Etkinleştirilsin Mi?							  $_FN"
sleep 1

read REPLY
echo ""
echo "Seçilen : \033[0m\033[1m\033[44m\033[34m$REPLY\033[0m"
case $REPLY in
	y|Y|e|E )
		echo "Şifre Sorgusu Etkinleştiriliyor..."
		
		sudo echo "\n$2 ALL=(ALL:ALL) NOPASSWD: ALL" > "$1"/etc/sudoers

		echo "Şifre Sorgusu Etkinleştirildi."
		;;
	* )
		echo "Şifre Sorgusu Devre Dışı Bırakılıyor..."

		sudo echo "\n$2 ALL=(ALL) ALL" > "$1"/etc/sudoers

		echo "Şifre Sorgusu Devre Dışı Bırakıldı."
		;;
esac



