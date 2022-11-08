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

* *Nhược điểm:*  
Phù hợp với truy vấn đơn giản hơn các câu truy vấn phức tạp

## Mongoose  

Mongoose là một ODM. Mongoose cho phép bạn định nghĩa các object (đối tượng) với một schema được định nghĩa rõ ràng, được ánh xạ tới một MongoDB Document.

*Schema* xác định cấu trúc của các *Document*, nó giống như các bản ghi.

Mongoose hiện có 8 SchemaTypes. Đó là:

* String
* Number
* Date
* Buffer
* Boolean
* Mixed
* ObjectId
* Array
* Decimal128
* Map

*Model* giống như các *Document* để chứa các *Schema*, tương tự như các bảng.

## Các truy vấn nâng cao

* $lt – giá trị phải nhỏ hơn điều kiện

* $gt – giá trị phải lớn hơn điều kiện

* $lte – giá trị phải nhỏ hơn hoặc bằng điều kiện

* $gte – giá trị phải lớn hơn hoặc bằng điều kiện

* $in – giá trị phải nằm trong tập điều kiện

* $nin – giá trị phải không nằm trong tập điều kiện

* $not – giá trị không nắm trong điều kiện

Để tìm tất cả user mà tuổi nhỏ hơn 20 chạy câu truy vấn sau:

```javascript
db.user.find({age: {$lt: '20'}});
```

Nếu muốn cả những user 20 tuổi nằm trong kết quả trả về thì sử dụng truy vấn như sau:

```javascript
db.user.find({age: {$lte: '20'}});
```

Nếu muốn lấy cả những user 24 tuổi thì sử dụng truy vấn $gte

```javascript
db.user.find({age: {$gte: '24'}});
```

$in giúp chúng ta tìm kiếm các documents nằm trong điều kiện cho trước. Ví dụ muốn lấy về các user có email nằm trong nhóm email sau: 'alex@gmail.com' và 'smith@gmail.com'

```javascript
db.user.find({email: {'$in': ['alex@gmail.com', 'smith@gmail.com']}});
```

* $and: trả về documents phải thỏa mãn điều kiện

* $or: trả về documents thỏa mãn với 1 trong các điều kiện

* $not: trả về documents phủ định với điều kiện đưa ra

* $nor: trả về documents không thỏa mãn với cả 2 điều kiện

Ví dụ: bạn muốn lấy ra tất cả user có giới tính là nam

```javascript
db.user.find({$and: [{gender: 'Male'}, {email: 'alex@gmail.com'}]});
```

Ví dụ: bạn muốn lấy ra user là nữ hoặc trên 18 tuổi.

```javascript
db.user.find({$or: [{gender: 'Female'}, {age: {$gt: 18}}]});
```

Ví dụ: bạn muốn lấy ra các user lớn hơn 15 tuổi. Nghĩa là lấy các user nhỏ hơn hoặc bằng 15 tuổi.

```javascript
db.user.find({age: {$not: {$gt: '15'}}});
```

Ví dụ: bạn muốn lấy ra các user không phải nữ và không lớn hơn 15 tuổi.

```javascript
db.user.find({$nor: [{gender: 'Female'}, {age: {$gt: '20'}}]});
```

## So sánh với SQL

* Các trường dữ liệu trong SQL thường được biểu diễn theo bảng, gồm các cột và các dòng, các khoá liên kết với nhau chặt chẽ và cứng ngắc nên khi thay đổi một cột của bảng này có thể làm tổn hại đến bảng khác.

* Dữ liệu trong MongoDB biểu diễn dưới dạng Object, gồm key và value, khi thay đổi dữ liệu của Document này thì không liên quan đến các Document khác.
