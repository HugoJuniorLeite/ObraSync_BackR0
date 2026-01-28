
import prisma from "../database/prismaClient.js";

async function create_admin_attendance_repository(data) {
  return prisma.admin_attendance.create({
    data
  });
}

async function get_all_admin_attendances_repository(where) {
  return prisma.mobile_attendance.findMany({
    where,
    orderBy: {
      finalizado_em: "desc",
    },
    include: {
      journey: {
        include: {
          employee: true,
        },
      },
    },
  });
}


async function get_admin_attendance_by_id_repository(attendance_id) {
  return prisma.admin_attendance.findUnique({
    where: { id: Number(attendance_id) }
  });
}

async function update_admin_attendance_status_repository(attendance_id, status) {
  return prisma.admin_attendance.update({
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

