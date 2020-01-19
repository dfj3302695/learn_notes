1. # 说明---
   中继、端口转发的模型：A、B、C
A是你自己，B是中继的VPS，C是需要被中继的VPS（A要通过B来加速对C的访问，所以配置都是在B上面，配置完成后A连接B，B将流量转发给C，C再转回给B，B最后才转回给A。这就是整个过程。）

2. # iptables配置
   开启防火墙的ipv4转发
   ```
    echo -e "net.ipv4.ip_forward=1" >> /etc/sysctl.conf
    sysctl -p
   ```
    1. ## 单端口 端口转发
       1. ### 同端口 端口转发

        ```
        iptables -t nat -A PREROUTING -p tcp --dport [本地端口] -j DNAT --to-destination [目标IP:目标端口]
        iptables -t nat -A PREROUTING -p udp --dport [本地端口] -j DNAT --to-destination [目标IP:目标端口]
        iptables -t nat -A POSTROUTING -p tcp -d [目标IP] --dport [目标端口] -j SNAT --to-source [本地服务器主网卡绑定IP]
        iptables -t nat -A POSTROUTING -p udp -d [目标IP] --dport [目标端口] -j SNAT --to-source [本地服务器主网卡绑定IP]

        ```
        以下示例，假设你的国外服务器（被中转服务器）是 1.1.1.1 ，你的SS端口是 10000 ，而你这台正在操作的VPS的主网卡绑定IP（中转服务器）是 2.2.2.2 。
        ```
        iptables -t nat -A PREROUTING -p tcp -m tcp --dport 10000 -j DNAT --to-destination 1.1.1.1:10000
        iptables -t nat -A PREROUTING -p udp -m udp --dport 10000 -j DNAT --to-destination 1.1.1.1:10000
        iptables -t nat -A POSTROUTING -d 1.1.1.1 -p tcp -m tcp --dport 10000 -j SNAT --to-source 2.2.2.2
        iptables -t nat -A POSTROUTING -d 1.1.1.1 -p udp -m udp --dport 10000 -j SNAT --to-source 2.2.2.2

        ```
        这个时候你Shadowsocks客户端填写Shadowsocks信息的时候，账号配置和端口填写都不变，只需要修改IP为中转服务器IP即可 。

       2. ### 不同端口 端口转发--

        将本地服务器(中转服务器 2.2.2.2 )的 10000 端口转发至目标IP(被中转服务器)为 1.1.1.1 的 30000 端口
        ```
        iptables -t nat -A PREROUTING -p tcp -m tcp --dport 10000 -j DNAT --to-destination 1.1.1.1:30000
        iptables -t nat -A PREROUTING -p udp -m udp --dport 10000 -j DNAT --to-destination 1.1.1.1:30000
        iptables -t nat -A POSTROUTING -d 1.1.1.1 -p tcp -m tcp --dport 30000 -j SNAT --to-source 2.2.2.2
        iptables -t nat -A POSTROUTING -d 1.1.1.1 -p udp -m udp --dport 30000 -j SNAT --to-source 2.2.2.2

        ```
        这个时候你Shadowsocks客户端填写Shadowsocks信息的时候，端口应该填 10000 而不是 30000 。
    2. ## 多端口 端口转发
       1. ### 同端口 端口转发

        将本地服务器(中转服务器 2.2.2.2 )的 10000~30000 端口转发至目标IP(被中转服务器)为 1.1.1.1 的 10000~30000 端口
        ```
        iptables -t nat -A PREROUTING -p tcp -m tcp --dport 10000:30000 -j DNAT --to-destination 1.1.1.1:10000-30000
        iptables -t nat -A PREROUTING -p udp -m udp --dport 10000:30000 -j DNAT --to-destination 1.1.1.1:10000-30000
        iptables -t nat -A POSTROUTING -d 1.1.1.1 -p tcp -m tcp --dport 10000:30000 -j SNAT --to-source 2.2.2.2
        iptables -t nat -A POSTROUTING -d 1.1.1.1 -p udp -m udp --dport 10000:30000 -j SNAT --to-source 2.2.2.2

        ```
        这个时候你Shadowsocks客户端填写Shadowsocks信息的时候，账号配置和端口填写都不变，只需要修改IP为中转服务器IP即可 。

       2. ### 不同端口 端口转发

        将本地服务器(中转服务器 2.2.2.2 )的 10000~20000 端口转发至目标IP(被中转服务器)为 1.1.1.1 的 30000~40000 端口
        ```
        iptables -t nat -A PREROUTING -p tcp -m tcp --dport 10000:20000 -j DNAT --to-destination 1.1.1.1:30000-40000
        iptables -t nat -A PREROUTING -p udp -m udp --dport 10000:20000 -j DNAT --to-destination 1.1.1.1:30000-40000
        iptables -t nat -A POSTROUTING -d 1.1.1.1 -p tcp -m tcp --dport 30000:40000 -j SNAT --to-source 2.2.2.2
        iptables -t nat -A POSTROUTING -d 1.1.1.1 -p udp -m udp --dport 30000:40000 -j SNAT --to-source 2.2.2.2

        ```
        这个时候你Shadowsocks客户端填写Shadowsocks信息的时候，端口应该填 10000~2000 而不是 30000~40000 。
3. # 保存iptables配置
   1. ## CentOS 系统：

    `service iptables save`

   2. ## Debian/Ubuntu 系统：

    `iptables-save > /etc/iptables.up.rules`
4. # 查看NAT规则

```
iptables -t nat -vnL POSTROUTING
iptables -t nat -vnL PREROUTING
```

5. # 删除NAT规则
   通过上面的查看规则命令，查看规则后，确定你要删除的规则的顺序，下面的命令是删除 第一个 规则。
   ```
    iptables -t nat -D POSTROUTING 1
    iptables -t nat -D PREROUTING 1
   ```


6. # 配置iptables开机加载
   1. ## CentOS 系统：

    ```
    service iptables save
    chkconfig --level 2345 iptables on
    ```

   2. ## Debian/Ubuntu 系统：

    ```
    iptables-save > /etc/iptables.up.rules
    echo -e '#!/bin/bash\n/sbin/iptables-restore < /etc/iptables.up.rules' > /etc/network/if-pre-up.d/iptables
    chmod +x /etc/network/if-pre-up.d/iptables
    ```