import prisma from "../database/prismaClient.js";

function normalizeDate(date) {
  if (!date) return null;
  return date.split("T")[0];
}

// ------------------------------------------------------------
// CRIA JORNADA (APENAS INÍCIO DE EXPEDIENTE)
// ------------------------------------------------------------
async function start_journey_repository(data) {
  return prisma.mobile_journey.create({
    data: {
      date: normalizeDate(data.date),
      employee_id: data.employee_id,
      inicio_expediente: data.inicio_expediente
        ? new Date(data.inicio_expediente)
        : null,

      expediente_gps_lat: data.gps_inicio?.lat ?? null,
      expediente_gps_lng: data.gps_inicio?.lng ?? null,
    },
  });
}

// ------------------------------------------------------------
//INICIAR DESLOCAMENTO
// ------------------------------------------------------------

async function create_attendance_repository(journeyId, data) {
  return prisma.mobile_attendance.create({
    data: {

      mobile_journey_id: journeyId,

      tipo: data.tipo,
      ordem_tipo: data.ordem_tipo ?? null,
      ordem_prefixo: data.ordem_prefixo ?? null,
      ordem_numero: data.ordem_numero ?? null,

      deslocamento_inicio: data.deslocamento_inicio
        ? new Date(data.deslocamento_inicio)
        : null,

      gps_inicio_lat: data.gps_inicio_lat ?? null,
      gps_inicio_lng: data.gps_inicio_lng ?? null,

      cep: data.cep ?? null,
      rua: data.rua ?? null,
      numero: data.numero ?? null,
      bairro: data.bairro ?? null,
      cidade: data.cidade ?? null,
      estado: data.estado ?? null,
    },
    include: {
      rota: true,
    },
  });
}


// ------------------------------------------------------------
//INICIAR ATENDIMENTO
// ------------------------------------------------------------

// async function start_service_repository(attendance_id, data) {
//   return prisma.mobile_attendance.update({
//     where: { id: attendance_id },
//     data: {
//       atendimento_inicio: data.atendimento_inicio
//         ? new Date(data.atendimento_inicio)
//         : null,

//       gps_chegada_lat: data.gps_chegada?.lat ?? null,
//       gps_chegada_lng: data.gps_chegada?.lng ?? null,
//     },
//     include: { rota: true },
//   });
// }

async function start_service_repository(attendance_id, data) {

  return prisma.mobile_attendance.update({
    where: { id: attendance_id },
    data: {
      atendimento_inicio: data.atendimento_inicio
        ? new Date(data.atendimento_inicio)
        : null,

      gps_chegada_lat: data.gps_chegada?.lat ?? null,
      gps_chegada_lng: data.gps_chegada?.lng ?? null,
    },
  });
}

//------------------------------------------------------------
// EDITAR NUMERO DE OS
//------------------------------------------------------------

// async function find_attendance_by_id_and_user(attendanceId, userId) {
//   return prisma.mobile_attendance.findFirst({
//     where: {
//       id: attendanceId,
//       journey: {
//         employee_id: userId,
//       },
//     },
//   });
// }


// async function update_attendance_os_repository(attendanceId, data) {
//   return prisma.mobile_attendance.update({
//     where: { id: attendanceId },
//     data: {
//       ...data,
//       updated_at: new Date(),
//     },
//   });
// }

// async function find_attendance_by_id_and_user(attendanceId) {
//   return prisma.mobile_attendance.findUnique({
//     where: { id: attendanceId },
//   });
// }

// export async function find_attendance_by_id_and_user(attendanceId) {
//   return prisma.mobile_attendance.findUnique({
//     where: { id: attendanceId },
//     include: {
//       journey: true, // necessário para validar o dono no service
//     },
//   });
// }


// async function update_attendance_os_repository(attendanceId, data) {
//   console.log("REPO 2", attendanceId, data)
//  return prisma.mobile_attendance.update({
//     where: { id: attendanceId },
//     data: {
//       tipo: data.tipo,
//       ordem_tipo: data.ordem_tipo,
//       ordem_numero: data.ordem_numero,
//       nota_enviada: true,
//       // updated_at: new Date(),
//     },
//   });
// }


export async function find_attendance_by_id(attendanceId) {
  return prisma.mobile_attendance.findUnique({
    where: { id: attendanceId },
    include: {
      journey: true, // 🔑 necessário para validar employee_id
    },
  });
}

export async function update_attendance_os_repository(attendanceId, data) {
  return prisma.mobile_attendance.update({
    where: { id: attendanceId },
    data: {
      tipo: data.tipo,
      ordem_tipo: data.ordem_tipo,
      ordem_numero: data.ordem_numero,
      nota_enviada: true,
    },
  });
}

// ------------------------------------------------------------
// FINALIZAR ATEMDIMENTO
// ------------------------------------------------------------

async function finish_service_repository(attendanceId, data) {
  return prisma.mobile_attendance.update({
    where: { id: attendanceId },
    data: {
      finalizado_em: data.finalizado_em
        ? new Date(data.finalizado_em)
        : new Date(),

      comentario: data.comentario ?? null,
      notas: data.notas ?? null,
    },
  });
}



// ------------------------------------------------------------
// FINALIZAR JORNADA
// ------------------------------------------------------------
async function finish_journey_repository(id, data) {
  return prisma.mobile_journey.update({
    where: { id },

    data: {
      fim_expediente: data.fim_expediente
        ? new Date(data.fim_expediente)
        : new Date(),

      expediente_gps_lat: data.gps_fim?.lat ?? undefined,
      expediente_gps_lng: data.gps_fim?.lng ?? undefined,

      assinatura: data.assinatura ?? undefined,
    },
  });
}

// ------------------------------------------------------------
// CRIAR ATENDIMENTO
// ------------------------------------------------------------
async function add_attendance_repository(journey_id, att) {
  return prisma.mobile_attendance.create({
    data: {
      mobile_journey_id: journey_id,

      tipo: att.tipo,
      ordem_tipo: att.ordem_tipo ?? null,
      ordem_prefixo: att.ordem_prefixo ?? null,
      ordem_numero: att.ordem_numero ?? null,

      deslocamento_inicio: att.deslocamento_inicio
        ? new Date(att.deslocamento_inicio)
        : null,

      atendimento_inicio: att.atendimento_inicio
        ? new Date(att.atendimento_inicio)
        : null,

      finalizado_em: att.finalizado_em
        ? new Date(att.finalizado_em)
        : null,

      gps_inicio_lat: att.gps_inicio?.lat ?? null,
      gps_inicio_lng: att.gps_inicio?.lng ?? null,
      gps_chegada_lat: att.gps_chegada?.lat ?? null,
      gps_chegada_lng: att.gps_chegada?.lng ?? null,

      cep: att.cep ?? null,
      rua: att.rua ?? null,
      numero: att.numero ?? null,
      bairro: att.bairro ?? null,
      cidade: att.cidade ?? null,
      estado: att.estado ?? null,

      comentario: att.comentario ?? null,
      notas: att.notas ?? null,
    },
  });
}

// ------------------------------------------------------------
// ADICIONAR PONTOS DE ROTA
// ------------------------------------------------------------
async function add_route_point_repository(attendance_id, point) {
  return prisma.mobile_route_point.create({
    data: {
      mobile_attendance_id: attendance_id,
      time: new Date(point.time),
      lat: point.lat,
      lng: point.lng,
    },
  });
}

// ------------------------------------------------------------
// CRIAR ALMOÇO
// ------------------------------------------------------------
// async function add_lunch_repository(journey_id, lunch) {
//   return prisma.mobile_lunch.create({
//     data: {
//       mobile_journey_id: journey_id,
//       inicio: lunch.inicio ? new Date(lunch.inicio) : null,
//       fim: lunch.fim ? new Date(lunch.fim) : null,

//       lat_inicio: lunch.lat_inicio ?? null,
//       lng_inicio: lunch.lng_inicio ?? null,

//       lat_fim: lunch.lat_fim ?? null,
//       lng_fim: lunch.lng_fim ?? null,

//       suspenso_em: lunch.suspenso_em
//         ? new Date(lunch.suspenso_em)
//         : null,

//       lat_suspenso: lunch.lat_suspenso ?? null,
//       lng_suspenso: lunch.lng_suspenso ?? null,

//       justificativa_suspensao: lunch.justificativa_suspensao ?? null,
//       solicitante_suspensao: lunch.solicitante_suspensao ?? null,
//     },
//   });
// }

async function add_lunch_repository(journey_id, lunch) {
  return prisma.mobile_lunch.create({
    data: {
      mobile_journey_id: journey_id,
      inicio: lunch.inicio ? new Date(lunch.inicio) : null,
      lat_inicio: lunch.lat_inicio ?? null,
      lng_inicio: lunch.lng_inicio ?? null,
      // status: "ativo",
    },
  });
}


//--------------------------------------------------------------
//FINALIZA ALMOÇO
//--------------------------------------------------------------
async function finish_lunch_repository(id, data) {
  return prisma.mobile_lunch.update({
    where: { id },
    data: {
      fim: data.fim ? new Date(data.fim) : new Date(),
      lat_fim: data.lat_fim ?? null,
      lng_fim: data.lng_fim ?? null,
      // status: "finalizado",

    },
  });
}


//--------------------------------------------------------------
//SUSPENDE ALMOÇO
//--------------------------------------------------------------
async function suspend_lunch_repository(id, data) {
  return prisma.mobile_lunch.update({
    where: { id },
    data: {
      suspenso_em: data.suspenso_em ? new Date(data.suspenso_em) : new Date(),
      lat_suspenso: data.lat_suspenso ?? null,
      lng_suspenso: data.lng_suspenso ?? null,
      justificativa_suspensao: data.justificativa_suspensao,
      solicitante_suspensao: data.solicitante_suspensao,
      // status: "suspenso",
    },
  });
}


// ------------------------------------------------------------
// BASE LOG
// ------------------------------------------------------------
async function add_base_log_repository(journey_id, log) {

  return prisma.mobile_base_log.create({
    data: {
      mobile_journey_id: journey_id,
      tipo: log.tipo,
      time: new Date(log.time),
      lat: log.lat ?? null,
      lng: log.lng ?? null,
      motivo: log.motivo ?? null,

    },
  });
}

// ------------------------------------------------------------
// LISTAR / BUSCAR JORNADAS
// ------------------------------------------------------------
async function list_journeys_repository(filters) {
  return prisma.mobile_journey.findMany({
    where: {
      employee_id: Number(filters.employee_id),
        // ? Number(filters.employee_id)
        // : undefined,

      date: filters.date ?? undefined,
    },
    include: {
      lunches: true,
      attendances: { include: { rota: true } },
      base_logs: true,
      employee: true,
    },
    orderBy: { date: "desc" },
  });
}

async function get_journey_by_id_repository(id) {
  return prisma.mobile_journey.findUnique({
    where: { id: Number(id) },
    include: {
      lunches: true,
      attendances: { include: { rota: true } },
      base_logs: true,
      employee: true,
    },
  });
}

export default {
  start_journey_repository,
  create_attendance_repository,
  start_service_repository,
  finish_service_repository,
  finish_journey_repository,
  add_attendance_repository,
  add_route_point_repository,
  add_lunch_repository,
  update_attendance_os_repository,
  // find_attendance_by_id_and_user,
  find_attendance_by_id,
  finish_lunch_repository,
  suspend_lunch_repository,
  add_base_log_repository,
  list_journeys_repository,
  get_journey_by_id_repository,
};
