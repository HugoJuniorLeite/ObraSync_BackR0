// // src/c.repositories/adminAttendances_repository.js

// import { prisma } from "../database/prismaClient.js";

// class AdminAttendancesRepository {
//   async findAttendances(filters = {}) {
//     const {
//       technician_id,
//       date_start,
//       date_end,
//     } = filters;

//     return prisma.mobile_journey.findMany({
//       where: {
//         ...(technician_id && {
//           technician_id: Number(technician_id),
//         }),

//         ...(date_start && date_end && {
//           created_at: {
//             gte: new Date(date_start),
//             lte: new Date(date_end),
//           },
//         }),
//       },

//       include: {
//         technician: {
//           select: {
//             id: true,
//             name: true,
//           },
//         },
//         service_order: {
//           select: {
//             id: true,
//             os_number: true,
//             invoice_number: true,
//             client_name: true,
//             project_name: true,
//             address: true,
//           },
//         },
//       },

//       orderBy: {
//         created_at: "desc",
//       },
//     });
//   }
// }

// export default new AdminAttendancesRepository();


import prisma from "../config/prisma_client.js";

async function create_admin_attendance_repository(data) {
  return prisma.admin_attendances.create({
    data
  });
}

async function get_all_admin_attendances_repository() {
  return prisma.admin_attendances.findMany();
}

async function get_admin_attendance_by_id_repository(attendance_id) {
  return prisma.admin_attendances.findUnique({
    where: { id: Number(attendance_id) }
  });
}

async function update_admin_attendance_status_repository(attendance_id, status) {
  return prisma.admin_attendances.update({
    where: { id: Number(attendance_id) },
    data: { status }
  });
}

const admin_attendances_repository = {
  create_admin_attendance_repository,
  get_all_admin_attendances_repository,
  get_admin_attendance_by_id_repository,
  update_admin_attendance_status_repository
};

export default admin_attendances_repository;

