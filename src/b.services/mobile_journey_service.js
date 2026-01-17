 import repo from "../c.repositories/mobile_journey_repository.js";

// ------------------------------------------------------------
// INICIAR JORNADA
// ------------------------------------------------------------
async function start_journey_service(data) {
  if (!data.employee_id || !data.date) {
    throw new Error("employee_id e date são obrigatórios.");
  }
 console.log(data, "Service")
  return repo.start_journey_repository({
    date: data.date,
    employee_id: data.employee_id,
    inicio_expediente: data.inicio_expediente,
    gps_inicio: data.gps_inicio,
  });
}


// ------------------------------------------------------------
// INICIAR DESLOCAMENTO
// ------------------------------------------------------------
async function create_attendance_service(journeyId, data) {
  if (!journeyId) throw new Error("journey_id é obrigatório");
  if (!data.tipo) throw new Error("tipo é obrigatório");

  return repo.create_attendance_repository(
    journeyId,
    data
  );
}


// ------------------------------------------------------------
// INICIAR ATENDIMENTO
// ------------------------------------------------------------
async function start_service_service(attendanceId, data) {
  if (!attendanceId) {
    throw new Error("attendanceId é obrigatório");
  }
  return repo.start_service_repository(attendanceId, data);
}



// ------------------------------------------------------------
// FINALIZAR JORNADA
// ------------------------------------------------------------
async function finish_journey_service(id, data) {
  return repo.finish_journey_repository(id, {
    fim_expediente: data.fim_expediente,
    gps_fim: data.gps_fim,
    assinatura: data.assinatura,
  });
}

// ------------------------------------------------------------
// ATENDIMENTO
// ------------------------------------------------------------
async function add_attendance_service(journey_id, att) {
  return repo.add_attendance_repository(journey_id, att);
}

async function add_route_point_service(attendance_id, point) {
  return repo.add_route_point_repository(attendance_id, point);
}



// ------------------------------------------------------------
// fINALIZAR ATENDIMENTO
// ------------------------------------------------------------
async function finish_service_service(attendanceId, data) {
  if (!attendanceId) {
    throw new Error("attendance_id é obrigatório");
  }

  return repo.finish_service_repository(attendanceId, data);
}


//------------------------------------------------------------
//
//------------------------------------------------------------
// async function update_attendance_os_service(attendanceId, userId, data) {
//   if (!attendanceId) {
//     throw new Error("attendance_id é obrigatório");
//   }

//   // 🔒 autorização
//   const attendance = await repo.find_attendance_by_id_and_user(
//     attendanceId,
//     userId
//   );

//   if (!attendance) {
//     throw new Error("Atendimento não encontrado ou acesso negado");
//   }

//   // 🧠 regra de negócio (se quiser)
//   if (!data.ordem_numero || data.ordem_numero.length !== 6) {
//     throw new Error("Número da OS inválido");
//   }

//   return repo.update_attendance_os_repository(attendanceId, {
//     tipo: data.tipo,
//     ordem_tipo: data.ordem_tipo,
//     ordem_numero: data.ordem_numero,
//     nota_enviada: true,
//   });
// }


// async function update_attendance_os_service(attendanceId, userId, data) {
//   console.log("SERVICE", attendanceId, userId, data)
//   const att = await repo.find_attendance_by_id_and_user(
//     attendanceId,
//     userId
//   );

//   if (!att) {
//     throw new Error("Atendimento não encontrado ou acesso negado");
//   }

//   return repo.update_attendance_os_repository(attendanceId, {
//     tipo: data.tipo,
//     ordem_tipo: data.ordem_tipo,
//     ordem_numero: data.ordem_numero,
//     nota_enviada: true,
//   });
// }

export async function update_attendance_os_service(
  attendanceId,
  userId,
  data
) {
  const attendance = await repo.find_attendance_by_id(attendanceId);

  if (!attendance) {
    throw new Error("Atendimento não encontrado");
  }

  // 🔒 segurança REAL
  if (attendance.journey.employee_id !== userId) {
    throw new Error("Acesso negado ao atendimento");
  }

  return repo.update_attendance_os_repository(attendanceId, {
    tipo: data.tipo,
    ordem_tipo: data.ordem_tipo,
    ordem_numero: data.ordem_numero,
  });
}

// ------------------------------------------------------------
// INICIA ALMOÇO
// ------------------------------------------------------------
async function add_lunch_service(journey_id, lunch) {
  return repo.add_lunch_repository(journey_id, lunch);
}


// ------------------------------------------------------------
// FINALIZA ALMOÇO
// ------------------------------------------------------------
async function finish_lunch_service(journey_id, lunch) {
  return repo.finish_lunch_repository(journey_id, lunch);
}

// ------------------------------------------------------------
// SUSPENDE ALMOÇO
// ------------------------------------------------------------
async function suspend_lunch_service(journey_id, lunch) {
  return repo.suspend_lunch_repository(journey_id, lunch);
}

// ------------------------------------------------------------
// BASE LOG
// ------------------------------------------------------------
async function add_base_log_service(journey_id, log) {
    if (!journey_id) {
    throw new Error("journey_id é obrigatório");
  }

  if (!log.tipo) {
    throw new Error("tipo do base log é obrigatório");
  }

  if (!log.time) {
    throw new Error("time é obrigatório");
  }

  return repo.add_base_log_repository(journey_id, log);
}

// ------------------------------------------------------------
// LISTAR / BUSCAR
// ------------------------------------------------------------
async function list_journeys_service(filters) {
  return repo.list_journeys_repository(filters);
}

async function get_journey_by_id_service(id) {
  const journey = await repo.get_journey_by_id_repository(id);
  if (!journey) throw new Error("Jornada não encontrada");
  return journey;
}



async function getActiveJourneyFull(employeeId) {
  if (!employeeId) {
    throw new Error("employeeId não informado");
  }

  // 🔒 Regra de negócio clara
  // Jornada ativa = sem fim de expediente
  return repository.findActiveJourneyByEmployee(employeeId);
}


export default {
  start_journey_service,
  create_attendance_service,
  start_service_service,
  finish_service_service,
  add_attendance_service,
  update_attendance_os_service,
  add_route_point_service,
  add_lunch_service,
  finish_lunch_service,
  suspend_lunch_service,
  add_base_log_service,
  list_journeys_service,
  get_journey_by_id_service,
  finish_journey_service,
getActiveJourneyFull,
};
