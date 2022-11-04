# backend-mongodb

## ORM & ODM

> Khi lập trình ứng dụng với ngôn ngữ hướng đối tượng, chúng ta làm việc với các đối tượng. Khi ứng dụng cần kết nối với DB, việc truy cập làm việc trực tiếp với data sẽ khó khăn hơn, bởi vậy người ta đã nghĩ ra một kỹ thuật để mapping DB thành các đối tượng, kỹ thuật này gọi là ORM/ODM. Như vậy lập trình viên sẽ xử lý dữ liệu thông qua ORM/ODM dễ hàng hơn, code sẽ ngắn gọn hơn.

![markdown](https://stackjava.com/wp-content/uploads/2017/11/orm.png)

* *ORM*: Hỗ trợ mapping giữa Object Model với Relational DB.

* *ODM*: hỗ trợ mapping giữa Object Model với Document DB

* *Ưu điểm:*  
Các câu truy vấn ngắn gọn và dễ hiểu hơn  
Linh hoạt, dễ thay đổi cấu trúc  
Dễ tái sử dụng  

* *Nhược điểm*:  
Thư viện nặng

## Mongoose  

Mongoose là một ODM. Mongoose cho phép bạn định nghĩa các object (đối tượng) với một schema được định nghĩa rõ ràng, được ánh xạ tới một MongoDB document.

Mongoose hiện có 8 SchemaTypes. Đó là:

* String
* Number
* Date
* Buffer
* Boolean
* Mixed
* ObjectId
* Array
