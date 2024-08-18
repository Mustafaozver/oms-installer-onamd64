#!/bin/bash

if [ "$(whoami)" != root ]; then
    echo "\033[31m Bu komut çalışmak için root yetkisine ihtiyaç duyuyor."
    echo "\033[31m Önce sudo su komutu ile root olmalısınız veya sudo ön komutu ile çalıştırmalısınız."
    echo "\033[31m Örnek : '\033[35m sudo sh ./dependencies.sh\033[31m ' komutunu çalıştırabilirsiniz"
    exit 1
fi

RESET_CONSOLE="\033[0m"
BACKGRUND_WHITE="\033[47m"
TEXT_BLUE="\033[34m"
STATUS_BLINK="\033[5m"
FONT_BOLD="\033[1m"

_ST_0="\033[0m\033[1m\033[44m\033[34m"

_ST="$BACKGRUND_WHITE$TEXT_BLUE$FONT_BOLD"
_FN="$RESET_CONSOLE"

MYDIR="$(dirname "$(realpath "$0")")/"

CURRENT_TIMESTAMP=$(date +%s)
CURRENT_TIMESTAMP_=$CURRENT_TIMESTAMP

USERNAME="admin"
USERPASSWORD="1234"

BASICDISTNAME="noble" ## mantic
OVERWRITEFILES="OW/_FILES"
OVERWRITEFOLDER="OW/_BASEROOT"

echo "$_ST                                                    $_FN"
echo "$_ST Gerekli Bilgiler Toplanıyor...                     $_FN"

echo "$_ST Sistem Numarası Giriniz ($_ST_0$CURRENT_TIMESTAMP$_ST):              $_FN"
read CURRENT_TIMESTAMP
echo "Seçilen :$_ST_0$CURRENT_TIMESTAMP$_FN"
if [ -z "$CURRENT_TIMESTAMP" ]; then
	CURRENT_TIMESTAMP=$CURRENT_TIMESTAMP_
fi

TMPFOLDER="tmp/tmp_$CURRENT_TIMESTAMP"
echo "$_ST Ubuntu Dağıtım Adını Giriniz ($_ST_0$BASICDISTNAME$_ST):             $_FN"
read BASICDISTNAME
if [ -z "$BASICDISTNAME" ]; then
	BASICDISTNAME="noble"
fi
echo "Seçilen :$_ST_0$BASICDISTNAME$_FN"



ROOTFOLDERNAME=./"$TMPFOLDER/debroot"
SQUASHFS=./"$TMPFOLDER/squashfs"
ISO=./"$TMPFOLDER/ISO"

echo "$_ST Kullanıcı Adınızı Giriniz ($_ST_0$USERNAME$_ST):                 $_FN"
read USERNAME
if [ -z "$USERNAME" ]; then
	USERNAME="admin"
fi
echo "Seçilen :$_ST_0$USERNAME$_FN"


echo "$_ST Kullanıcı Şifrenizi Giriniz ($_ST_0$USERPASSWORD$_ST):                $_FN"
read USERPASSWORD
if [ -z "$USERPASSWORD" ]; then
	USERPASSWORD="1234"
fi
echo "Seçilen :$_ST_0$USERPASSWORD$_FN"

sudo sh ./CPool/dependency.sh

sudo mkdir -p "$SQUASHFS"
sudo mkdir -p "$ISO"

sudo mkdir -p "$ROOTFOLDERNAME"

ROOTFOLDERNAME=$(realpath ./"$TMPFOLDER/debroot")
SQUASHFS=$(realpath ./"$TMPFOLDER/squashfs")
ISO=$(realpath ./"$TMPFOLDER/ISO")

sudo chown root:root "$ROOTFOLDERNAME"

## ROOT Folder Mount
## sudo mount /dev/sdX "$ROOTFOLDERNAME"
## sudo sh ./CPool/mount.sh $ROOTFOLDERNAME sda 1

sudo sh ./CPool/build_folders.sh $ROOTFOLDERNAME

## SUBFOLDERS Mount
# mount /dev/sdX "$ROOTFOLDERNAME"/boot

sudo sh ./CPool/build_subfolders.sh $ROOTFOLDERNAME

## SUBFOLDERS Mount
# mount /dev/sdX "$ROOTFOLDERNAME"/boot/efi

sudo sh ./CPool/build_rootsystem.sh $BASICDISTNAME $ROOTFOLDERNAME

echo "$_ST Varsayılan ayarlar yükleniyor...                   $_FN"
sleep 1

sudo cp ./"$OVERWRITEFILES"/sources."$BASICDISTNAME".list "$ROOTFOLDERNAME"/etc/apt/sources.list
sudo cp ./"$OVERWRITEFILES"/resolv.conf "$ROOTFOLDERNAME"/etc/resolv.conf
sudo cp ./"$OVERWRITEFILES"/locale.gen "$ROOTFOLDERNAME"/etc/locale.gen
sudo cp ./"$OVERWRITEFILES"/locale.conf "$ROOTFOLDERNAME"/etc/locale.conf

sudo sh ./CPool/build_scene.sh $ROOTFOLDERNAME

sudo chmod 777 "$ROOTFOLDERNAME"
sudo chmod 777 "$ROOTFOLDERNAME"/home

sudo sh ./CPool/fixroot.sh $ROOTFOLDERNAME

sudo chroot "$ROOTFOLDERNAME" apt upgrade -y

sudo sh ./CPool/setlocale.sh $ROOTFOLDERNAME

sudo sh ./CPool/install_kernel.sh $ROOTFOLDERNAME

sudo sh ./CPool/set_users.sh $ROOTFOLDERNAME $USERNAME $USERPASSWORD

sudo sh ./CPool/generate_squashfs.sh $ROOTFOLDERNAME $SQUASHFS base

sudo cp -r ./"$OVERWRITEFOLDER"/* "$ROOTFOLDERNAME"

sudo mkdir -p "$ROOTFOLDERNAME"/home/"$USERNAME"/Templates
sudo mkdir -p "$ROOTFOLDERNAME"/home/"$USERNAME"/Public
sudo mkdir -p "$ROOTFOLDERNAME"/home/"$USERNAME"/Videos
sudo mkdir -p "$ROOTFOLDERNAME"/home/"$USERNAME"/Music
sudo mkdir -p "$ROOTFOLDERNAME"/home/"$USERNAME"/Pictures
sudo mkdir -p "$ROOTFOLDERNAME"/home/"$USERNAME"/Documents
sudo mkdir -p "$ROOTFOLDERNAME"/home/"$USERNAME"/Desktop
sudo mkdir -p "$ROOTFOLDERNAME"/home/"$USERNAME"/Downloads

sudo sh ./CPool/build_scene.sh $ROOTFOLDERNAME

sudo sh ./CPool/install_libraries.sh $ROOTFOLDERNAME

sudo sh ./CPool/fixroot.sh $ROOTFOLDERNAME

sudo sh ./CPool/install_kde.sh $ROOTFOLDERNAME
sudo sh ./CPool/install_lode.sh $ROOTFOLDERNAME

sudo sh ./CPool/live_media.sh $ROOTFOLDERNAME

sudo sh ./CPool/install_terminal-tools.sh $ROOTFOLDERNAME

sudo sh ./CPool/install_GUI-tools.sh $ROOTFOLDERNAME

sudo sh ./CPool/install_kiosk.sh $ROOTFOLDERNAME

sudo sh ./CPool/execute_msh.sh $ROOTFOLDERNAME

sudo sh ./CPool/fixroot.sh $ROOTFOLDERNAME
sudo chroot "$ROOTFOLDERNAME" bash
sudo sh ./CPool/fixroot.sh $ROOTFOLDERNAME










##sudo cp -r ./OW/_BASEROOT_KDE_PLASMA/* "$ROOTFOLDERNAME"/
##sudo cp -r ./OW/_BASEHOME_KDE_PLASMA/* "$ROOTFOLDERNAME"/home/admin/

##sudo mkdir -p "$ROOTFOLDERNAME"/home/admin/Templates
##sudo mkdir -p "$ROOTFOLDERNAME"/home/admin/Public
##sudo mkdir -p "$ROOTFOLDERNAME"/home/admin/Videos
##sudo mkdir -p "$ROOTFOLDERNAME"/home/admin/Music
##sudo mkdir -p "$ROOTFOLDERNAME"/home/admin/Pictures
##sudo mkdir -p "$ROOTFOLDERNAME"/home/admin/Documents
##sudo mkdir -p "$ROOTFOLDERNAME"/home/admin/Desktop
##sudo mkdir -p "$ROOTFOLDERNAME"/home/admin/Downloads














sudo sh ./CPool/generate_squashfs.sh $ROOTFOLDERNAME $SQUASHFS live

sudo cp ./"$OVERWRITEFILES"/grub.cfg "$ISO"/live_grub.cfg
sudo sh ./CPool/generate_ISO.sh $ROOTFOLDERNAME $SQUASHFS $ISO live































sudo umount -lf -R "$ROOTFOLDERNAME"/* 2>/dev/null













