const sidebar = $(".manage-sidebar");
// Sample data for the user table
const userData = [
  {
    stt: 1,
    account: "admin_rovi",
    org: "ROVI GPS",
    level: "Cấp 0",
    role: "Quản trị hệ thống",
    date: "2024-01-10",
  },
  {
    stt: 2,
    account: "solution_a_admin",
    org: "Công ty Solution A",
    level: "Cấp 1",
    role: "Quản trị tổ chức",
    date: "2024-02-15",
  },
  {
    stt: 3,
    account: "retail_c_staff",
    org: "Đại lý Bán lẻ C",
    level: "Cấp 2",
    role: "Nhân viên",
    date: "2024-03-20",
  },
];
$(document).ready(function () {
  // Sidebar Toggle Functionality
  $("#toggle-sidebar").click(function () {
    sidebar.toggleClass("collapsed");
    if (sidebar.hasClass("collapsed")) {
      $(this).css("left", "0");
    } else {
      $(this).css("left", "266px");
    }

    // Update icon based on state
    const icon = $(this).find("i");
    if ($(".manage-sidebar").hasClass("collapsed")) {
      icon.removeClass("fa-chevron-left").addClass("fa-chevron-right");
    } else {
      icon.removeClass("fa-chevron-right").addClass("fa-chevron-left");
    }

    // Adjust DataTable columns if sidebar is toggled
    if (typeof userTable !== "undefined") {
      setTimeout(() => {
        userTable.columns.adjust().draw();
      }, 300);
    }
  });

  // Initialize DataTable
  const userTable = $("#userTable").DataTable({
    data: userData,
    columns: [
      { data: "stt" },
      { data: "account" },
      { data: "org" },
      { data: "level" },
      { data: "role" },
      { data: "date" },
      {
        data: null,
        render: function (data, type, row) {
          return `
            <div class="table-actions">
              <button class="btn-icon" title="Sửa"><i class="fa-solid fa-pen-to-square"></i></button>
              <button class="btn-icon delete" title="Xóa"><i class="fa-solid fa-trash"></i></button>
              <button class="btn-icon reset" title="Reset Pass"><i class="fa-solid fa-key"></i></button>
            </div>
          `;
        },
      },
    ],
    language: {
      search: "Tìm nhanh:",
      lengthMenu: "Hiển thị _MENU_ mục",
      info: "Hiển thị _START_ đến _END_ trong tổng số _TOTAL_ người dùng",
      paginate: {
        first: "Đầu",
        last: "Cuối",
        next: "Sau",
        previous: "Trước",
      },
    },
    dom: '<"top"f>rt<"bottom"ip><"clear">',
  });
});
