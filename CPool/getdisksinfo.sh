
lsblk -b $1 | grep disk
lsblk -b $1 | grep part
fdisk -l -u $1
blkid $1
