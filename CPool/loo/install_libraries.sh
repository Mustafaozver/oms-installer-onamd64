RESET_CONSOLE="\033[0m"
BACKGRUND_WHITE="\033[47m"
TEXT_BLUE="\033[34m"
STATUS_BLINK="\033[5m"
FONT_BOLD="\033[1m"

_ST_0="\033[0m\033[1m\033[44m\033[34m"

_ST="$BACKGRUND_WHITE$TEXT_BLUE$FONT_BOLD"
_FN="$RESET_CONSOLE"

echo " => Gerekli Kütüphaneler yükleniyor..."
sleep 1

sudo chroot "$1" apt install grub-efi-amd64 grub2 -y
sudo chroot "$1" apt install btrfs-progs -y
sudo chroot "$1" apt install exfatprogs -y
sudo chroot "$1" apt install exfat-utils -y
sudo chroot "$1" apt install zfsutils-linux -y
sudo chroot "$1" apt install zfs-initramfs -y
sudo chroot "$1" apt install zfs-dkms -y
sudo chroot "$1" apt install git dosfstools -y
sudo chroot "$1" apt install amd64-microcode -y
sudo chroot "$1" apt install nano -y
sudo chroot "$1" apt install locales -y
sudo chroot "$1" apt install build-essential -y
sudo chroot "$1" apt install zlib1g-dev -y
sudo chroot "$1" apt install libncurses5-dev -y
sudo chroot "$1" apt install libgdbm-dev -y
sudo chroot "$1" apt install libnss3-dev -y
sudo chroot "$1" apt install libssl-dev -y
sudo chroot "$1" apt install libreadline-dev -y
sudo chroot "$1" apt install libffi-dev -y
sudo chroot "$1" apt install wget -y

sudo chroot "$1" apt install dosfstools -y
sudo chroot "$1" apt install amd64-microcode -y
sudo chroot "$1" apt install network-manager -y
sudo chroot "$1" apt install git -y
sudo chroot "$1" apt install cryptsetup -y
sudo chroot "$1" apt install sudo -y
sudo chroot "$1" apt install lsb-release -y
sudo chroot "$1" apt install ca-certificates -y
sudo chroot "$1" apt install apt-transport-https -y
sudo chroot "$1" apt install software-properties-common -y

sudo chroot "$1" apt install tzdata curl ca-certificates openssh-server curl -y
sudo chroot "$1" apt install ufw -y
sudo chroot "$1" apt install tlp -y
sudo chroot "$1" apt install ubuntu-restricted-extras -y

sudo chroot "$1" apt install cups -y
sudo chroot "$1" apt install printer-driver-all -y
sudo chroot "$1" apt install system-config-printer -y
sudo chroot "$1" apt install simple-scan -y
sudo chroot "$1" apt install xsane -y
sudo chroot "$1" apt install sensors-applet -y
sudo chroot "$1" apt install psensor -y
sudo chroot "$1" apt install fancontrol -y

sudo chroot "$1" ubuntu-drivers autoinstall

sudo chroot "$1" update-initramfs -u

echo " => Gerekli Kütüphaneler yüklendi."

