Version FormIO : 4.3.0
Version pdfmake: 0.2.4

------
tạo bảng lồng bảng:

-B1: tạo bảng (xem bao nhiêu columns để tạo, 1 row)
-B2 tạo thêm bảng lồng bảng của b1
 + title bảng thêm colspan hoặc rowspan ở **(tab layout đặt attribute: colspan || rowspan, attribute value : 'value')**, **titleTable** là css class để bỏ border cho table 
 
 +  **hideBorder** css class và **attribute: header => true** dùng để nhận biết là big title và có hide border hay không
 + map data dựa vào tab api thêm vào **Property Name**
