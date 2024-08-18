RESET_CONSOLE="\033[0m"
BACKGRUND_WHITE="\033[47m"
TEXT_BLUE="\033[34m"
STATUS_BLINK="\033[5m"
FONT_BOLD="\033[1m"

_ST_0="\033[0m\033[1m\033[44m\033[34m"

_ST="$BACKGRUND_WHITE$TEXT_BLUE$FONT_BOLD"
_FN="$RESET_CONSOLE"

echo "ISO İmaj Alınsın Mı?"
sleep 1

read REPLY
echo ""
echo "Seçilen : \033[0m\033[1m\033[44m\033[34m$REPLY\033[0m"
case $REPLY in
	y|Y|e|E )
		echo "ISO İmaj Alınıyor..."
		
		sudo chroot "$1" update-initramfs -u
		
		sudo mkdir -p "$3"/_ws
		
		sudo mkdir -p "$3"/_ws/live
		sudo mkdir -p "$3"/_ws/boot
		sudo mkdir -p "$3"/_ws/boot/grub
		
		sudo cp -pf "$1"/boot/initrd.img* "$3"/_ws/live/
		sudo cp -pf "$1"/boot/vmlinuz* "$3"/_ws/live/
		
		sudo cp "$2"/filesystem.$4.squashfs "$3"/_ws/live/filesystem.squashfs
		
		sudo cp "$3"/live_grub.cfg "$3"/_ws/boot/grub/grub.cfg
		
		sudo grub-mkrescue "$3"/_ws -o "$3"/ISO.iso
		
		sudo rm -rf "$3"/_ws/*
		sudo rm -rf "$3"/live_grub.cfg
		
		echo "Alındı."
		;;
	* )
		echo "ISO İmaj Atlandı."
		;;
esac

