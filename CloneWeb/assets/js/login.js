import { users } from "./datafake.js";
console.log(users);
$("#Login").on("click", function () {
  const username = $("#username").val();
  const password = $("#password").val();

  // Tìm người dùng trong dataFake.js
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (user) {
    // Lưu thông tin user vào localStorage (bao gồm cả role và orgId)
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Chuyển hướng sang trang quản trị
    window.location.href = "manageUser.html";
  } else {
    // Hiển thị thông báo lỗi (bỏ class hide của error-message)
    $(".data-alert-container span").text(
      "Tài khoản hoặc mật khẩu không chính xác!",
    );
    $(".data-alert-container").removeClass("hide");
  }
});
