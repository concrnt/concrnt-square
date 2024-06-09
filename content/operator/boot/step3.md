+++
title="Step3 アクセスできるようにする"
weight=1
+++


## nginxのインストール
```
$ sudo apt install nginx
```

## 証明書の作成
```
totegamma@ariake:~$ sudo apt install ssl-cert
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following NEW packages will be installed:
  ssl-cert
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Need to get 17.8 kB of archives.
After this operation, 67.6 kB of additional disk space will be used.
Get:1 http://nova.clouds.archive.ubuntu.com/ubuntu noble/main amd64 ssl-cert all 1.1.2ubuntu1 [17.8 kB]
Fetched 17.8 kB in 1s (28.8 kB/s)
Preconfiguring packages ...
Selecting previously unselected package ssl-cert.
(Reading database ... 86831 files and directories currently installed.)
Preparing to unpack .../ssl-cert_1.1.2ubuntu1_all.deb ...
Unpacking ssl-cert (1.1.2ubuntu1) ...
Setting up ssl-cert (1.1.2ubuntu1) ...
Created symlink /etc/systemd/system/multi-user.target.wants/ssl-cert.service → /usr/lib/systemd/system/ssl-cert.service.
Processing triggers for man-db (2.12.0-4build2) ...
Scanning processes...
Scanning linux images...

Running kernel seems to be up-to-date.

No services need to be restarted.

No containers need to be restarted.

No user sessions are running outdated binaries.

No VM guests are running outdated hypervisor (qemu) binaries on this host.
totegamma@ariake:~$ sudo make-ssl-cert generate-default-snakeoil
totegamma@ariake:~$ sudo /etc/ssl/certs/ssl-cert-snakeoil.pem
sudo: /etc/ssl/certs/ssl-cert-snakeoil.pem: command not found
totegamma@ariake:~$ sudo ls /etc/ssl/certs/ssl-cert-snakeoil.pem
/etc/ssl/certs/ssl-cert-snakeoil.pem
totegamma@ariake:~$
```


## nginxの設定

```
map $http_upgrade $connection_upgrade {
  default upgrade;
  ''      close;
}

server {
  listen 80;
  listen [::]:80;

  location / { return 301 https://$server_name$request_uri; }
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name ariake.concrnt.net;

  ssl_session_timeout 1d;
  ssl_session_cache shared:ssl_session_cache:10m;
  ssl_session_tickets off;

  ssl_certificate /etc/ssl/certs/ssl-cert-snakeoil.pem;
  ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;

  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
  ssl_prefer_server_ciphers on;
  ssl_stapling on;
  ssl_stapling_verify on;

  location / {
    proxy_pass http://ccgateway.concrnt.svc.cluster.local;
    proxy_set_header Host $host;
    proxy_http_version 1.1;
    proxy_redirect off;

    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
  }
}
```


## CDN設定
cloudflareとかでいい感じによろ

