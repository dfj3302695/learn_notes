1. 运行报错情况
在Mac安装wireshark很简单，傻瓜式操作后发现打开wireshark运行出错。

具体错误如下

Could not create profiles directory"/Users/songguanglei/.config/wireshark"

Could not open common recent file"/Users/songguanglei/.config/wireshark/recent_common": Permission denied.

Could not open recent file"/Users/songguanglei/.config/wireshark/recent": Permission denied.

You don't have permission to read the file "hosts".

You don't have permission to read the file "subnets".

You don't have permission to read the file "subnets".

You don't have permission to read the file "ss7pcs".

You don't have permission to read the file "init.lua".

Could not open recent file"/Users/songguanglei/.config/wireshark/recent_common": Permission denied.

Error loading table 'RSA Private Keys': Permission denied

Error loading table 'Display expressions': Permission denied

Error loading table 'SMI Paths': Permission denied

Error loading table 'SMI Modules': Permission denied

Error loading table 'MaxMind Database Paths': Permission denied

Error loading table 'NM User Data Fields Table': Permission denied

Error loading table 'OID Tables': Permission denied

Error loading table 'BTMesh Network keys': Permission denied

Error loading table 'Force Decode by Channel': Permission denied

Error loading table 'Decryption Table': Permission denied

Error loading table 'Node bodytypes': Permission denied

Error loading table 'Custom DHCP/BootP Options (Excl. suboptions)': Permission denied

Error loading table 'DMP Security Classifications': Permission denied

Error loading table 'DPS Security Mode Templates': Permission denied

Error loading table 'DPS Session Keys': Permission denied

Error loading table 'DPS Identity Secrets': Permission denied

Error loading table 'DTLS RSA Keylist': Permission denied

Error loading table 'Device-Specific Profiles': Permission denied

Error loading table 'NodeID-Specific Profiles': Permission denied

Error loading table 'ESS Category Attributes': Permission denied

Error loading table 'PDCP LTE Keys': Permission denied

Error loading table 'PDCP NR Keys': Permission denied

Error loading table 'Custom HTTP Header Fields': Permission denied

Error loading table 'Custom HTTP2 Header Fields': Permission denied

Error loading table 'WEP and WPA Decryption Keys': Permission denied

Error loading table 'Static Addresses': Permission denied

Error loading table 'Keys': Permission denied

Error loading table 'Custom IMF headers': Permission denied

Error loading table 'ESP SAs': Permission denied

Error loading table 'IKEv1 Decryption Table': Permission denied

Error loading table 'IKEv2 Decryption Table': Permission denied

Error loading table 'K12 Protocols': Permission denied

Error loading table 'LBMPDM-TCP tag definitions': Permission denied

Error loading table 'LBMR tag definitions': Permission denied

Error loading table 'LBT-RM tag definitions': Permission denied

Error loading table 'LBT-RU tag definitions': Permission denied

Error loading table 'LBT-TCP tag definitions': Permission denied

Error loading table 'Custom LDAP AttributeValue types': Permission denied

Error loading table 'LoRaWAN Encryption Keys': Permission denied

Error loading table 'User Object Names': Permission denied

Error loading table 'User Resource Names': Permission denied

Error loading table 'Static LCID -> drb Table': Permission denied

Error loading table 'Static LCID -> drb Table': Permission denied

Error loading table 'Message Decoding': Permission denied

Error loading table 'Security Contexts': Permission denied

Error loading table 'PDCP UE security keys': Permission denied

Error loading table 'PRES Users Context List': Permission denied

Error loading table 'Kind-ID Table': Permission denied

Error loading table 'SCCP Users Table': Permission denied

Error loading table 'Chunk types for the statistics dialog': Permission denied

Error loading table 'Custom SIP Header Fields': Permission denied

Error loading table 'SIP authorization users': Permission denied

Error loading table 'Secret session key to use for decryption': Permission denied

Error loading table 'SNMP Users': Permission denied

Error loading table 'SNMP Enterprise Specific Trap Types': Permission denied

Error loading table 'RSA Keys': Permission denied

Error loading table 'XTEA Keys': Permission denied

Error loading table 'TLS Decrypt': Permission denied

Error loading table 'User DLTs Table': Permission denied

Error loading table 'Bitstream Channel Table': Permission denied

Error loading table 'Pre-configured Keys': Permission denied

Error loading table 'ZigBee GP Security Keys': Permission denied

Error loading table 'Display Filter Macros': Permission denied

Error loading table 'Expert Info Severity Level Configuration': Permission denied

Error loading table 'Packet Lengths': Permission denied

Can't open your preferences file "/Users/songguanglei/.config/wireshark/preferences": Permission denied.

Could not open your disabled protocols file

"/Users/songguanglei/.config/wireshark/disabled_protos": Permission denied.

Could not open your enabled protocols file

"/Users/songguanglei/.config/wireshark/enabled_protos": Permission denied.

Could not open your heuristic dissectors file"/Users/songguanglei/.config/wireshark/heuristic_protos": Permission denied.

Could not open your capture filter file"/Users/songguanglei/.config/wireshark/cfilters": Permission denied.

Could not open your display filter file"/Users/songguanglei/.config/wireshark/dfilters": Permission denied.

Could not open filter file"/Users/songguanglei/.config/wireshark/colorfilters": Permission denied.

2.原因分析：

mac安装应用时给应用分配的是一般用户的权限，不是root权限，wireshark运行需要使用root权限，因此会报错。



3.解决方案：

给用户授权访问./config权限：sudo chown <username:group> ~/.config

eg:sudo chown sgl ~/.config //表示给sgl用户授权访问.config