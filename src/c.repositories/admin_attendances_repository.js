
import prisma from "../database/prismaClient.js";

async function create_admin_attendance_repository(data) {
  return prisma.admin_attendances.create({
    data
  });
}

async function get_all_admin_attendances_repository(filters) {
  const {
    startDate,
    endDate,
    technician,
    search,
  } = filters;

  const where = {};

  if (technician) {
    where.technician_name = {
      contains: technician,
      mode: "insensitive",
    };
  }

  if (search) {
    where.OR = [
      { os_number: { contains: search, mode: "insensitive" } },
      { note_number: { contains: search, mode: "insensitive" } },
      { address: { contains: search, mode: "insensitive" } },
    ];
  }

  if (startDate && endDate) {
    where.attendance_date = {
      gte: new Date(`${startDate}T00:00:00.000Z`),
      lte: new Date(`${endDate}T23:59:59.999Z`),
    };
  }

  return prisma.admin_attendance.findMany({
    where,
    orderBy: {
      attendance_date: "desc",
    },
  });
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

