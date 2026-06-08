var map;
let isDragging = false;
var deviceOnlineTable;
const dataFake = [
  {
    id: 1,
    imei: "123456789011",
    time: "2026-06-12T14:00:00Z",
    status: "online",
  },
  {
    id: 2,
    imei: "123456789011",
    time: "2026-06-12T14:00:00Z",
    status: "online",
  },
  {
    id: 3,
    imei: "123456789011",
    time: "2026-06-12T14:00:00Z",
    status: "online",
  },
  {
    id: 4,
    imei: "123456789011",
    time: "2026-06-12T14:00:00Z",
    status: "online",
  },
];
function renderTable(data) {
  deviceOnlineTable = $("#deviceOnlineTable").DataTable({
    data: data,
    searching: true,
    autoWidth: true,
    scrollY: true,
    scrollX: true,
    paging: false,
    info: false,
    columns: [
      {
        data: "id",
        orderable: false,
      },
      {
        data: "imei",
        orderable: false,
      },
      {
        data: "time",
        orderable: false,
      },
      {
        data: "status",
        orderable: false,
      },
    ],
    dom: "lrt",
    initComplete: function () {
      const api = this.api();
      api.columns.adjust(); // tính width sau khi load xong
    },
  });
}

$(document).ready(function () {
  map = L.map("map", {
    attributionControl: false,
    zoomControl: false,
  }).setView([21.02966365716083, 105.82091052009575], 13);
  L.tileLayer("https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}", {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }).addTo(map);

  renderTable(dataFake);

  $("#toggle-sidebar").click(function () {
    $("#sidebar").toggleClass("collapsed");
  });

  $(".splitter").on("mousedown", function () {
    isDragging = true;
  });
  $(document).on("mouseup", function () {
    isDragging = false;
  });
  $(document).on("mousemove", function (e) {
    if (!isDragging) return;
    const sidebarTop = $("#sidebar").offset().top;
    console.log("Sidebar Top: ", sidebarTop);
    const sidebarHeight = $("#sidebar").height();
    console.log("Sidebar Height: ", sidebarHeight);
    console.log(e.clientY);
    let newHeight = e.clientY - sidebarTop;

    newHeight = Math.max(150, newHeight);
    newHeight = Math.min(sidebarHeight - 150, newHeight);

    $(".tree-panel").height(newHeight);
  });
});
