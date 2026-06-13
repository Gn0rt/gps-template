const organization = [
  {
    id: "ORG_A_ID",
    name: "Công ty solution A",
    level: 1,
    parentId: null,
  },
  {
    id: "ORG_B_ID",
    name: "Công ty solution B",
    level: 1,
    parentId: null,
  },
  {
    id: "ORG_C_ID",
    name: "Đại lý solution C",
    level: 2,
    parentId: "ORG_A_ID",
  },
  {
    id: "ORG_D_ID",
    name: "Đại lý solution D",
    level: 2,
    parentId: "ORG_A_ID",
  },
  {
    id: "ORG_E_ID",
    name: "Kho sản xuất solution E",
    level: 2,
    parentId: "ORG_B_ID",
  },
  {
    id: "ORG_G_ID",
    name: "Cửa hàng solution G",
    level: 3,
    parentId: "ORG_C_ID",
  },
];

const users = [
  {
    id: "SUPER_ADMIN_ID",
    username: "super_admin",
    password: "123456",
    role: "SUPER_ADMIN",
    orgId: null,
  },
  {
    id: "USER_SEP_A",
    username: "sep_cong_ty_a",
    password: "123456",
    role: "ORG_ADMIN",
    orgId: "ORG_A_ID",
  },
  {
    id: "USER_SEP_B",
    username: "sep_cty_b",
    password: "123456",
    role: "ORG_ADMIN",
    orgId: "ORG_B_ID",
  },
  {
    id: "USER_CHU_C",
    username: "chu_dai_ly_C",
    password: "123456",
    role: "ORG_ADMIN",
    orgId: "ORG_C_ID",
  },
  {
    id: "USER_CHU_D",
    username: "chu_dly_D",
    password: "123456",
    role: "ORG_ADMIN",
    orgId: "ORG_D_ID",
  },
  {
    id: "USER_NHAN_VIEN_C1",
    username: "nhanvien1",
    password: "123456",
    role: "STAFF",
    orgId: "ORG_C_ID",
  },
  {
    id: "USER_NHAN_VIEN_C2",
    username: "nhanvien2",
    password: "123456",
    role: "STAFF",
    orgId: "ORG_C_ID",
  },
  {
    id: "USER_NHAN_VIEN_C3",
    username: "nhanvien3",
    password: "123456",
    role: "STAFF",
    orgId: "ORG_C_ID",
  },
  {
    id: "USER_NHAN_VIEN_D1",
    username: "nhanviend1",
    password: "123456",
    role: "STAFF",
    orgId: "ORG_D_ID",
  },
  {
    id: "USER_NHAN_VIEN_D2",
    username: "nhanviend2",
    password: "123456",
    role: "STAFF",
    orgId: "ORG_D_ID",
  },
  {
    id: "USER_CHU_G",
    username: "chuchg",
    password: "123456",
    role: "ORG_ADMIN",
    orgId: "ORG_G_ID",
  },
];

const userWithOrgDTO = [
  {
    id: "USER_SEP_A",
    username: "sep_cong_ty_a",
    password: "123456",
    role: "ORG_ADMIN",
    orgId: "ORG_A_ID",
    orgName: "Công ty solution A",
    orgLevel: 1,
    parentId: null,
  },
  {
    id: "USER_SEP_B",
    username: "sep_cty_b",
    password: "123456",
    role: "ORG_ADMIN",
    orgId: "ORG_B_ID",
    orgName: "Công ty solution B",
    orgLevel: 1,
    parentId: null,
  },
  {
    id: "USER_NHAN_VIEN_C1",
    username: "nhanvien1",
    password: "123456",
    role: "STAFF",
    orgId: "ORG_C_ID",
    orgName: "Đại lý solution C",
    orgLevel: 2,
    parentId: "ORG_A_ID",
  },
  {
    id: "USER_NHAN_VIEN_C2",
    username: "nhanvien2",
    password: "123456",
    role: "STAFF",
    orgId: "ORG_C_ID",
    orgName: "Đại lý solution C",
    orgLevel: 2,
    parentId: "ORG_A_ID",
  },
  {
    id: "USER_CHU_G",
    username: "chuchg",
    password: "123456",
    role: "ORG_ADMIN",
    orgId: "ORG_G_ID",
    orgName: "Cửa hàng solution G",
    orgLevel: 3,
    parentId: "ORG_C_ID",
  },
];
const devices = [
  // ===== THIẾT BỊ TRONG KHO ADMIN (Chưa thuộc tổ chức nào) =====
  {
    id: "DEV_001",
    imei: "860012345678901",
    deviceName: "Định vị Rovi T1",
    status: "NEW", // Trạng thái mới nhập kho
    orgId: null, // Thuộc kho tổng của Admin hệ thống
    updatedAt: "2024-06-01T08:00:00Z",
  },
  {
    id: "DEV_002",
    imei: "860012345678902",
    deviceName: "Định vị Rovi T1",
    status: "NEW",
    orgId: null,
    updatedAt: "2024-06-01T08:00:00Z",
  },

  // ===== THIẾT BỊ ĐÃ BÀN GIAO CHO CÔNG TY (Cấp 1) =====
  {
    id: "DEV_003",
    imei: "860012345678903",
    deviceName: "Giám sát hành trình X2",
    status: "ACTIVE", // Đã kích hoạt
    orgId: "ORG_A_ID", // Thuộc Công ty Solution A
    updatedAt: "2024-06-05T10:30:00Z",
  },
  {
    id: "DEV_004",
    imei: "860012345678904",
    deviceName: "Giám sát hành trình X2",
    status: "ACTIVE",
    orgId: "ORG_B_ID", // Thuộc Công ty Solution B
    updatedAt: "2024-06-06T09:15:00Z",
  },

  // ===== THIẾT BỊ ĐÃ PHÂN PHỐI XUỐNG ĐẠI LÝ (Cấp 2) =====
  {
    id: "DEV_005",
    imei: "860012345678905",
    deviceName: "Thiết bị định vị GPS T10",
    status: "ACTIVE",
    orgId: "ORG_C_ID", // Thuộc Đại lý solution C (Con của Công ty A)
    updatedAt: "2024-06-08T14:20:00Z",
  },
  {
    id: "DEV_006",
    imei: "860012345678906",
    deviceName: "Thiết bị định vị GPS T10",
    status: "ACTIVE",
    orgId: "ORG_D_ID", // Thuộc Đại lý solution D (Con của Công ty A)
    updatedAt: "2024-06-09T16:45:00Z",
  },

  // ===== THIẾT BỊ TẠI CỬA HÀNG (Cấp 3) =====
  {
    id: "DEV_007",
    imei: "860012345678907",
    deviceName: "Định vị cầm tay P1",
    status: "ACTIVE",
    orgId: "ORG_G_ID", // Thuộc Cửa hàng solution G (Con của Đại lý C)
    updatedAt: "2024-06-10T11:00:00Z",
  },
];
export { organization, users, userWithOrgDTO, devices };
