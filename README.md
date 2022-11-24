# backend-mongodb

## ORM & ODM

> Khi lập trình ứng dụng với ngôn ngữ hướng đối tượng, chúng ta làm việc với các đối tượng. Khi ứng dụng cần kết nối với DB, việc truy cập làm việc trực tiếp với data sẽ khó khăn hơn, bởi vậy người ta đã nghĩ ra một kỹ thuật để mapping DB thành các đối tượng, kỹ thuật này gọi là ORM/ODM. Như vậy lập trình viên sẽ xử lý dữ liệu thông qua ORM/ODM dễ hàng hơn, code sẽ ngắn gọn hơn.

![markdown](https://stackjava.com/wp-content/uploads/2017/11/orm.png)

* *ORM*: Hỗ trợ mapping giữa Object Model với Relational DB.

* *ODM*: hỗ trợ mapping giữa Object Model với Document DB.

## Mongoose  

Mongoose là một ODM. Mongoose cho phép bạn định nghĩa các object (đối tượng) với một schema được định nghĩa rõ ràng, được ánh xạ tới một MongoDB Document.

*Schema* xác định cấu trúc của các *Document*.

Mongoose hiện có các SchemaTypes:

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

## Mongoose Query

Trong file `main.js`

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

## Mối quan hệ

### One-to-one

Mỗi Parent chỉ sở hữu 1 Child và mỗi Child chỉ sở hữu một Parent

```javascript
const Owner = new mongoose.Schema({
    name: String
})

const houseSchema = new mongoose.Schema({
    street: String,
    owner: Owner
})

const House = mongoose.model("House", houseSchema)
// Create a new house
House.create({
    street: "100 Maple Street",
    owner: {name: "Alex Merced"}
})
```

### One-to-many

Mỗi Parent có thể sở hữu nhiều Children, mỗi Child chỉ sở hữu 1 Parent

```javascript
async function create() {
  const ownerSchema = new mongoose.Schema({
    name: String,
  });

  const Owner = mongoose.model('Owner', ownerSchema);

  const houseSchema = new mongoose.Schema({
    street: String,
    owner: [{ type: mongoose.Types.ObjectId, ref: 'Owner' }],
  });

  const House = mongoose.model('House', houseSchema);

  // Create a Owner
  const alex = await Owner.create({ name: 'Alex Merced' });
  const huyb = await Owner.create({ name: 'HuyB' });

  // Create a new house
  House.create({
    street: '100 Maple Street',
    owner: [alex, huyb],
  });
}
```

### Many-to-many

Mỗi Parent có thể sở hữu nhiều Children, mỗi Child có thể sở hữu nhiều Parents

```javascript
Owner: {
  name: 'Alex',
}
House: {
  street: 'A1',
}
HouseOwner: {
  name: 'Alex',
  street: 'A1',
}
```

## JSON - Java Script Object Notation

JSON là một định dạng văn bản để lưu trữ và vận chuyển dữ liệu

JSON thường được sử dụng khi dữ liệu được gửi từ máy chủ đến trang web

*Quy tắc cú pháp JSON:*

* Dữ liệu nằm trong các cặp key / value
* Dữ liệu được phân tách bằng dấu phẩy
* Dấu { } chứa Object
* Dấu [ ] chứa mảng

*Tại sao sử dụng JSON?*

Định dạng JSON về mặt cú pháp tương tự như code để tạo các đối tượng JavaScript. Do đó, một chương trình JavaScript có thể dễ dàng chuyển đổi dữ liệu JSON thành các đối tượng JavaScript.

Vì định dạng chỉ là văn bản nên dữ liệu JSON có thể dễ dàng được gửi giữa các máy tính và được sử dụng bởi bất kỳ ngôn ngữ lập trình nào.

### JSON.parse

Chuyển đổi các chuỗi JSON thành các đối tượng JavaScript

```javascript
const json = '{"result":true, "count":42}';
const obj = JSON.parse(json);

console.log(obj.count);
// expected output: 42

console.log(obj.result);
// expected output: true
```

### JSON.stringify

Chuyển đổi các đối tượng JavaScript thành các chuỗi JSON

```javascript
console.log(JSON.stringify({ x: 5, y: 6 }));
// expected output: "{"x":5,"y":6}"

console.log(JSON.stringify([new Number(3), new String('false'), new Boolean(false)]));
// expected output: "[3,"false",false]"

console.log(JSON.stringify({ x: [10, undefined, function(){}, Symbol('')] }));
// expected output: "{"x":[10,null,null,null]}"

console.log(JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)));
// expected output: ""2006-01-02T15:04:05.000Z""
```

## Population

Population là quá trình thay thế Reference được chỉ định trong Document của một Collection bằng Document từ Collection khác.

*Mongoose Query Population*
Trong file `main.js`

## Aggregation

Aggregation dùng để tổng hợp các câu lệnh phức tạp xử lý một số lượng lớn Document trong một Collection bằng cách chuyển chúng qua các giai đoạn khác nhau.

```javascript
collection.aggregate([
   { $match: { status: "A" } },// Giai đoạn 1
   // Sau khi qua giai đoạn này, kết quả được truyền xuống giai đoạn 2 xử lí
   
   { $group: { _id: "$cust_id", total: { $sum: "$amount" } } }// Giai đoạn 2
])
```
