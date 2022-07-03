<h1 align="center">
  osu-chat-discord
</h1>

<p align="center">
    <a href="https://lgtm.com/projects/g/thanhgaming5550/osu-chat-discord/alerts/"><img alt="Total alerts" src="https://img.shields.io/lgtm/alerts/g/thanhgaming5550/osu-chat-discord.svg?logo=lgtm&logoWidth=18"/></a>
    <a href="https://lgtm.com/projects/g/thanhgaming5550/osu-chat-discord/context:javascript"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/thanhgaming5550/osu-chat-discord.svg?logo=lgtm&logoWidth=18"/></a>
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/thanhgaming5550/osu-chat-discord">
    <img alt="GitHub" src="https://img.shields.io/github/license/thanhgaming5550/osu-chat-discord">
    <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/thanhgaming5550/osu-chat-discord">
</p>

## Yêu cầu cài đặt
* [Node.js](https://nodejs.org/)
* npm (ngầm định trong Node.js)


## Cách dùng:

1. Chạy `git clone https://github.com/thanhgaming5550/osu-chat-discord.git` hoặc tải thủ công rồi giải nén. Vào thư mục đó.

2. Chạy `npm install`

3. Tạo 1 file `.env` và ghi các nội dung sau:
```
TOKEN= #Token Discord Bot của bạn
NAME= #Name osu username (IRC)
IRC= #IRC Password
```
*Để lấy IRC, truy cập [trang web này](https://osu.ppy.sh/p/irc)*


4. Trong `config.json`, config theo mẫu:
```
{
    "channel" : [ #Theo dõi kênh osu chat
        {  #Xóa phần ngoặc nhọn {} nếu không dùng
            "channel":"ID_Kênh_Muốn_Gửi",
            "osucnn":"Name_của_osu_channel (có chứa #)"
        },
        #....
    ], 
    "pm": [  #Theo dõi PM chat (Chat PM của người cho IRC)
        { #Xóa phần ngoặc nhọn {} nếu không dùng
            "channel": "ID kênh muốn gửi"
        },
        #....
    ]
}
```

5. Chạy `node index.js`

## Mở rộng:
- Bạn có thể thay đổi cách hiển thị đầu ra tin nhắn trên Discord theo ý bạn bằng cách tùy chỉnh nó (đối với channel chat) ở dòng 60 (cho tin nhắn dạng /np, /me,...) https://github.com/thanhgaming5550/osu-chat-discord/blob/5de753be2677b09b8b21af2f220b8b7ceb55ef8a/index.js#L60 và dòng 61 (dạng tin nhắn thường) https://github.com/thanhgaming5550/osu-chat-discord/blob/5de753be2677b09b8b21af2f220b8b7ceb55ef8a/index.js#L61


  **Trong đó các biến:** ```message.user.ircUsername``` là tên người gửi, ```message.message.replace(`�ACTION`, ``).slice(0, -1)``` là nội dung tin nhắn sau khi đã được xử lý **ACTION** (chỉ cho tin nhắn dạng /np, /me,...), ```message.message``` là nội dung tin nhắn nguyên gốc, ```channel``` là tên kênh mà tin nhắn đó được gửi trên osu!Bancho
  
  
    *Tương tự với PM Chat, dòng 31 (cho tin nhắn dạng /np, /me,...) https://github.com/thanhgaming5550/osu-chat-discord/blob/5de753be2677b09b8b21af2f220b8b7ceb55ef8a/index.js#L31 và dòng 32 (dạng tin nhắn thường) https://github.com/thanhgaming5550/osu-chat-discord/blob/5de753be2677b09b8b21af2f220b8b7ceb55ef8a/index.js#L32 
