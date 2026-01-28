// // src/b.services/adminAttendances_service.js


// import adminAttendances_repository from "../c.repositories/adminAttendances_repository";

// // import adminAttendancesRepository from "../c.repositories/adminAttendances_repository.js";

// class AdminAttendancesService {
//   async execute(filters) {
//     const attendances =
//       await adminAttendances_repository.findAttendances(filters);

//     return attendances.map((item) => {
//       const start = item.created_at;
//       const end = item.finished_at;

//       const journeyMinutes =
//         start && end ? Math.floor((end - start) / 60000) : 0;

//       return {
//         date: start,
//         technician: item.technician?.name,
//         technician_id: item.technician?.id,

//         os_number: item.service_order?.os_number,
//         invoice_number: item.service_order?.invoice_number,
//         client: item.service_order?.client_name,
//         project: item.service_order?.project_name,
//         address: item.service_order?.address,

//         start_time: start,
//         end_time: end,
//         journey_minutes: journeyMinutes,
//         distance_km: item.distance_km || 0,

//         status: end ? "FINALIZADO" : "EM ANDAMENTO",
//       };
//     });
//   }
// }

// export default new AdminAttendancesService();


import admin_attendances_repository from "../c.repositories/admin_attendances_repository.js";

function normalizeDateStart(date) {
  if (!date) return undefined;
  const d = new Date(`${date}T00:00:00.000Z`);
  return isNaN(d.getTime()) ? undefined : d;
}

function normalizeDateEnd(date) {
  if (!date) return undefined;
  const d = new Date(`${date}T23:59:59.999Z`);
  return isNaN(d.getTime()) ? undefined : d;
}


function sanitizeFilters(filters) {
  const clean = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      clean[key] = value;
    }
  });

  return clean;
}


async function create_admin_attendance_service(data) {
  if (!data) {
    throw new Error("Dados obrigatórios não informados");
  }

  return admin_attendances_repository.create_admin_attendance_repository(data);
}


function mapStatus(status) {
  const map = {
    aprovado: "OK",
    em_analise: "WARNING",
    pendente: "WARNING",
    corrigir: "WARNING",
    rejeitado: "ERROR",
  };

  return map[status] ?? "WARNING";
}


async function get_all_admin_attendances_service(filters = {}) {

  const clean = sanitizeFilters(filters);

  const where = {
    ...(clean.startDate && {
      deslocamento_inicio: {
        gte: normalizeDateStart(clean.startDate),
      },
    }),

    ...(clean.endDate && {
      deslocamento_inicio: {
        lte: normalizeDateEnd(clean.endDate),
      },
    }),

    ...(clean.search && {
      ordem_numero: {
        contains: clean.search,
      },
    }),

    ...(clean.technician && {
      journey: {
        employee: {
          name: {
            contains: clean.technician,
            mode: "insensitive",
          },
        },
      },
    }),
  };

  const rows =
    await admin_attendances_repository.get_all_attendances_repository(where);

  return rows.map((item) => ({
    date: item.deslocamento_inicio,
    technician: item.journey.employee.name,
    os: item.ordem_numero,
    note: "-",
    client: "-",
    project: "-",
    address: `${item.rua ?? ""} ${item.numero ?? ""} - ${item.bairro ?? ""}`,
    start: item.atendimento_inicio,
    end: item.finalizado_em,
    journey: item.finalizado_em ? "Finalizada" : "Em andamento",
    distance: "-",
    status: item.finalizado_em ? "OK" : "WARNING",
  }));
}




async function get_admin_attendance_by_id_service(attendance_id) {
  if (!attendance_id) {
    throw new Error("ID inválido");
  }

  return admin_attendances_repository.get_admin_attendance_by_id_repository(attendance_id);
}

async function change_admin_attendance_status_service(attendance_id, status) {
  if (!attendance_id || !status) {
    throw new Error("Dados inválidos");
  }

  return admin_attendances_repository.update_admin_attendance_status_repository(
    attendance_id,
    status
  );
}

const admin_attendances_service = {
  create_admin_attendance_service,
  get_all_admin_attendances_service,
  get_admin_attendance_by_id_service,
  change_admin_attendance_status_service
};

export default admin_attendances_service;
