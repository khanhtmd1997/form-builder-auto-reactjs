Version FormIO : 4.3.0
Version pdfmake: 0.2.4

------
tạo bảng lồng bảng:

-B1: tạo bảng (xem bao nhiêu columns để tạo, 1 row)
-B2 tạo thêm bảng lồng bảng của b1
 + title bảng thêm colspan hoặc rowspan ở **(tab layout đặt attribute: colspan || rowspan, attribute value : 'value')**, **titleTable** là css class để bỏ border cho table 
 
 +  **hideBorder** css class và **attribute: header => true** dùng để nhận biết là big title và có hide border hay không
 + map data dựa vào tab api thêm vào **Property Name**

===
class css: center, 
tag html: h1 - h6, p

- mỗi object to thì luôn có margin để chia khoảng cách giữa các row
- columns chứa các htmlElement
	+ tab display : 
		* HTML TAG:
		* CSS CLASS:
		* CONTENT:
	+ api:
		* Property Name: 
			** chứa Property name mà data api trả về (ví dụ data = [{display: 'name'}] => Property Name = display)
			** nếu là 1 list checkbox thì Property Name = listData
		* Field Tag: truyền thứ tự các Property name từ api (dùng để render 1 list data hiển thị checkbox)
			ví dụ: + dataMaster = [{master1: '0:無し1:有り', master2: '1:仙骨部2:坐骨部3:尾骨部4:腸骨部5:大転子部6:踵部7:その他'}]
					+ dataChild = [{child1: '1', child2: '1'}]
					=> add field tag theo thứ tự hiển thị mong muốn master1, child1,master2,child2
					=> data render: □0:無し■1:有り ■1:仙骨部□2:坐骨部□3:尾骨部□4:腸骨部□5:大転子部□6:踵部□7:その他
	+ layout: add các html attribute:
		+ nếu là listData:
			** selectbox: true
			** manylist: true
			** width: 40% (dùng chung cho tất cả nếu muốn fix width)
			** textbefore: ... (dùng để nối chuỗi ... phía sau data)
            **đặc biệt + sex: true (dùng để render list giới tính)**
		+ colspan
		+ rowspan

        ===
        + selectbox = true
        + manylist = true
        + listitem = true
        + first 0 (bắt đầu từ vị trí index)
        + last 3 (kết thúc vị trí index)
        => dùng để render list item
        ví dụ list 5 phần tử
            + first 0, last 3 => render list từ 1-3
            + first 3 => render 4-5
        