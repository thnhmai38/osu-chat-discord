Cách dùng:

B1: `git clone https://github.com/thanhgaming5550/osu-chat-discord.git`

B2: `npm install`


B3: 
**Tạo 1 file `.env` và ghi các nội dung sau:**
```
TOKEN= //Token Discord Bot của bạn
NAME= //Name osu username (IRC)
IRC= //IRC Password
```
*Để lấy IRC, truy cập [trang web này](https://osu.ppy.sh/p/irc)*


B4:**Trong `config.json`, config theo mẫu:**
```
{
    "channel" : [ //Theo dõi kênh osu chat
        {  //Xóa phần ngoặc nhọn {} nếu không dùng
            "channel":"ID_Kênh_Muốn_Gửi",
            "osucnn":"Name_của_osu_channel (có #)"
        },
        ....
    ], 
    "pm": [  //Theo dõi PM chat
        { //Xóa phần ngoặc nhọn {} nếu không dùng
            "channel": "//ID kênh muốn gửi"
        },
        ....
    ]
}
```

B5: `node index.js`
