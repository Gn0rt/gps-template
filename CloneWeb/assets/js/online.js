var map;
let isDragging = false;
var deviceOnlineTable;
//1: online
//2: offline
//3: disconnect
//4: lost gps
const dataFake = [
  {
    id: 1,
    imei: "123456789011",
    time: "2026-06-12T14:00:00Z",
    status: 1,
  },
  {
    id: 2,
    imei: "123456789011",
    time: "2026-06-12T14:00:00Z",
    status: 1,
  },
  {
    id: 3,
    imei: "123456789011",
    time: "2026-06-12T14:00:00Z",
    status: 2,
  },
  {
    id: 4,
    imei: "123456789011",
    time: "2026-06-12T14:00:00Z",
    status: 2,
  },
  {
    id: 5,
    imei: "123456789011",
    time: "2026-06-12T14:00:00Z",
    status: 3,
  },
  {
    id: 6,
    imei: "123456789011",
    time: "2026-06-12T14:00:00Z",
    status: 3,
  },
  {
    id: 7,
    imei: "123456789011",
    time: "2026-06-12T14:00:00Z",
    status: 3,
  },
  {
    id: 8,
    imei: "123456789011",
    time: "2026-06-12T14:00:00Z",
    status: 4,
  },
  {
    id: 9,
    imei: "123456789011",
    time: "2026-06-12T14:00:00Z",
    status: 4,
  },
  {
    id: 10,
    imei: "123456789011",
    time: "2026-06-12T14:00:00Z",
    status: 1,
  },
  {
    id: 11,
    imei: "123456789011",
    time: "2026-06-12T14:00:00Z",
    status: 2,
  },
];
const iconOn = L.icon({
  iconUrl: "./assets/img/",
});
function formatDateTime(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const datePart = date.toLocaleDateString("vi-VN");
  const timePart = date.toLocaleTimeString("vi-VN");
  return `${datePart} ${timePart}`;
}
function formatStatus(status) {
  switch (status) {
    case 1:
      return `<span style="font-size: 12px; background-color: #4fdb62; display: inline-block; color: #fff; padding: 3px; border-radius: 5px; font-weight: 600">Hoạt động</span>`;
      break;
    case 2:
      return `<span style="font-size: 12px;background-color: #000; display: inline-block; color: #fff; padding: 3px; border-radius: 5px; font-weight: 600">Tắt máy</span>`;
      break;
    case 3:
      return `<span style="font-size: 12px; background-color: #db794f; display: inline-block; color: #fff; padding: 3px; border-radius: 5px; font-weight: 600">Mất tín hiệu</span>`;
      break;
    case 4:
      return `<span style="font-size: 12px; background-color: #db4f4f; display: inline-block; color: #fff; padding: 3px; border-radius: 5px; font-weight: 600">Mất GPS</span>`;
      break;
    default:
      break;
  }
}
function getIconByStatus(status) {
  switch (status) {
    case 1:
      return `<img src="./assets/img/vehicle/DiChuyen.png" style="width: 12px; height: 20px;" />`;
      break;
    case 2:
      return `<img src="./assets/img/vehicle/TatMay.png" style="width: 12px; height: 20px;" />`;
      break;
    case 3:
      return `<img src="./assets/img/vehicle/MatTinHieu.png" style="width: 12px; height: 20px;" />`;
      break;
    case 4:
      return `<img src="./assets/img/vehicle/LostGPS.png" style="width: 12px; height: 20px;" />`;
      break;
    default:
      break;
  }
}
function renderTable(data) {
  deviceOnlineTable = $("#deviceOnlineTable").DataTable({
    data: data,
    searching: true,
    autoWidth: true,
    ordering: false,
    scrollX: true,
    scrollCollapse: true,
    paging: false,
    info: false,

    columns: [
      {
        data: null,
        orderable: false,
        width: "50px",
        render: function (data, type, row, meta) {
          return getIconByStatus(row.status);
        },
      },
      {
        data: "imei",
        orderable: false,
        width: "120px",
      },
      {
        data: "time",
        orderable: false,
        width: "160px",
        render: function (data, type, row) {
          return formatDateTime(data);
        },
      },
      {
        data: "status",
        width: "80px",
        orderable: false,
        render: function (data, type, row) {
          return formatStatus(data);
        },
      },
    ],
    dom: "lrt",
    initComplete: function () {
      const api = this.api();
      api.columns.adjust(); // tính width sau khi load xong
    },
  });
}
function updateVehicleCount(data) {
  let countOn = 0;
  let countOff = 0;
  let countDis = 0;
  let countLost = 0;

  data.forEach((item) => {
    switch (item.status) {
      case 1:
        countOn++;
        break;
      case 2:
        countOff++;
        break;
      case 3:
        countDis++;
        break;
      case 4:
        countLost++;
        break;
    }
  });
  $(".count-on").text(countOn);
  $(".count-off").text(countOff);
  $(".count-dis").text(countDis);
  $(".count-lost").text(countLost);
  $(".count-vehicle").text(data.length);
}
$(document).ready(function () {
  map = L.map("map", {
    attributionControl: false,
    zoomControl: false,
  }).setView([21.02966365716083, 105.82091052009575], 13);
  L.tileLayer("http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}&hl=vi", {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }).addTo(map);

  renderTable(dataFake);
  updateVehicleCount(dataFake);
  $("#toggle-sidebar").click(function () {
    $("#sidebar").toggleClass("collapsed");
  });

  $(".splitter").on("mousedown", function () {
    isDragging = true;
  });
  $(document).on("mouseup", function () {
    isDragging = false;
    if (deviceOnlineTable) {
      deviceOnlineTable.columns.adjust().draw();
    }
  });
  $(document).on("mousemove", function (e) {
    if (!isDragging) return;
    const sidebarTop = $("#sidebar").offset().top;
    const sidebarHeight = $("#sidebar").height();
    let newHeight = e.clientY - sidebarTop;

    newHeight = Math.max(150, newHeight);
    newHeight = Math.min(sidebarHeight - 150, newHeight);

    $(".tree-panel").height(newHeight);
    if (deviceOnlineTable) {
      deviceOnlineTable.columns.adjust();
    }
  });

  $(".list-status .item").on("click", function () {
    $(".list-status .item").css("opacity", "0.5");
    $(this).css("opacity", "1");
    let filterValue = "";
    if ($(this).hasClass("item-online")) {
      filterValue = "Hoạt động";
    } else if ($(this).hasClass("item-offline")) {
      filterValue = "Tắt máy";
    } else if ($(this).hasClass("item-disconnect")) {
      filterValue = "Mất tín hiệu";
    } else if ($(this).hasClass("item-lostgps")) {
      filterValue = "Mất GPS";
    } else {
      filterValue = "";
      $(".list-status .item").css("opacity", "1");
    }

    if (filterValue !== "") {
      deviceOnlineTable
        .columns(3)
        .search("^" + filterValue + "$", true, false)
        .draw();
    } else {
      deviceOnlineTable.column(3).search("").draw();
    }
  });
});
