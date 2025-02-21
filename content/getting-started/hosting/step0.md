+++
title="Step0 サーバーを確保する"
weight=1
+++

何が何でもまずはマシンが必要です。今では月額2000円程度でVPSを借りることができますし、家にグローバルIPがある場合はRaspberry Piを使うこともできます。
少し上級者向けにはなりますが、グローバルIPがなくてもCloudflare Tunnelを使うことでも解決できます。

## Raspberry Piを使う

Raspberry Piでも十分にサーバーとして利用することが可能です。
ただし、OSとしてはRaspbianではなく、Ubuntuを使うことをお勧めします。

<div align="center">
    <img src="/images/raspiImager.png" width="500px" >
    <p>Ubuntu Desktop 24.04 LTS</p>
</div>

## VPSを借りる

VPSはVirtual Private Serverの略であり、国内のベンダーであれば、さくらインターネットやエックスサーバーなどが有名です。
月額数千円ででサーバーを借りることができます。

スペックとしては、最低でも2GBのメモリがあると良いでしょう。

### 最低限のセキュリティ設定を行う

ベンダーによっては、セキュリティ設定がデフォルトで甘い場合があります。以下の設定を行っておくと良いでしょう。

#### set hostname
```
root@x203-0-113-100:~# vim /etc/hostname
root@x203-0-113-100:~#
```

#### create user
```
root@x203-0-113-100:~# useradd -m YOUR_NAME
root@x203-0-113-100:~# ls /home
YOUR_NAME
root@x203-0-113-100:~#
```

#### パスワードを設定
```
root@ariake:~# passwd YOUR_NAME
New password:
Retype new password:
passwd: password updated successfully
root@ariake:~#
```

#### sshログイン設定
```
root@ariake:~# sudo -u YOUR_NAME mkdir -p /home/YOUR_NAME/.ssh/
root@ariake:~# echo "<YOUR_PUBKEY>" | sudo -u YOUR_NAME tee /home/YOUR_NAME/.ssh/authorized_keys
root@ariake:~#
```
```
root@ariake:~# ll /home/YOUR_NAME/.ssh/
total 12
drwxrwxr-x 2 YOUR_NAME YOUR_NAME 4096 May 25 18:37 ./
drwxr-x--- 3 YOUR_NAME YOUR_NAME 4096 May 25 18:35 ../
-rw-rw-r-- 1 YOUR_NAME YOUR_NAME   99 May 25 18:37 authorized_keys
root@ariake:~#
```

#### sudo設定
```
root@ariake:~# visudo
# User privilege specification
root    ALL=(ALL:ALL) ALL
YOUR_NAME ALL=(ALL:ALL) ALL
```

##### sudoの確認
```
YOUR_NAME@ariake:~$ sudo w
[sudo] password for YOUR_NAME:
 18:39:16 up 12 min,  2 users,  load average: 0.05, 0.03, 0.01
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
root              125.197.166.184  18:34   11:48   0.00s  0.08s sshd: root@pts/0
totegamm          125.197.166.184  18:37   11:48   0.00s   ?    sshd: YOUR_NAME [priv]
YOUR_NAME@ariake:~$
```

#### rootログイン禁止 & パスワードログイン禁止
```
root@ariake:~# vim /etc/ssh/sshd_config
33行目 PermitRootLogin prohibit-password
-> PermitRootLogin no
58行目 PasswordAuthentication yes
-> PasswordAuthentication no
(僕の場合すでにnoになっていた)

root@ariake:~# systemctl restart ssh
root@ariake:~#
```

#### ログイン確認
```
> 05/25 18:46 ~$ ssh root@162.43.29.124
root@162.43.29.124: Permission denied (publickey).
Exit status: 255
> 05/25 18:46 ~$


> 05/25 18:47 ~$ ssh YOUR_NAME@162.43.29.124
Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-31-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Sat May 25 18:47:59 JST 2024

  System load:  0.0               Processes:             139
  Usage of /:   3.3% of 95.82GB   Users logged in:       0
  Memory usage: 5%                IPv4 address for ens3: 162.43.29.124
  Swap usage:   0%

 * Strictly confined Kubernetes makes edge and IoT secure. Learn how MicroK8s
   just raised the bar for easy, resilient and secure K8s cluster deployment.

   https://ubuntu.com/engage/secure-kubernetes-at-the-edge

Expanded Security Maintenance for Applications is not enabled.

0 updates can be applied immediately.

Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status


The list of available updates is more than a week old.
To check for new updates run: sudo apt update

Last login: Sat May 25 18:45:13 2024 from 125.197.166.184
$ sudo w
[sudo] password for YOUR_NAME:
 18:48:06 up 21 min,  1 user,  load average: 0.00, 0.00, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
totegamm          125.197.166.184  18:47   20:38   0.00s   ?    sshd: YOUR_NAME [priv]
$
```

#### デフォルトシェルをbashに変更
```
$ chsh
Password:
Changing the login shell for YOUR_NAME
Enter the new value, or press ENTER for the default
        Login Shell [/bin/sh]: /bin/bash
$
```


