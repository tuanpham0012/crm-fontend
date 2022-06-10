# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.


# Make by: Pham Quoc Tuan : github:https://github.com/tuanpham0012

# Backend: https://github.com/tuanpham0012/crm-backend.git

#  Demo

Hệ thống CRM cho doanh nghiệp về đầu tư hàng hóa phái sinh phải được thiết kế để đảm bảo được những yêu cầu đã đặt ra, hệ thống phải đảm bảo được tính bảo mật dữ liệu giữa các nhân viên, giao diện phải đơn giản, dễ hoạt động đối với nhân viên bình thường Đối với người quản trị và người quản lý thì phải có khả năng phân quyền cho các nhân viên khác. Font chữ sử dụng cho hệ thống phải là font phù hợp, không chứa các kí tự đặc biệt.. Giao diện của hệ thống gồm các giao diện của module Login, Singin, Account, Manage, Project, Task, Statistics, Contract… trong các module này module khi vào module nào cũng đều có cách hiện thị chung của đó là màn hình Listview, khi nhấp vào các thông tin chi tiết sẽ hiện ra màn hình Detail View, khi tạo hoặc chỉnh sửa các thuộc tính thì sẽ hiện ra màn hình Edit View để hiển thị màn hình chỉnh sửa các thông tin.

1.	Module Đăng nhập:
Giao diện module đăng nhập gồm các chức năng:
-	Đăng nhâp: nhân viên đăng nhập vào hệ thống bằng địa chỉ email và mật khẩu đã đăng kí từ trước.
-	Quên mật khẩu: Nhân viên có thể lấy lại mật khẩu bằng email đã đăng kí từ trước, mật khẩu mới sẽ được gửi về email.
-	Nhớ đăng nhập: ghi nhớ tài khoản cho lần đăng nhập tiếp theo.

 ![image](https://user-images.githubusercontent.com/61484553/173097817-4e44944e-f72d-4ee8-b010-9e186b8a2968.png)
Hình 1: Màn hình đăng nhập
2.	Module Trang chủ
Khi đăng nhập thành công người dùng sẽ được chuyển đến trang chủ. Giao diện trang chủ gồm các thông tin chính và giúp truy cập nhanh vào các đường dẫn module khác.

![image](https://user-images.githubusercontent.com/61484553/173098007-4f7815c1-0d07-450e-9f0a-320daf50f06b.png)
Hình 2: Màn hình trang chủ

3.	Module Quản lý.
3.1.	Quản lý người dùng:
	Giao diện màn hình ListView của module quản lý nhân viên bao gồm các thông tin như Họ tên, Địa chỉ email, Số điện thoại, Phòng ban, Lần đăng nhập cuối. Ngoài ra có thể tìm nhân viên theo tên, địa chỉ email hoặc số điện thoại. Lọc nhân viên theo phòng ban hoặc trạng thái. Người quản lí có thể thêm mới nhân viên khi nhấn vào nút thêm mới hoặc xem và cập nhật thông tin nhân viên khi nhấn vào ảnh đại diện của nhân viên.
 ![image](https://user-images.githubusercontent.com/61484553/173098046-8daa0707-5aa1-4bd7-9e47-57136597a2ad.png)
Hình 3: Màn hình quản lý nhân viên

-	Giao diện thêm mới nhân viên: gồm các field để điền thông tin cơ bản.
![image](https://user-images.githubusercontent.com/61484553/173098101-4ce8f29e-e06a-4cd3-aa04-3acdb667c12e.png)
Hình 4: Màn hình thêm mới nhân viên
-	Giao diện Thông tin nhân viên:
![image](https://user-images.githubusercontent.com/61484553/173098135-c6abe63b-6135-44ea-867a-e2e7b18fdfc0.png)
Hình 5: Màn hình thông tin nhân viên
 ![image](https://user-images.githubusercontent.com/61484553/173098172-76f147f5-b11c-4b08-90b5-38457a6d303c.png)
Hình 6:Màn hình thông tin nhân viên
  ![image](https://user-images.githubusercontent.com/61484553/173098198-df788cb1-36e4-4257-bc00-e2807049afc8.png)
Hình 7: Màn hình thông tin nhân viên

-	Giao diện cập nhật thông tin: gồm các field để điền thông tin cụ thể.
 ![image](https://user-images.githubusercontent.com/61484553/173098260-080644e6-7666-4841-a83a-c76a88373fc6.png)
![image](https://user-images.githubusercontent.com/61484553/173098302-54262efe-abdd-428e-96ab-1c9bbc403b1d.png)
Hình 8: Màn hình cập nhật thông tin nhân viên

3.2.	Quản lý khách hàng:
Giao diện màn hình ListView của module quản lý khách hàng bao gồm các thông tin như Họ tên, Địa chỉ email, Số điện thoại, Ngày sinh, Mối quan hệ, Người phụ trách,.... Có thể tìm khách hàng theo tên, địa chỉ email. Lọc khách hàng theo mối quan hệ hoặc trạng thái. Người quản lí có thể thêm mới khách hàng khi nhấn vào nút thêm mới hoặc xem và cập nhật thông tin khách hàng.
 ![image](https://user-images.githubusercontent.com/61484553/173098355-aec435db-33fd-4050-8512-c935a68247cd.png)
Hình 9:Màn hình danh sách khách hàng
Người quản lý có thể thực hiện các chức năng như: Cập nhật người phụ trách, Gửi email, Cập nhật quan hệ , Xóa,.. trên nhiều khách hàng cùng lúc

 ![image](https://user-images.githubusercontent.com/61484553/173098586-826409a8-0616-45e3-9b40-f6383c824e39.png)
Hình 10: Màn hình tiện ích

-	Giao diện thêm mới khách hàng:
 ![image](https://user-images.githubusercontent.com/61484553/173098622-b5bb6423-4405-47a8-bf9c-a4a364af9357.png)
Hình 11: Màn hình thêm mới khách hàng
-	Modal Thông tin khách hàng:
 ![image](https://user-images.githubusercontent.com/61484553/173098646-417c1082-031b-40b1-86cf-b48e9f434f87.png)
Hình 12: Modal Thông tin khách hàng
-	Giao diện thông tin khách hàng: 
![image](https://user-images.githubusercontent.com/61484553/173098702-ebc33a03-abed-4ac5-b8ad-91d86cdd1d61.png)
 ![image](https://user-images.githubusercontent.com/61484553/173098744-63610ac0-46d1-493f-83c1-e9cf279548da.png)
 ![image](https://user-images.githubusercontent.com/61484553/173098786-b22ea3ed-3c15-4bc3-8a16-18c8df61b407.png)
 ![image](https://user-images.githubusercontent.com/61484553/173098836-257cb3b9-a30b-436b-ad92-748d42d91efa.png)
 ![image](https://user-images.githubusercontent.com/61484553/173098868-23a59047-445f-4ba6-8704-45d31d5efdd4.png)
Hình 13: Màn hình thông tin khách hàng

-	Giao diện sửa thông tin khách hàng:
 ![image](https://user-images.githubusercontent.com/61484553/173098960-49d46e1e-75a9-41b6-90c3-f673b61885ed.png)
Hình 14: Màn hình sửa thông tin khách hàng

4.	Module Công việc:
Giao diện màn hình ListView của module công việc bao gồm các tab chia theo trạng thái của công việc,.... Có thể tìm kiếm công việc theo tên của công việc. Người quản lí có thể thêm mới công việc khi nhấn vào nút thêm mới hoặc xem và cập nhật thông tin của công việc.

 ![image](https://user-images.githubusercontent.com/61484553/173099002-4e13b086-abbf-4a34-9611-e0f75bcdd377.png)

![image](https://user-images.githubusercontent.com/61484553/173099029-d458526e-f92b-4206-b6fb-66fdd0f7c4a0.png)

![image](https://user-images.githubusercontent.com/61484553/173099075-89e11924-be7d-489e-b543-b454c0bcb85b.png)

![image](https://user-images.githubusercontent.com/61484553/173099096-a6802692-cb45-4a62-8169-bab5ee376627.png)

![image](https://user-images.githubusercontent.com/61484553/173099118-8cc72120-7afd-4b7a-bc44-eed64a322be8.png)

![image](https://user-images.githubusercontent.com/61484553/173099176-27e35a7c-b7c4-405d-9c14-44195766c1aa.png)
Hình 15: Màn hình danh sách công việc
-	Giao diện thêm mới công việc:
![image](https://user-images.githubusercontent.com/61484553/173099263-f3bf23c3-c520-4d5e-8234-345525dee462.png)
Hình 16: Màn hình  thêm mới công việc:

-	Giao diện thông tin chi tiết công việc:
![image](https://user-images.githubusercontent.com/61484553/173099289-c69eb31c-505f-4388-83e4-56803fbd11f3.png)
 ![image](https://user-images.githubusercontent.com/61484553/173099313-f8d30c21-619b-4edc-95b1-9383d60e1ecf.png)
Hình 17: Màn hình thông tin chi tiết công việc



Người tạo công việc có thể chỉnh sửa các thông tin của công việc như: Tên, thời gian bắt đầu hoặc kết thúc của công việc, nội dung công việc, người tham gia, khách hàng liên quan,..
 ![image](https://user-images.githubusercontent.com/61484553/173099411-126fa66e-a30b-47e2-b940-f5c0b2f8f550.png)
Hình 18: Màn hình cập nhật  thông tin chi tiết công việc


Có thể theo dõi công việc qua các ghi chú:

 ![image](https://user-images.githubusercontent.com/61484553/173099450-ed736675-992f-48af-a8fa-78a1114593f5.png)
Hình 19: Theo dõi công việc qua các ghi chú

5.	Module Dự án

Giao diện màn hình ListView của module dự án bao gồm danh sách các dự án đang tham gia,.... Có thể tìm kiếm dự án theo tên hoặc mã của dự án. Người dùng có thể thêm mới dự án khi nhấn vào nút thêm mới hoặc tham gia các dự án đang có khi nhấn vào nút tham gia dự án.

![image](https://user-images.githubusercontent.com/61484553/173099528-9d9c9125-666a-4ae2-80fb-42a93866d3ca.png)
Hình 20: Màn hình danh sách dự án


-	Giao diện xin tham gia dự án.
 ![image](https://user-images.githubusercontent.com/61484553/173099549-d414c2d0-a74e-48d1-96c6-d82d406f62d1.png)
![image](https://user-images.githubusercontent.com/61484553/173099595-bca5d5f2-930e-4216-9708-de9cb0e164b9.png)
Hình 21: Giao diện xin tham gia dự án
-	Tạo mới dự án
 ![image](https://user-images.githubusercontent.com/61484553/173099623-7144f2d0-fb5d-4086-9078-2a7b942f034a.png)
![image](https://user-images.githubusercontent.com/61484553/173099841-e5982f6b-9879-4b09-9937-a1add7bd3e96.png)
Hình 22: Màn hình  tạo mới dự án
-	Giao diện chi tiết dự án
 ![image](https://user-images.githubusercontent.com/61484553/173099872-65de2494-8714-4d77-91a2-26d4d20da662.png)
![image](https://user-images.githubusercontent.com/61484553/173099901-c2185d8a-a352-4a12-a5e2-a2618d332e9c.png)
![image](https://user-images.githubusercontent.com/61484553/173099935-16b1e835-1d07-416d-bca1-26885168258e.png)
Hình 23: Màn hình chi tiết dự án

-	Chỉnh sửa thông tin dự án
![image](https://user-images.githubusercontent.com/61484553/173099974-3ae5fad0-0da2-449f-8f62-fa468a8bec82.png)
Hình 24: Màn hình chỉnh sửa thông tin dự án

6.	Thông báo
Thông báo cho người dùng các hoạt động mới liên quan đến mình như khách hàng mới, công việc, dự án,…
 ![image](https://user-images.githubusercontent.com/61484553/173100011-5e4e7217-59a3-4646-8fa8-f792364d2ca9.png)
Hình 25: Bảng thông báo

