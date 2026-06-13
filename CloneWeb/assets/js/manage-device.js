import { userWithOrgDTO, organization, devices } from "./datafake.js";
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const sidebar = $(".manage-sidebar");
let deviceTable;
// Sample data for the user table
function renderTable(data) {
  deviceTable = $("#deviceTable").DataTable({
    data: data,
    pageLength: 2,
    lengthChange: false,
    info: false,
    columns: [
      {
        data: "null",
        render: (data, type, row, meta) => meta.row + 1,
      },
      { data: "imei", orderable: false },
      { data: "deviceName", orderable: false },
      {
        data: "orgId",
        orderable: false,
        render: (data) => getOrgName(data),
      },
      {
        data: "status",
        orderable: false,
        render: (data) => {
          return data === "NEW"
            ? '<span class="badge badge-new">Nhập kho</span>'
            : '<span class="badge badge-active">Hoạt động</span>';
        },
      },
      {
        data: "null",
        orderable: false,
        defaultContent: "2024-06-10 12:00:00",
      },
      {
        data: null,
        orderable: false,
        render: function (data, type, row) {
          return `
            <div class="table-actions">
              <button class="btn-icon" title="Sửa"><i class="fa-solid fa-pen-to-square"></i></button>
              <button class="btn-icon delete" title="Xóa"><i class="fa-solid fa-trash"></i></button>
            </div>
          `;
        },
      },
    ],
    language: {
      search: "Tìm nhanh:",
      paginate: {
        first: "Đầu",
        last: "Cuối",
        next: "Sau",
        previous: "Trước",
      },
    },
  });
}
function getOrgName(orgId) {
  if (!orgId) return '<span class="text-muted">Kho hệ thống</span>';
  const org = organization.find((o) => o.id === orgId);
  return org ? org.name : "N/A";
}

function getFilteredOrgs(user, allOrgs) {
  if (user.role === "SUPER_ADMIN") {
    return allOrgs;
  }
  // Hàm phụ để lấy tất cả ID của các tổ chức con/cháu...
  function getAllDescendantIds(parentId, orgs) {
    let ids = [];
    orgs.forEach((org) => {
      if (org.parentId === parentId) {
        ids.push(org.id);
        ids = ids.concat(getAllDescendantIds(org.id, orgs)); // Đệ quy tìm tiếp cấp dưới
      }
    });
    return ids;
  }
  const myOrgId = user.orgId;
  if (!myOrgId) return [];

  // Lấy danh sách ID của tất cả các cấp bên dưới
  const descendantIds = getAllDescendantIds(myOrgId, allOrgs);

  // Trả về danh sách bao gồm chính mình và toàn bộ hậu duệ
  return allOrgs.filter(
    (org) => org.id === myOrgId || descendantIds.includes(org.id),
  );
  // if (user.orgId && allOrgs.find((o) => o.id === user.orgId)?.level === 1) {
  //   return allOrgs.filter(
  //     (org) => org.id === user.orgId || org.parentId === user.orgId,
  //   );
  // }
  // return allOrgs.filter((org) => org.id === user.orgId);
}
// Hàm đệ quy/vòng lặp để xây dựng các nhánh
function buildLeaf(orgs, parentId) {
  return orgs
    .filter((org) => org.parentId === parentId)
    .map((org) => buildOrgNode(org, orgs))
    .join("");
}
function buildOrgNode(org, allOrgs) {
  console.log("Org: ", org);
  console.log("AllOrg: ", allOrgs);

  const children = allOrgs.filter((child) => child.parentId === org.id);
  console.log("Children: ", children);

  const icon = org.level === 1 ? "fa-building" : "fa-store";

  if (children.length > 0) {
    return `
                <li>
                    <details>
                        <summary><i class="fa-solid ${icon}"></i> ${org.name}</summary>
                        <ul>${children.map((child) => buildOrgNode(child, allOrgs)).join("")}</ul>
                    </details>
                </li>`;
  } else {
    return `<li><i class="fa-solid ${icon}"></i> ${org.name}</li>`;
  }
}
function renderOrgTree() {
  const filteredOrgs = getFilteredOrgs(currentUser, organization);
  console.log(filteredOrgs);
  console.log(buildLeaf(filteredOrgs, null));
  let treeHtml = "";

  if (currentUser.role === "SUPER_ADMIN") {
    // Root đặc biệt cho Admin
    treeHtml = `
                <li>
                    <details open>
                        <summary><i class="fa-solid fa-sitemap"></i> HMS GPS (Hệ thống)</summary>
                        <ul>${buildLeaf(filteredOrgs, null)}</ul>
                    </details>
                </li>`;
  } else {
    // Hiển thị từ cấp cao nhất mà user thuộc về
    const myOrg = filteredOrgs.find((o) => o.id === currentUser.orgId);
    if (myOrg) {
      treeHtml = buildOrgNode(myOrg, filteredOrgs);
    }
  }

  $(".tree-panel .tree").html(treeHtml);
}
$(document).ready(function () {
  console.log("Current User: ", currentUser);
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
    if (typeof deviceTable !== "undefined") {
      setTimeout(() => {
        deviceTable.columns.adjust().draw();
      }, 300);
    }
  });
  if (!currentUser) {
    window.location.href = "login.html"; // Nếu chưa đăng nhập thì quay về
    return;
  }
  $(".user-name").text(`[ ${currentUser.username} ]`);
  // 1. Lấy danh sách các tổ chức mà user này có quyền xem (đã bao gồm đệ quy hậu duệ)
  const filteredOrgs = getFilteredOrgs(currentUser, organization);
  // 2. Tạo một mảng chỉ chứa các ID của các tổ chức này
  const allowedOrgIds = filteredOrgs.map((org) => org.id);
  let filteredData = [];
  if (currentUser.role === "SUPER_ADMIN") {
    // Admin quản trị tất cả [5]
    filteredData = devices;
  } else {
    filteredData = devices.filter((d) => {
      // Kiểm tra xem orgId của user này có nằm trong danh sách ID tổ chức hợp lệ không
      return allowedOrgIds.includes(d.orgId);
    });
  }
  renderTable(filteredData);

  renderOrgTree();
});
