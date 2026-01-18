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
